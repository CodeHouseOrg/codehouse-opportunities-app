"use client"
import { HStack, Stack, Text} from "@chakra-ui/react"
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination"
import { useState } from "react"

const pageSize = 6
const count = 50

const Pagination = () => {
  const items = new Array(count)
    .fill(0)
    .map((_, index) => `${index + 1}`)
  const [page, setPage] = useState(1)

  const startRange = (page - 1) * pageSize
  const endRange = startRange + pageSize

  const visibleItems = items.slice(startRange, endRange)

  return (
    <Stack gap="10">
      <Stack>
        {visibleItems.map((item) => (
          <Text key={item}>{item}</Text>
        ))}
      </Stack>
      <PaginationRoot
        page={page}
        count={count}
        pageSize={pageSize}
        onPageChange={(e) => setPage(e.page)}
      >
        <HStack>
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>
    </Stack>
  )
}

export default Pagination;
