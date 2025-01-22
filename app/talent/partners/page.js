"use client";

import { useState, useEffect } from "react";
import { PartnerModal } from "@/components/partnerModal";
import PartnersGrid from "@/components/PartnersGrid";

import { Flex } from "@chakra-ui/react";
import { createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
  ],
});

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
        const result = await fetch(
          `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Partners`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}`,
            },
          }
        );

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
    <Flex
      textAlign="center"
      align="center"
      border="2px solid red"
      minH="100vh"
      justify="center"
      w="full"
      direction="column"
      p={3}
    >
      <section>
        <h1>Our Partners</h1>
        <h2>Learn more about top companies looking for top talent</h2>
        <Flex gap="40px">
          <SelectRoot collection={frameworks} size="sm" width="320px">
            <SelectLabel>Partner Type</SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              {frameworks.items.map((type) => (
                <SelectItem item={type} key={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>

          <SelectRoot collection={frameworks} size="sm" width="320px">
            <SelectLabel>Partner Tier</SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              {frameworks.items.map((tier) => (
                <SelectItem item={tier} key={tier.value}>
                  {tier.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>

          <SelectRoot collection={frameworks} size="sm" width="320px">
            <SelectLabel>Involved in CodeHouse Programs</SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder="Yes" />
            </SelectTrigger>
            <SelectContent>
              {frameworks.items.map((program) => (
                <SelectItem item={program} key={program.value}>
                  {program.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Flex>
      </section>
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
          involvedInPrograms={
            selectedPartner.fields["Is Involved in CodeHouse"] || "No"
          }
          location={selectedPartner.fields["Partner Location"]}
          about={selectedPartner.fields["About"] || "No information available"}
          website={selectedPartner.fields["Partner URL"] || "#"}
        />
      )}
    </Flex>
  );
}
