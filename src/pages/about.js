/** @jsx jsx */

import { jsx, Box, Text } from 'theme-ui'
import Layout from '../components/layout'

export default () => {
  return (
    <Layout>
      <Box sx={{ px: 3 }}>
        <Text as="h1" sx={{ fontWeight: 500 }}>
          Profile
        </Text>
        <Text as="p" sx={{ my: 3 }}>
          Stuff about me.
        </Text>
      </Box>
    </Layout>
  )
}
