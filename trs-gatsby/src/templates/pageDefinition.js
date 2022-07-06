/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../components/serializers/serializers"
import Layout from "../layout"
import LayoutSearch from "../components/layoutSearch"
import Seo from "../components/seo"
const PageDefinition = ({ data }) => {
  const node = data.page
  const metaTitle = node.metaTitle ? node.metaTitle : node.title

  return (
    <div id={node.slug.current}>
      <Seo title={metaTitle} description={node.metaDescription}></Seo>
      {node.slug.current === "home" && (
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
                node._rawSidebar ? "1000px" : "100%",
                node._rawSidebar ? "1100px" : "100%",
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
                node._rawSidebar ? "0px 5%" : "0px",
                node._rawSidebar ? "0px 5%" : "0px",
              ],
              boxSizing: "content-box",
              justifyContent: "space-between",
              flexDirection: ["column", "row", "row"],
            }}
          >
            {node._rawSidebar && (
              <div
                className="sidebar"
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
              }}
            >
              {node._rawHeroImage && (
                <div
                  sx={{
                    figure: {
                      margin: "0px",
                      display: "flex",
                    },
                  }}
                >
                  <BlockContent
                    blocks={node._rawHeroImage}
                    serializers={Serializers}
                  />
                </div>
              )}
              <div
                className="main-body"
                sx={{
                  padding: "40px 5% 40px 5%",
                  color: "grayBlk",
                  backgroundColor: "#F7F7F7",
                  boxSizing: "border-box",
                  h1: {
                    marginTop: "0px",
                  },
                  "h1,h2,h3,h4,h5,h6": {
                    color: "#484242",
                    fontWeight: "400",
                  },
                  li: {
                    marginBottom: "20px",
                  },
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
      metaTitle
      metaDescription
      title
      _rawHero(resolveReferences: { maxDepth: 10 })
      _rawEntities(resolveReferences: { maxDepth: 10 })
      _rawSidebar(resolveReferences: { maxDepth: 10 })
      _rawHeroImage(resolveReferences: { maxDepth: 10 })
    }
  }
`
