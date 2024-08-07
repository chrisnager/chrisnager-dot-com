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
      <Box sx={{ maxWidth: `55ch`, marginBlockEnd: 5, paddingInline: 3 }}>
        <Intro title="Page not found" description="The page you're looking for has been removed or relocated." />
        Go <Link to="/">home</Link>.
      </Box>
    </Layout>
  )
}

export const Head = () => <Halo title="Page not found" />

export default NotFound
