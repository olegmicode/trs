/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Burger from "../burger"
import Menu from "../menu"
import Container from "../container"
import scrollTo from "gatsby-plugin-smoothscroll"

const setItem = (key, value, numberOfDays) => {
  const now = new Date()

  // set the time to be now + numberOfDays
  now.setTime(now.getTime() + numberOfDays * 60 * 60 * 24 * 1000)
  if (typeof window !== "undefined") {
    document.cookie = `${key}=${value}; expires=${now.toUTCString()}; path=/`
  }
}
class Header extends React.Component {
  constructor(props) {
    super(props)
    // this.state = { value: '' };
    this.state = {
      menuOpen: false,
      updateOpen: null,
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }
  toggleMenu() {
    this.setState(prevState => ({
      menuOpen: !prevState.menuOpen,
    }))
  }
  componentWillMount() {
    function getCookieItem(key) {
      if (typeof window !== "undefined") {
        var updateOpen = ""
        document.cookie.split(`; `).reduce((total, currentCookie) => {
          const item = currentCookie.split(`=`)
          const storedKey = item[0]
          const storedValue = item[1]
          updateOpen =
            key === storedKey ? decodeURIComponent(storedValue) : total
        }, ``)
        return updateOpen
      }
    }

    if (typeof window !== "undefined") {
      const updateOpenCookie = getCookieItem("updateOpen")
      if (updateOpenCookie !== undefined) {
        if (updateOpenCookie === "false") {
          this.setState({ updateOpen: false })
        } else {
          setTimeout(
            function () {
              //Start the timer
              this.setState({ updateOpen: true }) //After 1 second, set render to true
            }.bind(this),
            2000
          )
        }
      }
    }
  }

  closePopup() {
    setItem("updateOpen", "false", 30)
    this.setState(prevState => ({
      updateOpen: !prevState.updateOpen,
    }))
  }
  openPopup() {
    setItem("updateOpen", "true", 30)
    this.setState(prevState => ({
      updateOpen: !prevState.updateOpen,
    }))
    scrollTo("body")
  }
  useCookie = (key, defaultValue) => {
    // const getCookie = () => getItem(key) || defaultValue
    // const [cookie, setCookie] = useState(getCookie())
    // const updateCookie = (value, numberOfDays) => {
    //   setCookie(value)
    //   setItem(key, value, numberOfDays)
    // }
    // return [cookie, updateCookie]
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
            facebook: file(name: { eq: "Facebook" }) {
              name
              childImageSharp {
                gatsbyImageData
              }
            }
            twitter: file(name: { eq: "Twitter" }) {
              name
              childImageSharp {
                gatsbyImageData
              }
            }
            linkedin: file(name: { eq: "LinkedIN" }) {
              name
              childImageSharp {
                gatsbyImageData
              }
            }
            phone: file(name: { eq: "Phone" }) {
              name
              childImageSharp {
                gatsbyImageData
              }
            }
            megaphone: file(name: { eq: "MegaPhone" }) {
              name
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        `}
        render={data => (
          <header>
            <div
              sx={{
                backgroundColor: "grayBlk",
                color: "#ffffff",
                padding: this.state.updateOpen ? "80px 0px" : "0px",
                overflow: "hidden",
                transition: "all .5s ease-in-out",
                maxHeight: "0px",
                maxHeight: this.state.updateOpen ? "400px" : "0px",
                // maxHeight: this.state.updateOpen ? "800px" : "0px",
                // height: this.state.updateOpen ? "auto" : "0px",
              }}
            >
              <Container>
                <div
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <div
                    sx={{
                      position: "absolute",
                      top: "-40px",
                      right: "0px",
                      cursor: "pointer",
                    }}
                    onClick={this.closePopup.bind(this)}
                  >
                    Close
                  </div>
                  <div
                    sx={{
                      width: "calc(50% - 20px)",
                    }}
                  >
                    <h2
                      sx={{
                        margin: "0px 0px 25px 0px",
                        fontWeight: "normal !important",
                      }}
                    >
                      Update January 2022
                    </h2>
                    <div>
                      Texas Ranches For Sale was founded in 2001 on the
                      foundation of providing our clients with the highest
                      degree of knowledge and to provide honest, personal
                      attention to every customer. The last 8-9 months have been
                      unchartered waters and we want to help you navigate
                      through them. We are staying abreast of the current events
                      and are dedicated to keeping you informed of any changes
                      affecting our daily lives, the financial markets, and the
                      impact those changes might have on the land market.
                    </div>
                  </div>
                  <div
                    sx={{
                      width: "calc(50% - 20px)",
                    }}
                  >
                    <div>
                      During this time we will continue to diligently promote
                      our client’s properties and provide quality service to our
                      buyer clients. We have much to be thankful for, including
                      our valued clients, colleagues, friends, and family
                      members. We understand the struggles of this time, but we
                      have and will not waiver from our commitment to you. Feel
                      free to reach out to us with any questions and we look
                      forward to working through this and working with each of
                      you.
                    </div>
                    <div
                      sx={{
                        marginTop: "25px",
                        textAlign: "right",
                      }}
                    >
                      Ken Hoerster, President/Broker
                    </div>
                  </div>
                </div>
              </Container>
            </div>
            <Container>
              <div
                sx={{
                  width: "100%",
                  display: ["flex", "flex", "null"],
                  padding: "0px 0px",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "grayScant",
                  color: "grayMed",
                }}
              >
                <Link
                  to={"/"}
                  sx={{
                    width: ["40%", "40%", "40%"],
                  }}
                >
                  <GatsbyImage
                    sx={{
                      maxWidth: "100%",
                    }}
                    alt=""
                    image={data.settings.logo.asset.gatsbyImageData}
                  />
                </Link>
                <div
                  sx={{
                    display: "flex",
                    width: [
                      "calc(60% - 40px)",
                      "calc(60% - 40px)",
                      "calc(60% - 40px)",
                    ],
                    justifyContent: "flex-end",
                    paddingRight: "40px",
                  }}
                >
                  <div
                    sx={{
                      cursor: "pointer  ",
                      marginRight: "50px",
                      paddingRight: "50px",
                      borderRight: "thin solid",
                      borderColor: "grayMed",
                      transition: "all 0.25s ease-in",
                      opacity: !this.state.updateOpen ? "1" : "0",
                      pointerEvents: !this.state.updateOpen ? "auto" : "none",
                    }}
                    onClick={this.openPopup.bind(this)}
                  >
                    <GatsbyImage
                      sx={{
                        width: "38px",
                      }}
                      alt=""
                      image={data.megaphone.childImageSharp.gatsbyImageData}
                    />
                  </div>

                  <div
                    sx={{
                      a: {
                        color: "grayMed",
                      },
                    }}
                  >
                    <a
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "1.125rem",
                      }}
                      href="phone:830-249-9339"
                    >
                      <GatsbyImage
                        sx={{
                          marginRight: "10px",
                          width: "27px",
                        }}
                        alt=""
                        image={data.phone.childImageSharp.gatsbyImageData}
                      />
                      830-249-9339
                    </a>
                  </div>
                  <div
                    sx={{
                      marginLeft: "50px",
                      paddingLeft: "50px",
                      borderLeft: "thin solid",
                      borderColor: "grayMed",
                    }}
                  >
                    <a
                      href="https://www.facebook.com/TexasRanchesForSale"
                      target="_blank"
                    >
                      <GatsbyImage
                        sx={{
                          width: "27px",
                        }}
                        alt=""
                        image={data.facebook.childImageSharp.gatsbyImageData}
                      />
                    </a>
                    <a
                      href="https://twitter.com/hashtag/TexasRanchesForSale"
                      target="_blank"
                      sx={{
                        marginLeft: "10px",
                      }}
                    >
                      <GatsbyImage
                        sx={{
                          width: "27px",
                        }}
                        alt=""
                        image={data.twitter.childImageSharp.gatsbyImageData}
                      />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/texas-ranches-for-sale"
                      target="_blank"
                      sx={{
                        marginLeft: "10px",
                      }}
                    >
                      <GatsbyImage
                        sx={{
                          width: "27px",
                        }}
                        alt=""
                        image={data.linkedin.childImageSharp.gatsbyImageData}
                      />
                    </a>
                  </div>
                </div>
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
