/** @jsx jsx */

import { jsx } from 'theme-ui'

export default ({ children }) => (
  <div
    sx={{
      maxWidth: 1180,
      padding: 4,
      bg: 'primary',
      mx: 'auto',
    }}
  >
    {children}
  </div>
)
