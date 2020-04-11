/** @jsx jsx */

import { jsx, Box } from 'theme-ui'
import Navigation from './navigation'

const Layout = ({ children }) => {
  return (
    <Box sx={{ maxWidth: '65ch', mx: 'auto' }}>
      <Navigation />
      {children}
    </Box>
  )
}

export default Layout
