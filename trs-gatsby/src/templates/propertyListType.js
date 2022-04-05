/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../components/serializers/serializers"
import PropertyTeaser from "../components/entity/property/propertyTeaser"
import Layout from "../components/layout"
import Container from "../components/container"
import SEO from "../components/seo"

class PropertyListType extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    var metaTitle = this.props.data.type.metaTitle
      ? this.props.data.type.metaTitle
      : this.props.data.type.propertyTypeName
    var propPath = "https://www.texasranchesforsale.com" + this.props.path
    var metaDescription = ""
    if (this.props.data.type.metaDescription) {
      var metaDescription = this.props.data.type.metaDescription
    }
    return (
      <Layout>
        <SEO
          title={metaTitle}
          description={metaDescription}
          path={propPath}
        ></SEO>
        <Container>
          <div
            sx={{
              padding: "20px 0px",
              color: "grayBlk",
            }}
          >
            <BlockContent
              blocks={this.props.data.type._rawPropertyTypeDescrition}
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
              No properties in {this.props.data.type.propertyTypeName}. Please
              check back regularly.
            </div>
          )}
        </Container>
      </Layout>
    )
  }
}
export default PropertyListType

export const postQuery = graphql`
  query PropertyListByType($type: String!, $id: String!) {
    type: sanityPropertyType(id: { eq: $id }) {
      id
      _rawPropertyTypeDescrition(resolveReferences: { maxDepth: 10 })
      propertyTypeName
      metaTitle
      metaDescription
    }
    ourproperty: allSanityProperty(
      filter: {
        propertyType: { elemMatch: { propertyTypeName: { eq: $type } } }
      }
    ) {
      nodes {
        id
        status
        county: ourcounty
        propertyType {
          propertyTypeName
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
              width: 800
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
