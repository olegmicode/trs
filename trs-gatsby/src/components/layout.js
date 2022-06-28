/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import Header from "./regions/header"
import Footer from "./regions/footer"

const Layout = ({ children, banner }) => (
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
        fontSize: "3rem",
        margin: "1rem 0rem",
      },
      h2: {
        fontFamily: "heading",
        fontWeight: "heading",
        lineHeight: "heading",
        fontSize: "2rem",
        margin: "1rem 0rem",
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
