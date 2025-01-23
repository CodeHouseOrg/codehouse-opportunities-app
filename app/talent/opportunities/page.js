import { Flex,  HStack, Stack, Text } from "@chakra-ui/react";
import OpportunitiesFilter from "@/components/opportunities/OpportunitiesFilters";
import Jobs from "@/components/opportunities/JobComponent/jobs"
"use client"
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination"
import { useState } from "react"

const pageSize = 6
const count = 50

export default function Opportunities() {
  const items = new Array(count)
    .fill(0)
    .map((_, index) => ({
      id: index + 1,
      // title: `Job Title ${index + 1}`,
      // description: `This is a description for job ${index + 1}.`,
    }));

  const [page, setPage] = useState(1);

  const startRange = (page - 1) * pageSize;
  const endRange = startRange + pageSize;

  const visibleItems = items.slice(startRange, endRange);
   return (
    <Flex bg="primaryWhite" minH="100vh" justify="center" align="center" className="text-black">
      <OpportunitiesFilter/>
      <Jobs items={visibleItems}/>
      <PaginationRoot
        page={page}
        count={count}
        pageSize={pageSize}
        onPageChange={(e) => setPage(e.page)}
      >
        <Stack direction="row" justify="center">
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </Stack>
      </PaginationRoot>
    </Flex>
  );
}
