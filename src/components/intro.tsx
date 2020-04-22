/** @jsx jsx */

import { FC, Fragment } from 'react'
import { Box, jsx, Text } from 'theme-ui'

export interface IntroProps {
  title: string
  description: string
}

const Intro: FC<IntroProps> = ({ title, description }) => {
  return (
    <Box as={Fragment}>
      <Text as="h1">{title}</Text>
      <Text as="p" sx={{ my: 3, fontSize: 4 }}>
        {description}
      </Text>
    </Box>
  )
}

export default Intro
