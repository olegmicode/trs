/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Container from "../components/container"
class Sitemap extends React.Component {
  constructor(props) {
    super(props)
  }
  countyLink(text) {
    return (
      text
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "") + "-county-ranches-for-sale"
    )
  }
  typeLink(text) {
    return (
      text
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "") + "-ranches-for-sale"
    )
  }
  render() {
    console.log(this)
    return (
      <StaticQuery
        query={graphql`
          query PropertyList {
            county: allSanityCounty {
              nodes {
                countyName
              }
            }
            type: allSanityPropertyType {
              nodes {
                propertyTypeName
              }
            }
          }
        `}
        render={data => (
          <Layout>
            <Container>
              <h1>Property Sitemap</h1>
              <div>
                <h2>Properties by County</h2>
                <ul>
                  {data.county.nodes.map((node, index) => (
                    <li index={index}>
                      <Link to={"/" + this.countyLink(node.countyName)}>
                        {node.countyName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2>Properties by Type</h2>
                <ul>
                  {data.type.nodes.map((node, index) => (
                    <li index={index}>
                      <Link to={"/" + this.typeLink(node.propertyTypeName)}>
                        {node.propertyTypeName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Container>
          </Layout>
        )}
      />
    )
  }
}
export default Sitemap
