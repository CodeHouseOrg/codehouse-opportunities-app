import { Flex } from "@chakra-ui/react";
import OpportunitiesFilter from "@/components/opportunities/OpportunitiesFilters";
import Jobs from "@/components/opportunities/JobComponent/jobs"
import Pagination from "@/components/opportunities/PaginationComponent/opportunityPagination"

export default function Opportunities() {
   return (
    <Flex bg="primaryWhite" minH="100vh" justify="center" align="center" className="text-black">
      <OpportunitiesFilter/>
      <Jobs />
      <Pagination />
    </Flex>
  );
}
