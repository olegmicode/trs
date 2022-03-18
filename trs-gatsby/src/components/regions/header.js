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
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../serializers/serializers"
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
    console.log(this)
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
      console.log(this.props.banner)
      var banner = ""
      if (this.props.banner === false) {
        banner = false
      } else {
        banner = true
      }
      if (banner) {
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
            logoStarDesktop: file(name: { eq: "logo-star-est-bottom" }) {
              name
              publicURL
            }
            logoTextDesktop: file(name: { eq: "trfs-logotype-horizontal" }) {
              name
              publicURL
            }
            logoTextMobile: file(
              name: { eq: "trfs-logo-type-muted-compressed" }
            ) {
              name
              publicURL
            }
            logoStarMobile: file(name: { eq: "logo-star-est-top" }) {
              name
              publicURL
            }
            update: sanityTrsUpdate {
              _rawUpdate(resolveReferences: { maxDepth: 10 })
              title
              subTitle
            }
            facebook: file(name: { eq: "FacebookSVG" }) {
              name
              publicURL
            }
            twitter: file(name: { eq: "TwitterSVG" }) {
              name
              publicURL
            }
            linkedin: file(name: { eq: "LinkedINSVG" }) {
              name
              publicURL
            }
            phone: file(name: { eq: "PhoneSVG" }) {
              name
              publicURL
            }
            megaphone: file(name: { eq: "megaphone" }) {
              name
              publicURL
            }
          }
        `}
        render={data => (
          <header
            sx={{
              zIndex: "11",
            }}
          >
            <div
              sx={{
                backgroundColor: "grayBlk",
                color: "#ffffff",
                padding: this.state.updateOpen
                  ? ["80px 20px", "80px 20px", "80px 0px"]
                  : "0px",
                overflow: "hidden",
                transition: "all .5s ease-in-out",
                maxHeight: "0px",
                maxHeight: this.state.updateOpen
                  ? ["800px", "800px", "800px"]
                  : "0px",
                // maxHeight: this.state.updateOpen ? "800px" : "0px",
                // height: this.state.updateOpen ? "auto" : "0px",
              }}
            >
              <Container noMobilePadding={true}>
                <div
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "relative",
                    flexDirection: ["column", "column", "row"],
                  }}
                >
                  <div
                    onClick={this.closePopup.bind(this)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      position: "absolute",
                      top: ["-60px", "-40px", "-40px"],
                      right: "0px",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      sx={{
                        color: "white",
                        fontSize: "1rem",
                      }}
                    >
                      Close
                    </div>
                    <div
                      sx={{
                        height: "30px",
                        width: "30px",
                        marginLeft: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overFlow: "hidden",
                        "&:before": {
                          content: "' '",
                          height: " calc(100% + 15px)",
                          borderLeft: "2px solid #fff",
                          position: "absolute",
                          transform: "rotate(45deg)",
                        },
                        "&:after": {
                          content: "' '",
                          height: "calc(100% + 15px)",
                          borderLeft: "2px solid #fff",
                          position: "absolute",
                          transform: "rotate(-45deg)",
                        },
                      }}
                    ></div>
                  </div>
                  <div
                    sx={{
                      width: ["100%", "100%", "calc(100%)"],
                    }}
                  >
                    <div
                      sx={{
                        margin: "0px 0px 0px 0px",
                        fontWeight: "normal !important",
                        lineHeight: "1.2 !important",
                        fontSize: ["2rem", "2.5rem", "3rem"],
                        fontFamily: "heading",
                      }}
                    >
                      {data.update.title}
                    </div>
                    <div
                      sx={{
                        margin: "0px 0px 25px 0px",
                        fontWeight: "normal !important",
                        lineHeight: "1.2 !important",
                        fontSize: ["1.125rem", "1.125rem", "1.125rem"],
                        fontFamily: "body",
                      }}
                    >
                      {data.update.subTitle}
                    </div>
                    <div
                      sx={{
                        columnCount: ["1", "2", "2"],
                        columnGap: ["0px", "40px", "40px"],
                        p: {
                          margin: [
                            "20px 0px 0px 0px",
                            "20px 0px 0px 0px",
                            "20px 0px 0px 0px",
                          ],
                          "&:first-child": {
                            marginTop: "0px",
                          },
                        },
                      }}
                    >
                      {
                        <BlockContent
                          blocks={data.update._rawUpdate}
                          serializers={Serializers}
                        />
                      }
                    </div>
                  </div>
                </div>
              </Container>
            </div>
            <Container noMobilePadding={true}>
              <div
                sx={{
                  display: "flex",
                  borderBottom: "thin solid",
                  borderColor: "grayMed",
                }}
              >
                <div sx={{}}>
                  <Link
                    to="/"
                    sx={{
                      display: "block",
                      lineHeight: "0px",
                    }}
                  >
                    <img
                      sx={{
                        display: ["none", "block", "block"],
                        maxWidth: "initial",
                        height: ["168px", "168px", "186px"],
                      }}
                      src={data.logoStarDesktop.publicURL}
                      alt="Logo"
                    />
                    <img
                      sx={{
                        display: ["block", "none", "none"],
                        maxWidth: "initial",
                        height: ["131px", "168px", "186px"],
                      }}
                      src={data.logoStarMobile.publicURL}
                      alt="Logo"
                    />
                  </Link>
                </div>
                <div
                  sx={{
                    width: "100%",
                  }}
                >
                  <div
                    sx={{
                      width: "100%",
                      display: ["flex", "flex", "null"],
                      padding: "0px 0px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "grayScant",
                      color: "grayMed",
                      flexDirection: ["column-reverse", "row", "row"],
                      height: ["auto", "111px", "123px"],
                    }}
                  >
                    <Link
                      to={"/"}
                      sx={{
                        width: ["100%", "65%", "47%"],
                        paddingRight: ["0px", "0px", "0px"],
                        boxSizing: "border-box",
                      }}
                    >
                      <img
                        sx={{
                          width: "100%",
                          display: ["none", "none", "block"],
                        }}
                        src={data.logoTextDesktop.publicURL}
                        alt="Logo"
                      />
                      <img
                        sx={{
                          display: ["block", "block", "none"],
                          height: "86px",
                        }}
                        src={data.logoTextMobile.publicURL}
                        alt="Logo"
                      />
                    </Link>
                    <div
                      sx={{
                        display: "flex",
                        width: ["calc(100%)", "calc(35%)", "calc(58%)"],
                        justifyContent: ["flex-end", "flex-end", "flex-end"],
                        paddingRight: ["10px", "35px", "35px"],
                        // padding: ["20px 0px", "20px 0px", "0px"],
                        boxSizing: "border-box",
                        backgroundColor: [
                          "#E9E7E7",
                          "transparent",
                          "transparent",
                        ],
                        height: ["45px", "auto", "auto"],
                      }}
                    >
                      <div
                        sx={{
                          width: ["100%", "auto", "auto"],
                          display: ["flex", "flex", "flex"],
                          justifyContent: ["flex-end", "flex-end", "flex-end"],
                          alignItems: ["center", "flex-start", "center"],
                        }}
                      >
                        <div
                          sx={{
                            cursor: "pointer",
                            marginRight: ["30px", "50px", "25px"],
                            paddingRight: ["0px", "0px", "25px"],
                            borderRight: ["0px", "0px", "thin solid"],
                            borderColor: "grayMed",
                            transition: "all 0.25s ease-in",
                            opacity: !this.state.updateOpen ? "1" : "0",
                            pointerEvents: !this.state.updateOpen
                              ? "auto"
                              : "none",
                            display: "flex",
                            alignItems: "center",
                          }}
                          onClick={this.openPopup.bind(this)}
                        >
                          <img
                            sx={{
                              width: "38px",
                            }}
                            src={data.megaphone.publicURL}
                            alt=""
                          />
                        </div>
                        <div
                          sx={{
                            display: "flex",
                            flexDirection: ["column", "column", "row"],
                          }}
                        >
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
                                color: "grayMed",
                                marginRight: ["60px", "0px", "0px"],
                                fontWeight: "600",
                              }}
                              href="tel:830-249-9339"
                            >
                              <img
                                sx={{
                                  marginRight: "10px",
                                  width: "27px",
                                  display: ["none", "none", "block"],
                                }}
                                src={data.phone.publicURL}
                                alt=""
                              />
                              830-249-9339
                            </a>
                          </div>
                          <div
                            sx={{
                              marginLeft: ["0px", "0px", "25px"],
                              paddingLeft: ["0px", "0px", "25px"],
                              borderLeft: ["0px", "0px", "thin solid"],
                              borderColor: "grayMed",
                              marginTop: ["20px", "20px", "0px"],
                              display: ["none", "flex", "flex"],
                              justifyContent: "flex-end",
                            }}
                          >
                            <a
                              href="https://www.facebook.com/TexasRanchesForSale"
                              target="_blank"
                            >
                              <img
                                sx={{
                                  width: "27px",
                                }}
                                src={data.facebook.publicURL}
                                alt=""
                              />
                            </a>
                            <a
                              href="https://twitter.com/hashtag/TexasRanchesForSale"
                              target="_blank"
                              sx={{
                                marginLeft: "10px",
                              }}
                            >
                              <img
                                sx={{
                                  width: "27px",
                                }}
                                src={data.twitter.publicURL}
                                alt=""
                              />
                            </a>
                            <a
                              href="https://www.linkedin.com/company/texas-ranches-for-sale"
                              target="_blank"
                              sx={{
                                marginLeft: "10px",
                              }}
                            >
                              <img
                                sx={{
                                  width: "27px",
                                }}
                                src={data.linkedin.publicURL}
                                alt=""
                              />
                            </a>
                          </div>
                        </div>
                        <Burger
                          clickMe={this.toggleMenu}
                          open={this.state.menuOpen}
                        />
                      </div>
                    </div>
                  </div>
                  <Menu open={this.state.menuOpen}></Menu>
                </div>
              </div>
            </Container>
          </header>
        )}
      />
    )
  }
}

export default Header
