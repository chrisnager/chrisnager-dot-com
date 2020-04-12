/** @jsx jsx */

import './index.css'

import { jsx, Box } from 'theme-ui'

import Navigation from './navigation'
import Social from './social'

const Layout = ({ children }) => {
  return (
    <Box sx={{ maxWidth: `75ch`, mx: `auto` }}>
      <Navigation />
      {children}
      <Social />
    </Box>
  )
}

export default Layout
