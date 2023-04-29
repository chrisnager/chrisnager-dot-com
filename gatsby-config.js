require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  pathPrefix: `/`,
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-theme-ui`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-yaml`,
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
