/** @jsx jsx */

import { FC } from 'react'
import { Box, jsx, Text } from 'theme-ui'

export interface IntroProps {
  date?: string
  title: string
  description: string
}

const Intro: FC<IntroProps> = ({ date, title, description }) => {
  return (
    <Box>
      <Text as="p" sx={{ mb: 3, fontSize: `0.8em` }}>
        {date}
      </Text>
      <Text as="h1">{title}</Text>
      <Text as="p" sx={{ my: 3, fontSize: `1.2em`, fontFamily: `Georgia, serif` }}>
        {description}
      </Text>
    </Box>
  )
}

export default Intro
