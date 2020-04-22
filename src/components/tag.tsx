/** @jsx jsx */

import { FC } from 'react'
import { jsx, Text } from 'theme-ui'

const Tag: FC<{ children: string }> = ({ children }, index) => (
  <Text
    as="span"
    key={`${children}-${index}`}
    sx={{
      mr: `0.5em`,
      py: `.33333rem`,
      px: `0.5rem`,
      borderWidth: `1px`,
      borderStyle: `solid`,
      borderColor: `tag`,
      display: `inline-block`,
      fontStyle: `italic`,
      fontSize: 2,
      lineHeight: `1`,
      textDecoration: `none`,
      color: `text`,
    }}
  >
    {children}
  </Text>
)

export default Tag
