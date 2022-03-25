/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./regions/header"
import Footer from "./regions/footer"
const Layout = ({ props, children, banner, header }) => {
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
        letterSpacing: "1px",
        h1: {
          fontFamily: "heading",
          fontWeight: "heading",
          lineHeight: "heading",
          fontSize: "4rem",
        },
        h2: {
          fontFamily: "heading",
          fontWeight: "heading",
          lineHeight: "heading",
          fontSize: "3rem",
        },
        p: {
          a: {
            color: "grayMed",
          },
        },
      }}
    >
      <Header banner={banner}></Header>

      <main>{children}</main>

      <Footer></Footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
