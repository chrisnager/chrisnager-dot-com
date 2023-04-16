/** @jsx jsx */

import { FC } from 'react'
import { Box, jsx } from 'theme-ui'

interface TagProps {
  children: string
}

const Tag: FC<TagProps> = ({ children }) => {
  const slug = children.toLowerCase().replace(/ /g, '-')

  return (
    <Box
      as="a"
      href={`/projects/${slug}`}
      key={children}
      sx={{
        mr: 2,
        py: 1,
        px: 2,
        display: `inline-block`,
        fontStyle: `italic`,
        fontSize: `0.8em`,
        lineHeight: 1,
        color: `text`,
        backgroundColor: `tag`,
      }}
      {...{ children }}
    />
  )
}

export default Tag
