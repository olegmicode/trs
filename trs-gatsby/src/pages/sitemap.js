/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import Layout from "../layout"
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Container from "../components/container"
class Sitemap extends React.Component {
  regionLink(text) {
    return (
      text
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "") + "-region-ranches-for-sale"
    )
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
            region: allSanityRegion {
              nodes {
                regionName
              }
            }
          }
        `}
        render={data => (
          <Layout>
            <Container>
              <div sx={{ width: 'fit-content', margin: '100px auto' }}>
                <h1 sx={{ color: "grayBlk" }}>Property Listing Sitemap</h1>
                <div sx={{ color: "grayBlk" }}>
                  <h2>Properties by Region</h2>
                  <ul>
                    {data.region.nodes
                      .sort((a, b) => {
                        const nameA = a.regionName.toUpperCase() // ignore upper and lowercase
                        const nameB = b.regionName.toUpperCase() // ignore upper and lowercase
                        if (nameA < nameB) {
                          return -1
                        }
                        return 1
                      })
                      .map((node, index) => (
                        <li index={index}>
                          <Link to={"/" + this.regionLink(node.regionName)} sx={{ color: "#484242 !important" }}>
                            {node.regionName}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
                <div sx={{ color: "grayBlk" }}>
                  <h2>Properties by Type</h2>
                  <ul>
                    {data.type.nodes
                      .sort((a, b) => {
                        const nameA = a.propertyTypeName.toUpperCase() // ignore upper and lowercase
                        const nameB = b.propertyTypeName.toUpperCase() // ignore upper and lowercase
                        if (nameA < nameB) {
                          return -1
                        }
                        return 1
                      }).map((node, index) => (
                      <li index={index}>
                        <Link to={"/" + this.typeLink(node.propertyTypeName)} sx={{ color: "#484242 !important" }}>
                          {node.propertyTypeName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div sx={{ color: "grayBlk" }}>
                  <h2>Properties by County</h2>
                  <ul>
                    {data.county.nodes
                      .sort((a, b) => {
                        const nameA = a.countyName.toUpperCase() // ignore upper and lowercase
                        const nameB = b.countyName.toUpperCase() // ignore upper and lowercase
                        if (nameA < nameB) {
                          return -1
                        }
                        return 1
                      }).map((node, index) => (
                      <li index={index}>
                        <Link to={"/" + this.countyLink(node.countyName)} sx={{ color: "#484242 !important" }}>
                          {node.countyName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Container>
          </Layout>
        )}
      />
    )
  }
}
export default Sitemap
