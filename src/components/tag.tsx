/** @jsx jsx */

import { FC } from 'react'
import { jsx } from 'theme-ui'

const Tag: FC = ({ children }) => (
  <span
    key={children}
    sx={{
      mr: 2,
      py: 1,
      px: 2,
      display: `inline-block`,
      fontStyle: `italic`,
      fontSize: 2,
      lineHeight: 1,
      color: `text`,
      backgroundColor: `tag`,
    }}
    {...{ children }}
  />
)

export default Tag
