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
              layout="constrained"
              alt=""
              image={data.noimage.childImageSharp.gatsbyImageData}
              aspectRatio={20 / 13}
            />
          </div>
        )
      }}
    />
  )
}
