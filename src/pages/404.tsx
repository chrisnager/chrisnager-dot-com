/** @jsx jsx */

import { Link } from 'gatsby'
import { FC } from 'react'
import { Box, jsx } from 'theme-ui'

import Halo from '../components/halo'
import Intro from '../components/intro'
import Layout from '../components/layout'

const NotFound: FC = () => {
  return (
    <Layout>
      <Halo title="Page not found" />
      <Box sx={{ maxWidth: `55ch`, mb: 5, px: 3 }}>
        <Intro title="Page not found" description="The page you're looking for has been removed or relocated." />
        Go <Link to="/">home</Link>.
      </Box>
    </Layout>
  )
}

export default NotFound
