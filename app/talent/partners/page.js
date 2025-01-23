"use client";

import { useState, useEffect } from "react";
import { PartnerModal } from "@/components/partnerModal";
import PartnersGrid from "@/components/PartnersGrid";

import {
  Flex,
  Center,
  Textarea,
  Input,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [partnerTypes, setPartnerTypes] = useState([]);
  const [selectedPartnerType, setSelectedPartnerType] = useState('');
  const [partnersInvolved, setInvolved] = useState([]);
  const [selectedInvolvement, setSelectedInvolvement] = useState('');
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
          setPartners(data.records);
          const partnerTypesSet = new Set();
          const involvedSet = new Set();
          for (const p of data.records) {
            if (!partnerTypesSet.has(p.fields["Partner Type"])) {
              partnerTypesSet.add(p.fields['Partner Type']); 
            } if (!involvedSet.has(p.fields["Is Involved in CodeHouse"])) {
              involvedSet.add(p.fields['Is Involved in CodeHouse']);
            }
          }
          // console.log("SET:", involvedSet);

          setPartnerTypes(Array.from(partnerTypesSet).filter((p) => !!p && p !== "undefined" && p !== undefined).map((p) => ({label: p, value: p})));
          setInvolved(Array.from(involvedSet).map((p) =>({label: p, value: p})));

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

  const filteredPartners = partners.filter((p) => {
    if (searchQuery.length > 0 && p.fields["Partner Name"]?.includes(searchQuery)) return true;
    if (p.fields["Partner Type"] === selectedPartnerType) return true;
    if (p.fields["Is Involved in CodeHouse"]?.includes(partnersInvolved)) return true;
  })

  const getFilteredPartners = () => {
    let newPartners = [...partners];
    if(searchQuery.length > 0) {
      newPartners = newPartners.filter((p) => {
        return p.fields["Partner Name"]?.includes(searchQuery);
      })
    } 
    if (selectedPartnerType.length > 0) {
      newPartners = newPartners.filter((p) => {
        console.log("test", selectedPartnerType, p.fields["Partner Type"])
        return p.fields["Partner Type"]?.toLowerCase() === selectedPartnerType.toLowerCase();
      })
    }
    if (selectedInvolvement.length > 0) {
      newPartners = newPartners.filter((p) => {
        return p.fields["Is Involved in CodeHouse"]?.toLowerCase() === selectedInvolvement.toLowerCase();
      })
    }
    return newPartners;
  }

  console.log(getFilteredPartners());
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
        <Input placeholder="Search by Name" onChange={(e) => setSearchQuery(e.currentTarget.value)}/>
        <Flex gap="40px">

          <SelectRoot collection={createListCollection({items: partnerTypes})} size="sm" width="320px" onValueChange={(e) => setSelectedPartnerType(e.value[0])}>
            <SelectLabel>Partner Type</SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder="Any"/>
            </SelectTrigger>
            <SelectContent>
              {partnerTypes.map((type, i) => (
                <SelectItem item={type} key={type.value} >
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>

          <SelectRoot collection={createListCollection({items: partnersInvolved})} size="sm" width="320px" onValueChange={(e) => setSelectedInvolvement(e.value[0])}>
            <SelectLabel>Involved in CodeHouse Programs</SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder="Yes" />
            </SelectTrigger>
            <SelectContent>
              {partnersInvolved.map((program, i) => (
                <SelectItem item={program} key={i} value={program.value}>
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
