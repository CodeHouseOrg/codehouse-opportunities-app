import { Flex } from "@chakra-ui/react"
import Jobs from "@/components/opportunities/JobComponent/jobs"
import Pagination from "@/components/opportunities/PaginationComponent/opportunityPagination"

export default function Opportunities() {
   return (
    <Flex bg="primaryWhite" minH="100vh" justify="center" align="center" className="text-black">
        <Jobs />
        <Pagination />
    </Flex>
   )
}