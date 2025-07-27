/** @jsx jsx */

import { Link } from 'gatsby'
import { FC } from 'react'
import { Box, jsx, Text } from 'theme-ui'

export interface HeroProps {
  data: {
    title: string
    description: string
  }
}

const Hero: FC<HeroProps> = ({ data: { title, description } }) => (
  <Box sx={{ paddingInline: 3 }}>
    <Text as="h1">{title}</Text>
    <Text as="p" sx={{ marginBlock: 3, fontSize: `1.2em` }}>
      <span sx={{ fontFamily: `Georgia, serif` }}>{description}</span>
      <br />
      <Link to="/profile" sx={{ fontSize: `0.83333em` }}>
        Find out more
      </Link>
    </Text>
  </Box>
)

export default Hero
