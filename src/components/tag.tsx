/** @jsx jsx */

import { FC } from 'react'
import { jsx } from 'theme-ui'

const Tag: FC = ({ children }, index) => (
  <span
    key={`${children}-${index}`}
    sx={{
      mr: 2,
      borderWidth: 1,
      borderStyle: `solid`,
      borderColor: `tag`,
      py: 1,
      px: 2,
      display: `inline-block`,
      fontStyle: `italic`,
      fontSize: 2,
      lineHeight: 1,
      color: `text`,
    }}
    {...{ children }}
  />
)

export default Tag
