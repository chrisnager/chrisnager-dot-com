import type { GatsbyConfig } from 'gatsby'

// TODO: Refactor in TypeScript
require(`dotenv`).config({
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
      options: { name: `posts`, path: `${__dirname}/src/pages/blog` },
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
  },
}

export default config
