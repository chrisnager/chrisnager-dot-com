/** @jsx jsx */

import { Link } from 'gatsby'
import { FC } from 'react'
import Helmet from 'react-helmet'
import { Box, jsx } from 'theme-ui'

import Intro from '../components/intro'
import Layout from '../components/layout'

const NotFound: FC = () => {
  return (
    <Layout>
      <Helmet>
        <title>Page not found / Chris Nager</title>
        <meta
          name="description"
          content="Developer and designer in Brooklyn, NY passionate about performance, accessiblity, and systematic design."
        />
      </Helmet>
      <Box sx={{ maxWidth: `55ch`, mb: 5, px: 3 }}>
        <Intro title="Page not found" description="The page you're looking for has been removed or relocated." />
        Go <Link to="/">home</Link>.
      </Box>
    </Layout>
  )
}

export default NotFound
