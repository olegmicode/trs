/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../components/serializers/serializers"
import PropertyTeaser from "../components/entity/property/propertyTeaser"
import Layout from "../layout"
import Container from "../components/container"
import Seo from "../components/seo"

class PropertyListRegion extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props)
    const metaTitle = this.props.data.region.regionName
    const propPath = "https://www.texasranchesforsale.com" + this.props.path
    const metaDescription = ""
    return (
      <Layout>
        <Seo
          title={metaTitle}
          description={metaDescription}
          path={propPath}
        />
        <Container>
          <div
            sx={{
              padding: "20px 0px",
              color: "grayBlk",
            }}
          >
            <h1 sx={{ fontFamily: 'Times, sans-serif' }}>{`${metaTitle} Region Ranches for Sale`}</h1>
            <BlockContent
              blocks={this.props.data.region._rawRegionDescrition}
              serializers={Serializers}
            />
          </div>
          {this.props.data.ourproperty.nodes[0] ? (
            <ul
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                listStyle: "none",
                margin: "0",
                padding: "20px 0px",
              }}
            >
              {this.props.data.ourproperty.nodes.map((node, index) => (
                <li
                  sx={{
                    boxSizing: "border-box",
                    zIndex: "1",
                    position: "relative",
                    backgroundColor: "white",
                    marginBottom: "40px",
                    marginRight: ["0px", "20px", "20px", "20px"],
                    width: [
                      "100%",
                      "calc(50% - 10px)",
                      "calc(100% / 3 - 15px)",
                      "calc(100% / 4 - 20px)",
                    ],
                    "&:nth-of-type(4n + 4)": {
                      marginRight: ["0px", "0px", "0px", "0px"],
                    },
                    "&:nth-of-type(3n + 3)": {
                      marginRight: ["0px", "20px", "0px", "20px"],
                    },
                    "&:nth-of-type(2n + 2)": {
                      marginRight: ["0px", "0px", "20px", "20px"],
                    },
                  }}
                  index={index}
                >
                  <PropertyTeaser property={node} asModal={false} />
                </li>
              ))}
            </ul>
          ) : (
            <div
              sx={{
                fontSize: "24px",
                padding: "0px 0px 40px 0px",
                color: "grayBlk",
              }}
            >
              No properties in {this.props.data.region.regionName} region.
              Please check back regularly.
            </div>
          )}
        </Container>
      </Layout>
    )
  }
}
export default PropertyListRegion

export const postQuery = graphql`
  query PropertyListByRegion($region: String!, $id: String!) {
    region: sanityRegion(id: { eq: $id }) {
      id
      _rawRegionDescrition(resolveReferences: { maxDepth: 10 })
      regionName
    }
    ourproperty: allSanityProperty(
      filter: { region: {elemMatch: {regionName: {eq: $region}}} }
    ) {
      nodes {
        id
        status
        region {
          id
          _rawRegionDescrition(resolveReferences: { maxDepth: 10 })
          regionName
        }
        price
        acreage
        address: propertyName
        propertySummary
        slug {
          current
        }
        sanityimage: propertyImages {
          asset {
            gatsbyImageData(
              width: 900
              height: 600
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              layout: CONSTRAINED
            )
          }
        }
      }
    }
  }
`
