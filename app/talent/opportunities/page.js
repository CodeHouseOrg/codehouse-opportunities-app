"use client";
import { Flex } from "@chakra-ui/react";
import OpportunitiesFilter from "@/components/opportunities/OpportunitiesFilters";
import { OpportunityModal } from "@/components/opportunities/opportunityCard/opportunityModel";
import { Jobs } from "@/components/opportunities/opportunityCard/jobs";
import OpportunityHeaderContainer from "@/components/opportunities/opportunityHeader/opportunityHeaderContainer";
import OpportunityCardPagination from "@/components/opportunities/opportunityPagination/opportunityPaginationContianer";
import { useEffect, useState } from "react";

const PAGE_SIZE = 6;

export default function Opportunities() {
    const [opportunities, setOpportunities] = useState([]);
    const [modalData, setModalData] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchOpportunities = async () => {
            try {
                const result = await fetch(`https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Opportunities`, {
                    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}` },
                });
                const data = await result.json();
                if (data) {
                    setOpportunities(data.records);
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchOpportunities();
    }, []);

    const handleModalData = (e) => {
        setIsModalOpen(true);
        const buttonId = e.target.id;
        const data = opportunities.find((opportunity) => opportunity.id === buttonId);
        setModalData(data);
    };

    const totalPages = Math.ceil(opportunities.length / PAGE_SIZE);
    const displayedItems = opportunities.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    return (
        <Flex bg="primaryWhite" minH="100vh" justify="center" align="center" direction="column" pt="10rem">
            <OpportunityHeaderContainer />
            <OpportunitiesFilter />
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
