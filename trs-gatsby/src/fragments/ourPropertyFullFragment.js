import { graphql } from "gatsby"

export const ourPropertyFullFragment = graphql`
  fragment ourPropertyFullFragment on SanityProperty {
    id
    propertyName
    price
    acreage
    mlsid
    metaTitle
    metaDescription
    county {
      countyName
      _rawCountyDescrition(resolveReferences: { maxDepth: 10 })
    }
    ourcounty
    propertyAerialMap {
      asset {
        url
      }
    }
    propertyBrochureFile {
      asset {
        url
      }
    }
    propertyContacts {
      teamFirstName
      teamLastName
      teamEmail
    }
    _rawPropertyDescrition(resolveReferences: { maxDepth: 10 })
    propertyImages {
      asset {
        gatsbyImageData(
          width: 1920
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
          layout: CONSTRAINED
        )
      }
    }
    _rawPropertyImprovements(resolveReferences: { maxDepth: 10 })
    propertyInteractiveLocationMap
    _rawPropertyLand(resolveReferences: { maxDepth: 10 })
    _rawPropertyLocation(resolveReferences: { maxDepth: 10 })
    propertySummary
    propertyTopographicMap {
      asset {
        url
      }
    }
    propertyType {
      propertyTypeName
    }
    _rawPropertyWater(resolveReferences: { maxDepth: 10 })
    _rawPropertyWildlife(resolveReferences: { maxDepth: 10 })
    region {
      regionName
    }
    status
    youtubeUrl
  }
`
