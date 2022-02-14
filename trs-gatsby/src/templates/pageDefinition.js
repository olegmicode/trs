/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../components/serializers/serializers"
import Layout from "../components/layout"
import LayoutSearch from "../components/layoutSearch"

const PageDefinition = ({ data }) => {
  const node = data.page
  console.log(node._rawEntities[1])
  return (
    <div>
      {node.slug.current == "home" && (
        <div>
          <LayoutSearch></LayoutSearch>
        </div>
      )}
      {node.slug.current !== "home" && (
        <Layout>
          <div
            sx={{
              display: [
                "block",
                node.sidebar[0] ? "flex" : "block",
                node.sidebar[0] ? "flex" : "block",
              ],
              justifyContent: "space-between",
            }}
          >
            {node.sidebar[0] && (
              <div
                sx={{
                  width: [
                    "100%",
                    node.sidebar[0] ? "175px" : "100%",
                    node.sidebar[0] ? "175px" : "100%",
                  ],
                }}
              >
                <BlockContent
                  blocks={node.sidebar[0]._rawBlockcontent}
                  serializers={Serializers}
                />
              </div>
            )}
            <div
              sx={{
                width: [
                  "100%",
                  node.sidebar[0] ? "calc(100% - 220px)" : "100%",
                  node.sidebar[0] ? "calc(100% - 220px)" : "100%",
                ],
              }}
            >
              <BlockContent
                blocks={node._rawEntities}
                serializers={Serializers}
              />
            </div>
          </div>
        </Layout>
      )}
    </div>
  )
}
export default PageDefinition

export const pageDefinitionQuery = graphql`
  query PageDefinitionBySlug($slug: String!) {
    page: sanityPageDefinition(slug: { current: { eq: $slug } }) {
      slug {
        current
      }
      title
      _rawEntities(resolveReferences: { maxDepth: 10 })
      sidebar {
        _rawBlockcontent(resolveReferences: { maxDepth: 10 })
        blockName
      }
    }
  }
`
