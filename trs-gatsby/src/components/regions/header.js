/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Burger from "../burger"
import Menu from "../menu"
import Container from "../container"
class Header extends React.Component {
  constructor(props) {
    super(props)
    // this.state = { value: '' };
    this.state = {
      menuOpen: false,
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }
  toggleMenu() {
    this.setState(prevState => ({
      menuOpen: !prevState.menuOpen,
    }))
    console.log(this.state.menuOpen)
  }
  render() {
    return (
      <StaticQuery
        query={graphql`
          query HeadingQuery {
            settings: sanitySiteSettings {
              logo {
                asset {
                  gatsbyImageData
                }
              }
            }
          }
        `}
        render={data => (
          <header>
            {console.log(data)}
            <Container>
              <div
                sx={{
                  width: "100%",
                  display: ["flex", "flex", "null"],
                  padding: "20px 0px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Link
                  to={"/"}
                  sx={{
                    maxWidth: "500px",
                  }}
                >
                  <GatsbyImage
                    sx={{
                      maxWidth: "600px",
                    }}
                    image={data.settings.logo.asset.gatsbyImageData}
                  />
                </Link>
                <div>call: 830-249-9339</div>
              </div>
              <Burger clickMe={this.toggleMenu} open={this.state.menuOpen} />
              <Menu open={this.state.menuOpen}></Menu>
            </Container>
          </header>
        )}
      />
    )
  }
}

export default Header
