import { graphql } from "gatsby"

export const blockFragment = graphql`
  fragment blockFragment on SanityPageDefinition {
    _rawEntities(resolveReferences: { maxDepth: 10 })
  }
`
