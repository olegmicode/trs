/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import Layout from "../layout"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Container from "../components/container"

export default function Sitemap() {
  const data = useStaticQuery(graphql`
    query PropertyList {
      county: allSanityCounty {
        nodes {
          countyName
        }
      }
      additionalcounty: allProperty {
        group(field: county) {
          fieldValue
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
  `)
  function regionLink(text) {
    return (
      text
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "") + "-region-ranches-for-sale"
    )
  }
  function countyLink(text) {
    return (
      text
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "") + "-county-ranches-for-sale"
    )
  }
  function typeLink(text) {
    return (
      text
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "") + "-ranches-for-sale"
    )
  }
  let newCountyArray = []
  data.county.nodes.forEach(node => {
    newCountyArray.push(node)
  })
  data.additionalcounty.group.forEach(node => {
    let countyInArray = false
    newCountyArray.forEach(nodeInner => {
      if (node.fieldValue == nodeInner.countyName) {
        countyInArray = true
      }
    })
    if (!countyInArray) {
      let countyObject = { countyName: node.fieldValue, id: "additional" }
      newCountyArray.push(countyObject)
    }
  })
  return (
    <Layout>
      <Container>
        <div sx={{ width: "fit-content", margin: "100px auto" }}>
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
                    <Link
                      to={"/" + regionLink(node.regionName)}
                      sx={{ color: "#484242 !important" }}
                      title={`${node.regionName} index page`}
                    >
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
                })
                .map((node, index) => (
                  <li index={index}>
                    <Link
                      to={"/" + typeLink(node.propertyTypeName)}
                      sx={{ color: "#484242 !important" }}
                      title={`${node.propertyTypeName} index page`}
                    >
                      {node.propertyTypeName}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div sx={{ color: "grayBlk" }}>
            <h2>Properties by County</h2>
            <ul>
              {newCountyArray
                .sort((a, b) => {
                  const nameA = a.countyName.toUpperCase() // ignore upper and lowercase
                  const nameB = b.countyName.toUpperCase() // ignore upper and lowercase
                  if (nameA < nameB) {
                    return -1
                  }
                  return 1
                })
                .map((node, index) => (
                  <li index={index}>
                    <Link
                      to={"/" + countyLink(node.countyName)}
                      sx={{ color: "#484242 !important" }}
                      title={`${node.countyName} index page`}
                    >
                      {node.countyName}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
