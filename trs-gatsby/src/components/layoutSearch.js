/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./regions/header"
import Footer from "./regions/footer"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "./serializers/serializers"
import SearchResults from "../components/searchResults"
import "./layout.css"
const LayoutSearch = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteSearchTitleQuery {
      site: site {
        siteMetadata {
          title
        }
      }
      blockFragment: sanityPageDefinition(slug: { current: { eq: "home" } }) {
        _rawEntities(resolveReferences: { maxDepth: 10 })
      }
    }
  `)
  return (
    <div
      sx={{
        fontFamily: "body",
        fontWeight: "body",
        fontSize: "2",
        lineHeight: "body",
        h1: {
          fontFamily: "heading",
          fontWeight: "heading",
          lineHeight: "heading",
        },
        h2: {
          fontFamily: "heading",
          fontWeight: "heading",
          lineHeight: "heading",
          fontSize: "6",
        },
      }}
    >
      <div>
        <div
          sx={{
            position: "sticky",
            top: "0",
            zIndex: "9",
          }}
        >
          <Header></Header>
        </div>
        <div
          sx={{
            div: {
              div: {
                minHeight: "450px",
                padding: "0px",
              },
            },
          }}
        >
          <BlockContent
            blocks={data.blockFragment._rawEntities}
            serializers={Serializers}
          />
        </div>
      </div>
      <SearchResults />

      <Footer></Footer>
    </div>
  )
}

LayoutSearch.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutSearch
