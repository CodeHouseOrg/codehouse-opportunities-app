"use client";
import { Flex } from "@chakra-ui/react";
import OpportunitiesFilter from "@/components/opportunities/OpportunitiesFilters";
import { OpportunityModal } from "@/components/opportunities/opportunityCard/opportunityModel"
import { Jobs } from "@/components/opportunities/opportunityCard/jobs"
import OpportunityHeaderContainer from "@/components/opportunities/opportunityHeader/opportunityHeaderContainer";
import { useEffect, useState } from "react";


export default function Opportunities() {
    const [opportunities, setOpportunities] = useState([]);
    const [modalData, setModalData] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchOpportunities = async () => {
            try {
                const result = await fetch(`https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Opportunities?maxRecords=6`,
                    { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}` } })
                const data = await result.json()
                if (data) {
                    setOpportunities(data.records)
                }

            } catch (e) {
                console.error(e)
            }
        }
        fetchOpportunities()
    }, [])

    const handleModalData = (e) => {
        setIsModalOpen(true)
        const buttonId = e.target.id;
        const data = opportunities.find((opportunity) => opportunity.id === buttonId)
        setModalData(data)
    }

    return (
        <Flex bg="primaryWhite" minH="100vh" justify="center" align="center" direction="column" pt='10rem'>
            <OpportunityHeaderContainer />
            <OpportunitiesFilter />
            <br></br>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // 3 equal-width columns
                gap: "24px", // Spacing between items
                padding: "24px", // Padding around the grid
                width: "100%",
                maxWidth: "1200px", // Optional max width for the grid container
            }}>
                <Jobs opportunitiesData={opportunities} openModal={() => setIsModalOpen(true)} handleModalData={handleModalData} />
            </div>
            <OpportunityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} modalData={modalData} />
        </Flex>
    );
}
