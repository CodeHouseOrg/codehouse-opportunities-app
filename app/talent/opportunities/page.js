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
        const opportunities = await base("Opportunities").select().all();
        
        if (opportunities && opportunities.length > 0) {
          const oppSet = new Set();
          opportunities.forEach((r) => {
            const type = r.fields["Opportunity Type"][0];
            if (!oppSet.has(type)) {
              oppSet.add(type);
            }
          });
          setOppTypes(Array.from(oppSet));
          setOpportunities(opportunities);
        }
      } catch (e) {
        console.error("FetchOpportunities error:", e);
      }
    };

    const fetchPartnerSelectItems = async () => {
      try {
        const partners = await base("Partners").select().all();
        setPartners(
          partners.map((p) => ({
            name: p.fields["Partner Name"],
            id: p.id,
          })).sort((a, b) => a.name.localeCompare(b.name))
        );
      } catch (e) {
        console.error("FetchPartnerSelectItems error:", e);
      }
    };

    fetchOpportunities();
    fetchPartnerSelectItems();
  }, []);

  // Reset current page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQ, selectedPartner, selectedOppType]);

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
    
    // Filter by search query
    if (searchQ.length) {
      newOpps = newOpps.filter((o) =>
        o.fields["Opportunity Name"]
          ?.toLowerCase()
          .includes(searchQ.toLowerCase())
      );
    }

    // Filter by partner - only apply if not "All" (empty string)
    if (selectedPartner && selectedPartner !== "") {
      newOpps = newOpps.filter(
        (o) => !!o.fields.Partner && o.fields.Partner[0] === selectedPartner
      );
    }

    // Filter by opportunity type - only apply if not "All" (empty string)
    if (selectedOppType && selectedOppType !== "") {
      newOpps = newOpps.filter((o) => {
        const oppTypes = o.fields["Opportunity Type"];
        const matches = oppTypes.includes(selectedOppType);
        
        return matches;
      });
    }

    return newOpps;
  };

  const filteredOpportunities = getFilteredOpportunities();
  const totalPages = Math.ceil(filteredOpportunities.length / PAGE_SIZE);
  const displayedItems = filteredOpportunities.slice(
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
        onPartnerSelect={(e) => {
          setSelectedPartner(Array.isArray(e.value) ? e.value[0] : e.value);
        }}
        onOppTypeSelect={(e) => {
          setSelectedOppType(Array.isArray(e.value) ? e.value[0] : e.value);
        }}
      />
      <br />
      {filteredOpportunities.length > 0 ? (
        <>
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
          <OpportunityCardPagination
            items={filteredOpportunities}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      ) : (
        <p>No Results Found</p>
      )}
      <OpportunityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalData={modalData}
      />
    </Flex>
  );
}
