/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../components/serializers/serializers"
import Layout from "../components/layout"
import LayoutSearch from "../components/layoutSearch"

const PageDefinition = ({ data }) => {
  const node = data.page
  console.log(node)
  return (
    <div>
      {node.slug.current == "home" && (
        <div>
          <LayoutSearch></LayoutSearch>
        </div>
      )}
      {node.slug.current !== "home" && (
        <Layout>
          {node._rawHero && (
            <div>
              <BlockContent blocks={node._rawHero} serializers={Serializers} />
            </div>
          )}
          <div
            sx={{
              display: [
                "flex",
                node._rawSidebar ? "flex" : "block",
                node._rawSidebar ? "flex" : "block",
              ],
              maxWidth: [
                node._rawSidebar ? "800px" : "100%",
                node._rawSidebar ? "1000px" : "100%",
                node._rawSidebar ? "1200px" : "100%",
                node._rawSidebar ? "1440px" : "100%",
              ],
              margin: [
                node._rawSidebar ? "0 auto" : "100%",
                node._rawSidebar ? "0 auto" : "100%",
                node._rawSidebar ? "0 auto" : "100%",
              ],
              padding: [
                node._rawSidebar ? "0px 0%" : "0px",
                node._rawSidebar ? "0px 3%" : "0px",
                node._rawSidebar ? "0px 5%" : "0px",
              ],
              boxSizing: "content-box",
              justifyContent: "space-between",
              flexDirection: ["column-reverse", "row", "row"],
            }}
          >
            {node._rawSidebar && (
              <div
                sx={{
                  width: [
                    "100%",
                    node._rawSidebar ? "280px" : "100%",
                    node._rawSidebar ? "280px" : "100%",
                  ],
                  position: ["relative", "sticky", "sticky"],
                  top: "0px",
                  height: "100%",
                  paddingBottom: "20px",
                  paddingTop: "40px",
                }}
              >
                <BlockContent
                  blocks={node._rawSidebar[0]}
                  serializers={Serializers}
                />
              </div>
            )}
            <div
              sx={{
                width: [
                  "100%",
                  node._rawSidebar ? "calc(100% - 320px)" : "100%",
                  node._rawSidebar ? "calc(100% - 320px)" : "100%",
                ],
                padding: "40px 0px",
              }}
            >
              {node._rawEntities && (
                <div
                  className="tester"
                  sx={{
                    "section > div": {
                      padding: "0px !important",
                    },
                  }}
                >
                  <BlockContent
                    blocks={node._rawEntities}
                    serializers={Serializers}
                  />
                </div>
              )}
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
      _rawHero(resolveReferences: { maxDepth: 10 })
      _rawEntities(resolveReferences: { maxDepth: 10 })
      _rawSidebar(resolveReferences: { maxDepth: 10 })
    }
  }
`
