import type { GatsbyConfig } from 'gatsby'
import * as dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
})

const config: GatsbyConfig = {
  pathPrefix: `/`,

  plugins: [
    `gatsby-plugin-mdx`,
    `gatsby-plugin-theme-ui`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-yaml`,
    {
      options: { name: `pages`, path: `${__dirname}/src/pages` },
      resolve: `gatsby-source-filesystem`,
    },
    {
      options: { path: `./src/data/` },
      resolve: `gatsby-source-filesystem`,
    },
    {
      options: { trackingId: `UA-3632655-1` },
      resolve: `gatsby-plugin-google-analytics`,
    },
  ],

  siteMetadata: {
    description: `Developer and designer in Brooklyn, NY, passionate about performance, accessibility, and design systems`,
    title: `Chris Nager`,
    siteUrl: `https://chrisnager.com`,
  },
}

export default config
