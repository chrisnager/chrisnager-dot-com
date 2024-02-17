/** @jsx jsx */

import { FC, Fragment } from 'react'
import { jsx } from 'theme-ui'

const base = {
  title: `Chris Nager`,
  url: `https://chrisnager.com`,
  description: `Developer and designer in Brooklyn, NY, passionate about performance, accessibility, and design systems`,
  image: `https://chrisnager.com/chris-nager-card.png`,
  author: `@chrisnager`,
  hasCodePenEmbed: false,
}

export interface HaloProps {
  title?: string
  url?: string
  description?: string
  image?: string
  author?: string
  hasCodePenEmbed?: boolean
  children?: React.ReactNode
}

const Halo: FC<HaloProps> = ({
  title = base.title,
  url = base.url,
  description = base.description,
  image = base.image,
  author = base.author,
  hasCodePenEmbed = base.hasCodePenEmbed,
  children,
}) => {
  return (
    <Fragment>
      <html lang="en" />
      <title>{`${title}${title === base.title ? `` : ` / Chris Nager`}`}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta name="application-name" content="Chris Nager" />
      <meta name="apple-mobile-web-app-title" content="Chris Nager" />
      <link rel="icon" href="favicon.svg" />
      <link rel="mask-icon" href="favicon.svg" color="#000000" />
      <link rel="apple-touch-icon" href="apple-touch-icon.png" />
      <link rel="manifest" href="manifest.json" />

      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Chris Nager" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="628" />
      <meta property="og:image:alt" content={`"Chris Nager" displayed in black on a light blue background`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content={author} />
      <meta name="twitter:creator" content={author} />

      {hasCodePenEmbed && <script async src="https://static.codepen.io/assets/embed/ei.js"></script>}

      {children}
    </Fragment>
  )
}

export default Halo
