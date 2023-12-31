/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Burger from "../components/burger"
import Menu from "../components/menu"
import Container from "../components/container"
import scrollTo from "gatsby-plugin-smoothscroll"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../components/serializers/serializers"
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
          return item
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
            logoFull: file(name: { eq: "trfs-logo-horizontal-clean" }) {
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
            instagram: file(name: { eq: "instagramnew" }) {
              name
              publicURL
            }
            youtube: file(name: { eq: "youtubenew" }) {
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
                      {data?.update?.title}
                    </div>
                    <div
                      sx={{
                        margin: "10px 0px 25px 0px",
                        fontWeight: "normal !important",
                        lineHeight: "1.2 !important",
                        fontSize: ["1.125rem", "1.125rem", "1.125rem"],
                        fontFamily: "body",
                      }}
                    >
                      {data.update?.subTitle}
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
                          blocks={data.update?._rawUpdate}
                          serializers={Serializers}
                        />
                      }
                    </div>
                  </div>
                </div>
              </Container>
            </div>
            <Container fullWidth noMobilePadding={true}>
              <div
                sx={{
                  display: "flex",
                  borderBottom: "thin solid #A29A9A",
                  borderRight: "thin solid #A29A9A",
                }}
              >
                <div
                  sx={{
                    display: ["none", "block", "block"],
                  }}
                >
                  <Link
                    to="/"
                    sx={{
                      display: "block",
                      lineHeight: "0px",
                    }}
                    title="Homepage"
                  >
                    <img
                      sx={{
                        display: ["none", "block", "block"],
                        maxWidth: "initial",
                        height: ["168px", "170px", "186px"],
                      }}
                      src={data.logoStarDesktop.publicURL}
                      alt="Logo"
                      title="Logo"
                    />
                    <img
                      sx={{
                        display: ["block", "none", "none"],
                        maxWidth: "initial",
                        height: ["131px", "168px", "186px"],
                      }}
                      src={data.logoStarMobile.publicURL}
                      alt="Logo"
                      title="Logo"
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
                      height: ["auto", "112px", "123px"],
                    }}
                  >
                    <Link
                      to={"/"}
                      title="Homepage"
                      sx={{
                        maxWidth: ["auto", "650px", "auto", "650px"],
                        width: ["100%", "50%", "100%", "50%"],
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
                        title="Logo"
                      />
                      <img
                        sx={{
                          display: ["none", "block", "none"],
                          height: "86px",
                        }}
                        src={data.logoTextMobile.publicURL}
                        alt="Logo"
                        title="Logo"
                      />
                      <div
                        sx={{
                          padding: "0px 10px 0px 0px",
                        }}
                      >
                        <img
                          sx={{
                            display: ["block", "none", "none"],
                            width: "100%",
                            margin: "-1px",
                          }}
                          src={data.logoFull.publicURL}
                          alt="Logo"
                          title="Logo"
                        />
                      </div>
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
                        position: "relative",
                        top: ["auto", "auto", "auto", "-7%"],
                      }}
                    >
                      <div
                        sx={{
                          width: ["100%", "auto", "auto"],
                          display: ["flex", "flex", "flex"],
                          justifyContent: ["flex-end", "flex-end", "flex-end"],
                          alignItems: [
                            "center",
                            "flex-start",
                            "flex-start",
                            "center",
                          ],
                        }}
                      >
                        <div
                          sx={{
                            cursor: "pointer",
                            marginRight: ["30px", "40px", "25px", "25px"],
                            paddingRight: ["0px", "0px", "25px", "25px"],
                            borderRight: ["0px", "0px", "0px", "thin solid"],
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
                            alt="Mega Phone"
                            title="Mega Phone"
                          />
                        </div>
                        <div
                          sx={{
                            display: "flex",
                            flexDirection: [
                              "column",
                              "column",
                              "column",
                              "row",
                            ],
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
                              title="Phone Number"
                            >
                              <img
                                sx={{
                                  marginRight: "10px",
                                  width: "27px",
                                  display: ["none", "none", "none", "block"],
                                }}
                                src={data.phone.publicURL}
                                alt="Phone"
                                title="Phone"
                              />
                              830-249-9339
                            </a>
                          </div>
                          <div
                            sx={{
                              marginLeft: ["0px", "0px", "0px", "20px"],
                              paddingLeft: ["0px", "0px", "0px", "20px"],
                              borderLeft: ["0px", "0px", "0px", "thin solid"],
                              borderColor: "grayMed",
                              marginTop: ["20px", "20px", "20px", "0px"],
                              display: ["none", "flex", "flex"],
                              justifyContent: "flex-end",
                            }}
                          >
                            <a
                              href="https://www.facebook.com/TexasRanchesForSale"
                              target="_blank"
                              rel="noreferrer"
                              title="Facebook"
                            >
                              <img
                                sx={{
                                  width: "27px",
                                }}
                                src={data.facebook.publicURL}
                                alt="Facebook"
                                title="Facebook"
                              />
                            </a>
                            <a
                              href="https://www.instagram.com/texasranchesforsale/?hl=en"
                              target="_blank"
                              rel="noreferrer"
                              title="Instagram"
                              sx={{
                                marginLeft: "5px",
                              }}
                            >
                              <img
                                sx={{
                                  width: "27px",
                                }}
                                src={data.instagram.publicURL}
                                alt="Instagram"
                                title="Instagram"
                              />
                            </a>
                            <a
                              href="https://www.youtube.com/channel/UC0kN5l4ZuqtXHdQcI4R2ssQ"
                              target="_blank"
                              rel="noreferrer"
                              title="Youtube"
                              sx={{
                                marginLeft: "5px",
                              }}
                            >
                              <img
                                sx={{
                                  width: "27px",
                                }}
                                src={data.youtube.publicURL}
                                alt="Youtube"
                                title="Youtube"
                              />
                            </a>
                            <a
                              href="https://www.linkedin.com/company/texas-ranches-for-sale"
                              target="_blank"
                              rel="noreferrer"
                              title="LinkedIn"
                              sx={{
                                marginLeft: "5px",
                              }}
                            >
                              <img
                                sx={{
                                  width: "27px",
                                }}
                                src={data.linkedin.publicURL}
                                alt="LinkedIn"
                                title="LinkedIn"
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
