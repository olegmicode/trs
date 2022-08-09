const { notDeepStrictEqual } = require("assert")
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const path = require("path")
const { node } = require("prop-types")
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const pages = await graphql(`
    {
      pagedefinition: allSanityPageDefinition {
        nodes {
          id
          slug {
            current
          }
        }
      }
      ourproperty: allSanityProperty(
        filter: { _id: { regex: "/^(?!draft).*$/" } }
      ) {
        nodes {
          id
          mlsid
          slug {
            current
          }
        }
      }
      additionalcounty: allProperty {
        group(field: county) {
          fieldValue
        }
      }
      ourcounty: allSanityCounty {
        nodes {
          countyName
          id
        }
      }
      ourregion: allSanityRegion {
        nodes {
          regionName
          id
        }
      }
      ourtype: allSanityPropertyType {
        nodes {
          id
          propertyTypeName
        }
      }
      property: allProperty(filter: { mlsid: { ne: "666" } }) {
        nodes {
          mlsid
        }
      }
      team: allSanityTeam {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `)
  const propertyListTypeTemplate = path.resolve(
    "src/templates/propertyListType.js"
  )
  pages.data.ourtype.nodes.forEach(node => {
    var propertyTypeName = node.propertyTypeName
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "")
    createPage({
      path: `${propertyTypeName}-ranches-for-sale`,
      component: propertyListTypeTemplate,
      context: {
        type: node.propertyTypeName,
        id: node.id,
      },
    })
  })

  const propertyListCountyTemplate = path.resolve(
    "src/templates/propertyListCounty.js"
  )
  let newCountyArray = []
  pages.data.ourcounty.nodes.forEach(node => {
    newCountyArray.push(node)
  })
  pages.data.additionalcounty.group.forEach(node => {
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
  // newArray.forEach(node => {

  // })
  newCountyArray.forEach(node => {
    var countyName = node.countyName
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "")
    createPage({
      path: `${countyName}-county-ranches-for-sale`,
      component: propertyListCountyTemplate,
      context: {
        county: node.countyName,
        id: node.id,
      },
    })
  })
  // pages.data.additionalcounty.group.forEach(node => {
  //   var countyName = node.fieldValue
  //     .toLowerCase()
  //     .replace(/ /g, "-")
  //     .replace(/[^\w-]+/g, "")

  //   createPage({
  //     path: `${countyName}-county-ranches-for-sale`,
  //     component: propertyListCountyTemplate,
  //     context: {
  //       county: node.fieldValue,
  //       id: node.id,
  //     },
  //   })
  // })
  const propertyListRegionTemplate = path.resolve(
    "src/templates/propertyListRegion.js"
  )
  pages.data.ourregion.nodes.forEach(node => {
    var regionName = node.regionName
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "")
    createPage({
      path: `${regionName}-region-ranches-for-sale`,
      component: propertyListRegionTemplate,
      context: {
        region: node.regionName,
        id: node.id,
      },
    })
  })

  const propertyTemplate = path.resolve("src/templates/property.js")
  pages.data.property.nodes.forEach(node => {
    createPage({
      path: `/property/${node.mlsid}`,
      component: propertyTemplate,
      context: {
        mlsid: node.mlsid,
      },
    })
  })
  pages.data.ourproperty.nodes.forEach(node => {
    createPage({
      path: `/property/${node.slug.current}`,
      component: propertyTemplate,
      context: {
        mlsid: node.slug.current,
      },
    })
  })
  const pageDefinitionTemplate = path.resolve("src/templates/pageDefinition.js")

  pages.data.pagedefinition.nodes.forEach(node => {
    if (node.slug.current == "home") {
      createPage({
        path: `/`,
        component: pageDefinitionTemplate,
        context: {
          home: true,
          slug: node.slug.current,
        },
      })
    } else {
      createPage({
        path: `/${node.slug.current}`,
        component: pageDefinitionTemplate,
        context: {
          home: false,
          slug: node.slug.current,
        },
      })
    }
  })

  const teamTemplate = path.resolve("src/templates/team.js")
  pages.data.team.nodes.forEach(node => {
    createPage({
      path: `/our-team/` + node.slug.current,
      component: teamTemplate,
      context: {
        slug: node.slug.current,
      },
    })
  })
}

exports.sourceNodes = ({ actions, getNodesByType }) => {
  const { touchNode } = actions
  // touch nodes to ensure they aren't garbage collected
  ;[...getNodesByType(`property`)].forEach(node =>
    touchNode({ nodeId: node.id })
  )
}
const toTimestamp = strDate => {
  const dt = Date.parse(strDate)
  return dt / 1000
}
exports.onCreateNode = async ({
  node,
  actions,
  createNodeId,
  getCache,
  cache,
}) => {
  const { createNode } = actions
  // if (node.internal.type === `SanityProperty`) {
  //   console.log("yes")
  //   if (node.status === "z-sold") {
  //     console.log("3")
  //     node.weight = 3
  //   } else {
  //     node.weight = 1
  //     console.log("1")
  //   }
  // }
  if (node.internal.type === `property`) {
    node.weight = 2
    if (node.price) {
      node.price = parseInt(node.price)
    }
    if (node.pricePerAcre) {
      node.pricePerAcre = parseInt(node.pricePerAcre)
    }
    if (node._updatedAt) {
      node._updatedAt = toTimestamp(node._updatedAt)
    }
    if (node.acreage) {
      node.acreage = parseInt(node.acreage)
    }
    if (node.propertyImages) {
      try {
        const imageIds = await createImages(
          createNode,
          node,
          actions,
          createNodeId,
          cache
        )
        node.children = imageIds
      } catch (error) {
        console.log(error)
      }
    }
  }
}

async function createImages(createNode, node, actions, createNodeId, cache) {
  var imageIds = []
  await Promise.all(
    node.propertyImages.map(async (image, index) => {
      let fileNode
      try {
        fileNode = await createRemoteFileNode({
          url: image,
          parentNodeId: node.id,
          cache,
          createNode,
          createNodeId,
        })
        if (fileNode) {
          imageIds[index] = fileNode.id
        }
      } catch (e) {
        // Ignore
      }
    })
  )
  return imageIds
}
exports.createSchemaCustomization = ({ actions, schema, getNode }) => {
  actions.createTypes([
    schema.buildObjectType({
      name: "SanityProperty",
      interfaces: ["Node"],
      fields: {
        ourcounty: {
          type: "String",
          resolve(source, args, context, info) {
            county = getNode(source.county._ref)
            return county.countyName
          },
        },
        weight: {
          type: "Int",
          resolve(source, args, context, info) {
            ourStatus = source.status
            if (ourStatus === "z-sold") {
              return 3
            } else {
              return 1
            }
          },
        },
      },
    }),
  ])
}

// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions
//   const typeDefs = `
//     type Property implements Node @dontInfer {
//       mlsid: String!
//       id: String!
//       acreage: String
//       county: String
//       propertyDescription: String
//       price: String
//     }
//   `
//   createTypes(typeDefs)
// }
