/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./regions/header"
import Footer from "./regions/footer"
import "./layout.css"
const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
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
      <Header></Header>

      <main>{children}</main>

      <Footer></Footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
