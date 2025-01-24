"use client";

import { useState, useEffect } from "react";
import { PartnerModal } from "@/components/partnerModal";
import PartnersGrid from "@/components/PartnersGrid"; 

import {
  Flex,
} from "@chakra-ui/react";

export default function Partners() {
  const [partners, setPartners] = useState([]); // Save our partners data to render the info in each partner card
  const [currentPage, setCurrentPage] = useState(1); // To make sure we only render what is on the current page for pagination
  const itemsPerPage = 6; // Only 6 partner cards will display 
  const [selectedPartner, setSelectedPartner] = useState(null); // Store the selected partner's data
  const [isPartnerModalOpen, setPartnerModalOpen] = useState(false);

  const onOpenModal = () => setPartnerModalOpen(true);
  const onCloseModal = () => setPartnerModalOpen(false);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const result = await fetch(`https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Partners`, {
          headers: {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}`
          }
        });

        const data = await result.json();
        if (data && data.records) {
          setPartners(data.records); // Save the data.records into our partners state
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchPartners();
  }, []);

  const handleOpenModal = (partner) => {
    setSelectedPartner(partner);
    onOpenModal(); 
  };

  return (
      <Flex textAlign="center" align="center" border="2px solid red" minH="100vh" justify="center" w="full" direction="column" p={3}>
        <PartnersGrid
          partners={partners}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onOpenModal={handleOpenModal} 
        />

        {selectedPartner && (
          <PartnerModal
            open={isPartnerModalOpen}
            onCloseModal={onCloseModal}
            title={selectedPartner.fields["Partner Name"]}
            partnerTypes={selectedPartner.fields["Partner Type"]}
            tier={selectedPartner.fields["Tier"] || "N/A"}
            involvedInPrograms={selectedPartner.fields["Is Involved in CodeHouse"] || "No"}
            location={selectedPartner.fields["Partner Location"]}
            about={selectedPartner.fields["About"] || "No information available"}
            website={selectedPartner.fields["Partner URL"] || "#"}
          />
        )}
      </Flex>
  );
}
