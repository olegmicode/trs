const postQuery = `{
  additionalproperties: allProperty(filter: {mlsid: {ne: "666"}}) {
    nodes{
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
  
  ourproperties: allSanityProperty(filter: {_id: {regex: "/^(?!draft).*$/"}}) {
    nodes{
      objectID: id
      address: propertyName
      county: ourcounty
      price: price
      acreage: acreage
      strapline: strapline
      description: propertySummary
      updated: _updatedAt
      changed: _updatedAt
      status: status
      weight:weight
      sanityimage: propertyImages {
        asset {
          gatsbyImageData(
            width: 1000
            height: 650
            placeholder: DOMINANT_COLOR
            formats: [AUTO, WEBP, AVIF]
            layout: CONSTRAINED
          )
        }
      }
      slug: slug{
        current
      }
    }
  }
}`

// const flatten = arr =>
//   arr.map(({ node: { mlsid, ...rest } }) => ({
//     ...mlsid,
//     ...rest,
//   }))

const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => data.additionalproperties.nodes,
    indexName: `additional_properties`,
  },
  {
    query: postQuery,
    transformer: ({ data }) => data.ourproperties.nodes,
    indexName: `additional_properties`,
  },
]

module.exports = queries
