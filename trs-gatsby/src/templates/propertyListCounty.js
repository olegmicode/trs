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

class PropertyListCounty extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const metaTitle = this.props.data.county.metaTitle
      ? this.props.data.county.metaTitle
      : this.props.data.county.countyName
    const propPath = "https://www.texasranchesforsale.com" + this.props.path
    let metaDescription = ""
    if (this.props.data.county.metaDescription) {
      metaDescription = this.props.data.county.metaDescription
    }
    console.log(metaTitle)
    return (
      <Layout>
        <Seo title={metaTitle} description={metaDescription} path={propPath} />
        <Container>
          <h2
            sx={{
              fontFamily: "Arimo, sans-serif !important",
              fontSize: "3rem !important",
              marginTop: "100px !important",
              color: "grayBlk"
            }}
          >
            {metaTitle}
          </h2>
          <div
            sx={{
              padding: "20px 0px",
              color: "grayBlk",
            }}
          >
            <BlockContent
              blocks={this.props.data.county._rawCountyDescrition}
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
              No properties in {this.props.data.county.countyName} county.
              Please check back regularly.
            </div>
          )}
        </Container>
      </Layout>
    )
  }
}
export default PropertyListCounty

export const postQuery = graphql`
  query PropertyListByCounty($county: String!, $id: String!) {
    county: sanityCounty(id: { eq: $id }) {
      id
      _rawCountyDescrition(resolveReferences: { maxDepth: 10 })
      countyName
      metaTitle
      metaDescription
    }
    ourproperty: allSanityProperty(
      filter: { county: { countyName: { eq: $county } } }
    ) {
      nodes {
        id
        status
        county: ourcounty
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
