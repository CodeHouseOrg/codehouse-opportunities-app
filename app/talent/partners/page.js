"use client";

import { useState, useEffect } from "react";
import {PartnerModal} from "@/components/partnerModal";
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

export default function Partners() {
  const [isPartnerModalOpen, setPartnerModalOpen] = useState(false);
  const [partners, setPartners] = useState([]); // save our partners data to render the info in each partner card
  const [currentPage, setCurrentPage] = useState(1); // To make sure we only render what is on the curr page for pagination
  const itemsPerPage = 6; // Only 6 partner cards will display 
  const onOpenModal = () => setPartnerModalOpen(true);
  const onCloseModal = () => setPartnerModalOpen(false);
 


  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const result = await fetch(`https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Partners`, {
          headers: {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}`
          }
        })

        const data = await result.json();
        if (data && data.records) 
        setPartners(data.records); // save the data.records into our partners state
        // console.log(data.records)
      } catch (e) {
        console.error(e)
      }
    }
    fetchPartners();
  }, [])
  
  return (
    <Flex textAlign="center" align="center" border="2px solid red" minH="100vh" justify="center" w="full">
      <PartnersGrid
          partners={partners}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onOpenModal={onOpenModal}
        />
        <PartnerModal open={isPartnerModalOpen} onCloseModal={onCloseModal} title="ABC" partnerTypes="Technology" tier="Platinum" involvedInPrograms="Yes" location="New York, NY USA" about="We're dedicated to the ABC's and support Alphabet services through various program initiatives. Join us on our journey." website="abc.co"/>
    </Flex>
  )
}