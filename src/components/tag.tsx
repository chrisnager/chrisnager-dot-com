/** @jsx jsx */

import { FC } from 'react'
import { Box, jsx } from 'theme-ui'

interface TagProps {
  children: string
}

const Tag: FC<TagProps> = ({ children }) => {
  const isProjectFilter = [`AI`, `typography`].includes(children)
  const slug = children.toLowerCase().replaceAll(` `, `-`)

  return (
    <Box
      as={isProjectFilter ? `a` : `div`}
      href={isProjectFilter ? `/projects/${slug}` : undefined}
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
}

export default Tag
