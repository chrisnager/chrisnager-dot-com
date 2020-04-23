/** @jsx jsx */

import { FC } from 'react'
import { Box, jsx, Text } from 'theme-ui'

export interface IntroProps {
  title: string
  description: string
}

const Intro: FC<IntroProps> = ({ title, description }) => {
  return (
    <Box>
      <Text as="h1">{title}</Text>
      <Text as="p" sx={{ my: 3, fontSize: 4, fontFamily: `Georgia, serif` }}>
        {description}
      </Text>
    </Box>
  )
}

export default Intro
