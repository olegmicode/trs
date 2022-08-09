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
    let metaTitle = ""
    let propPath = ""
    let metaDescription = ""
    if (this.props.data.county) {
      metaTitle = this.props.data.county.metaTitle
        ? this.props.data.county.metaTitle
        : this.props.data.county.countyName
      propPath = "https://www.texasranchesforsale.com" + this.props.path
      metaDescription = ""
      if (this.props.data.county.metaDescription) {
        metaDescription = this.props.data.county.metaDescription
      }
    } else {
      metaTitle = this.props.pageContext.county + " County"
      propPath = "https://www.texasranchesforsale.com" + this.props.path
      metaDescription = ""
    }

    return (
      <Layout>
        <Seo title={metaTitle} description={metaDescription} path={propPath} />
        <Container>
          <div
            sx={{
              padding: "20px 0px",
              color: "grayBlk",
            }}
          >
            <h1 sx={{ fontFamily: "Times, sans-serif" }}>{metaTitle}</h1>
            {this.props.data.county ? (
              <BlockContent
                blocks={this.props.data.county._rawCountyDescrition}
                serializers={Serializers}
              />
            ) : (
              ""
            )}
          </div>
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
            {this.props.data.ourproperty.nodes[0] &&
              this.props.data.ourproperty.nodes.map((node, index) => (
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
            {this.props.data.additionalproperties.nodes[0] &&
              this.props.data.additionalproperties.nodes.map((node, index) => (
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
          {!this.props.data.additionalproperties.nodes[0] &&
            !this.props.data.ourproperty.nodes[0] && (
              <div>
                No properties in {this.props.pageContext.county} county.{" "}
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
    additionalproperties: allProperty(
      filter: { mlsid: { ne: "666" }, county: { eq: $county } }
    ) {
      nodes {
        objectID: mlsid
        mlsid
        acreage: acreage
        county: county
        address: propertyName
        description: propertyDescription
        price: price
        updated: _updatedAt
        changed: dateChanged
        city: city
        state: state
        zip: zip
        slug: mlsid
        status: status
        weight: weight
        image: childFile {
          childImageSharp {
            gatsbyImageData(
              width: 1000
              height: 650
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              layout: CONSTRAINED
            )
          }
        }
      }
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
