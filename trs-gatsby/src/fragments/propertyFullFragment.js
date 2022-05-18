import { graphql } from "gatsby"

export const propertyFullFragment = graphql`
  fragment propertyFullFragment on property {
    mlsid
    id
    acreage
    county
    propertyDescription
    price
    propertyName
    field_listingidserbo
    field_idx_mls_number
    field_mst_mls_number
    field_office1
    childrenFile {
      childImageSharp {
        gatsbyImageData(
          width: 800
          height: 500
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
          layout: CONSTRAINED
        )
      }
    }
  }
`
