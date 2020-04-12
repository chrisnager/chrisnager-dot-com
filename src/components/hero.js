/** @jsx jsx */

import { jsx, Box, Text } from 'theme-ui'
import { Link } from 'gatsby'

export default ({ data }) => (
  <Box sx={{ px: 3 }}>
    <Text as="h1">{data.name}</Text>
    <Text as="p" sx={{ my: 3, fontSize: 4 }}>
      {data.shortBio.shortBio}
      <br />
      <Link to="/profile" sx={{ fontSize: 3 }}>
        Learn more
      </Link>
    </Text>
  </Box>
)
