require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const postType = {
  id: 1,
  mlsid: "666",
  field_images: [
    "https://mls-api-trfs.pantheonsite.io/sites/default/files/99722-1599649396-44.jpg",
    "https://mls-api-trfs.pantheonsite.io/sites/default/files/78490-1597381396-17.jpg",
  ],
}
module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: `5b1rgyjn`,
        dataset: `production`,
        // a token with read permissions is required
        // if you have a private dataset
        token: process.env.SANITY_TOKEN,

        // If the Sanity GraphQL API was deployed using `--tag <name>`,
        // use `graphqlTag` to specify the tag name. Defaults to `default`.
        graphqlTag: "default",
        overlayDrafts: true,
        watchMode: true,
      },
    },
    "gatsby-plugin-theme-ui",
    // {
    //   resolve: `gatsby-plugin-remote-images`,
    //   options: {
    //     nodeType: "internal__posts",
    //     name: "localImages",
    //     imagePath: "field_images",
    //     type: "array",
    //     // ** ALL OPTIONAL BELOW HERE: **
    //   },
    // },
    // require.resolve(`./digett-source-idx`),
    {
      resolve: "gatsby-source-apiserver",
      options: {
        url: "https://mls-api-trfs.pantheonsite.io/rest/mls",
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
        typePrefix: "internal__",
        name: `posts`,
        verboseOutput: true,
        // Define schemaType to normalize blank values
        // example:
        schemaType: postType,
      },
    },
    // require.resolve(`./digett-source-kerrville`),
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
