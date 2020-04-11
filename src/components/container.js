/** @jsx jsx */

import { jsx } from 'theme-ui'

export default ({ children }) => (
  <div
    sx={{
      maxWidth: '65ch',
      mx: 'auto',
    }}
    {...{ children }}
  />
)
