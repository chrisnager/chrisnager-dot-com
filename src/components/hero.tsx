/** @jsx jsx */

import { Link } from 'gatsby'
import { Box, jsx, Text } from 'theme-ui'

export default ({ data }) => (
  <Box sx={{ px: 3 }}>
    <Text as="h1">{data.title}</Text>
    <Text as="p" sx={{ my: 3, fontSize: 4 }}>
      {data.description}
      <br />
      <Link to="/profile" sx={{ fontSize: 3 }}>
        Learn more
      </Link>
    </Text>
  </Box>
)
