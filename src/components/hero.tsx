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
  <Box sx={{ px: 3 }}>
    <Text as="h1">{title}</Text>
    <Text as="p" sx={{ my: 3, fontSize: 4 }}>
      <span sx={{ fontFamily: `Georgia, serif` }}>{description}</span>
      <br />
      <Link to="/profile" sx={{ fontSize: 3 }}>
        Find out more
      </Link>
    </Text>
  </Box>
)

export default Hero
