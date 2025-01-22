import { HStack, Button } from "@chakra-ui/react";
import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot,
} from "@/components/ui/pagination"

const OpportunityCardPagination = ({ totalPages, currentPage, onPageChange }) => {
    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    return (
        <HStack spacing={4} mt={4} pb={20}>
            <Button onClick={handlePrev} isDisabled={currentPage === 1}>
                Previous
            </Button>
            <div>
                Page {currentPage} of {totalPages}
            </div>
            <Button onClick={handleNext} isDisabled={currentPage === totalPages}>
                Next
            </Button>
        </HStack>
    );
};

export default OpportunityCardPagination;
