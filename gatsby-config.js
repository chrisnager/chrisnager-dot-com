require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Chris Nager`,
    description: `Developer and designer in Brooklyn, NY, passionate about performance, accessibility, and design systems`,
  },
  pathPrefix: `/`,
  plugins: [
    `gatsby-plugin-theme-ui`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-transformer-yaml`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: { path: `./src/data/` },
    },
    {
      resolve: `gatsby-plugin-html-attributes`,
      options: { lang: `en` },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: { trackingId: `UA-3632655-1` },
    },
  ],
}
