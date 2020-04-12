/** @jsx jsx */

import { jsx, Box, Text } from 'theme-ui'

export default ({ data }) => (
  <Box sx={{ px: 3 }}>
    <Text as="h1">{data.name}</Text>
    <Text as="p" sx={{ my: 3 }}>
      {data.shortBio.shortBio}
    </Text>
  </Box>
)
