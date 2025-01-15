'use client'

import { createRecipeContext } from '@chakra-ui/react'
import CHLink from '@/components/common/Link'

const { withContext } = createRecipeContext({ key: 'button' })

// Replace "a" with your framework's link component
export const LinkButton = withContext('a')
