/** @jsx jsx */

import { jsx, Box, Text } from 'theme-ui'

export default ({ data }) => (
  <Box>
    <Text as="h1">{data.name}</Text>
    <Text as="p">
      <Text as="b">{data.title}</Text>
    </Text>
    <Text as="p">{data.shortBio.shortBio}</Text>
  </Box>
)
