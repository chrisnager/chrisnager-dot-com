require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: { title: 'Chris Nager' },
  pathPrefix: '/',
  plugins: [
    `gatsby-plugin-theme-ui`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-mdx`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: { path: `./src/data/` },
    },
    {
      resolve: `gatsby-transformer-screenshot`,
      options: {
        nodeTypes: [`ProjectsYaml`, `SpeakingYaml`],
      },
    },
    {
      resolve: `gatsby-plugin-html-attributes`,
      options: { lang: `en` },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: { trackingId: `UA-3632655-1` },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `images`,
    //     path: `./src/images`,
    //   },
    // },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `data`,
    //     path: `./src/data`,
    //   },
    // },
  ],
}
