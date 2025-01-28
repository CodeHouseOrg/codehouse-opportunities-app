"use client";
import { Flex } from "@chakra-ui/react";
import OpportunitiesFilter from "@/components/opportunities/OpportunitiesFilters";
import { OpportunityModal } from "@/components/opportunities/opportunityCard/opportunityModel";
import { Jobs } from "@/components/opportunities/opportunityCard/jobs";
import OpportunityHeaderContainer from "@/components/opportunities/opportunityHeader/opportunityHeaderContainer";
import OpportunityCardPagination from "@/components/opportunities/opportunityPagination/opportunityPaginationContianer";
import { useEffect, useState } from "react";
import Airtable from "airtable";
import apiKey from "@/Airtable.configure";

const PAGE_SIZE = 6;
const airtable = new Airtable({ apiKey });
const base = airtable.base("app1V5WXWoHT2QGTu");

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [modalData, setModalData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [partners, setPartners] = useState([]);
  const [oppTypes, setOppTypes] = useState([]);
  const [searchQ, setSearchQ] = useState("");
  const [selectedPartner, setSelectedPartner] = useState("");
  const [selectedOppType, setSelectedOppType] = useState("");

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const result = await fetch(
          `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Opportunities`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}`,
            },
          }
        );
        const data = await result.json();
        if (data && data.records) {
          console.log("🚀 ~ fetchOpportunities ~ data:", data);
          const oppSet = new Set();
          data.records.forEach((r) => {
            const type = r.fields["Opportunity Type"][0];
            if (!oppSet.has(type)) {
              oppSet.add(type);
            }
          });
          setOppTypes(Array.from(oppSet));
          setOpportunities(data.records);
        }
      } catch (e) {
        console.error(e);
      }
    };

    const fetchPartnerSelectItems = async () => {
      const partners = await base("Partners").select().all();
      console.log("🚀 ~ fetchPartnerSelectItems ~ partners:", partners);
      setPartners(
        partners.map((p) => ({
          name: p.fields["Partner Name"],
          id: p.id,
        }))
      );
    };

    fetchOpportunities();
    fetchPartnerSelectItems();
  }, []);

  const handleModalData = (e) => {
    setIsModalOpen(true);
    const buttonId = e.target.id;
    const data = opportunities.find(
      (opportunity) => opportunity.id === buttonId
    );
    setModalData(data);
  };

  const getFilteredOpportunities = () => {
    let newOpps = [...opportunities];

    if (searchQ.length) {
      newOpps = newOpps.filter((o) =>
        o.fields["Opportunity Name"]
          ?.toLowerCase()
          .includes(searchQ.toLowerCase())
      );
    }

    if (selectedPartner.length) {
      newOpps = newOpps.filter(
        (o) => !!o.fields.Partner && o.fields.Partner[0] === selectedPartner[0]
      );
    }

    if (selectedOppType.length) {
      newOpps = newOpps.filter((o) =>
        o.fields["Opportunity Type"].includes(selectedOppType[0])
      );
    }

    return newOpps;
  };

  const totalPages = Math.ceil(opportunities.length / PAGE_SIZE);
  const displayedItems = getFilteredOpportunities().slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <Flex
      bg="primaryWhite"
      minH="100vh"
      justify="center"
      align="center"
      direction="column"
      pt="10rem"
    >
      <OpportunityHeaderContainer />
      <OpportunitiesFilter
        partners={partners}
        oppTypes={oppTypes}
        onSearchChange={(e) => setSearchQ(e.currentTarget.value)}
        onPartnerSelect={(e) => setSelectedPartner(e.value)}
        onOppTypeSelect={(e) => setSelectedOppType(e.value)}
      />
      <br />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          padding: "24px",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <Jobs
          opportunitiesData={displayedItems}
          openModal={() => setIsModalOpen(true)}
          handleModalData={handleModalData}
        />
      </div>
      <OpportunityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalData={modalData}
      />
      <OpportunityCardPagination
        items={opportunities}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Flex>
  );
}
