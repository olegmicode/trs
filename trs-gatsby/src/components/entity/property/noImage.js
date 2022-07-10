import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { StaticQuery, graphql } from "gatsby"

export const NoImage = () => {
  return (
    <StaticQuery
      query={graphql`
        query NoImageQuery {
          noimage: file(name: { eq: "no-image" }) {
            name
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      `}
      render={data => {
        return (
          <div>
            <GatsbyImage
              sx={{
                width: "100px",
              }}
              alt=""
              image={data.noimage.childImageSharp.gatsbyImageData}
            />
          </div>
        )
      }}
    />
  )
}
