/** @jsx jsx */

import { FC } from 'react'
import Helmet from 'react-helmet'
import { jsx } from 'theme-ui'

const base = {
  title: `Chris Nager`,
  url: `https://chrisnager.com`,
  description: `Developer and designer in Brooklyn, NY passionate about performance, accessibility, and systematic design.`,
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
}

const Halo: FC<HaloProps> = ({
  title = base.title,
  url = base.url,
  description = base.description,
  image = base.image,
  author = base.author,
  hasCodePenEmbed = base.hasCodePenEmbed,
}) => (
  <Helmet>
    <title>{`${title}${title === base.title ? `` : ` / Chris Nager`}`}</title>
    <link rel="canonical" href={url} />
    <meta name="description" content={description} />
    <meta name="image" content={image} />

    {/* Facebook */}
    <meta property="og:url" content={url} />
    <meta property="og:site_name" content="Chris Nager" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="628" />
    <meta property="og:image:alt" content={`"Chris Nager" displayed in black on a light blue background`} />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content={author} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    <meta name="twitter:site" content={author} />
    <meta name="twitter:creator" content={author} />

    {/* Icons */}
    {/* TODO: Make content hexcode match dynamic background color */}
    <meta name="theme-color" content="#dfeff3" />

    <link rel="icon" href="favicon.svg" />
    <link rel="mask-icon" href="favicon.svg" color="#000000" />

    {/* TODO: Add Apple icon */}
    {/* <link rel="apple-touch-icon" href="apple-touch-icon.png" /> */}
    <link rel="manifest" href="manifest.json" />

    {/* Legacy */}
    {/* <meta charset="utf-8" /> */}
    {/* <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /> */}
    {/* <meta name="viewport" content="width=device-width" /> */}
    {/* <meta property="fb:admins" content="41803347" /> */}
    {/* <meta property="fb:app_id" content="" /> */}
    {/* <meta name="twitter:site" content="@chrisnager" /> */}
    {/* <meta name="twitter:url" content="http://chrisnager.com" /> */}
    {/* <meta name="application-name" content="chrisnager.com" /> */}
    {/* <meta name="msapplication-TileColor" content="#00ccff" /> */}
    {/* <meta name="msapplication-TileImage" content="http://chrisnager.com/img/logo.png" /> */}
    {/* <link rel="index" title="Chris Nager" href="http://chrisnager.com/" /> */}
    {/* <link rel="next" title="Portfolio" href="http://chrisnager.com/portfolio/" /> */}
    {/* <link rel="shortcut icon" href="http://chrisnager.com/img/logo.png" /> */}
    {/* <link rel="icon" type="image/png" href="http://chrisnager.com/img/logo.png" /> */}
    {/* <link rel="apple-touch-icon" href="http://chrisnager.com/img/logo.png" /> */}
    {/* <meta name="apple-mobile-web-app-title" content="short-title" /> */}
    {/* <meta name="application-name" content="short-title" /> */}

    {hasCodePenEmbed && <script async src="https://static.codepen.io/assets/embed/ei.js"></script>}
  </Helmet>
)

export default Halo
