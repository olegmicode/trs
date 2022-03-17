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
            update: sanityTrsUpdate {
              _rawUpdate(resolveReferences: { maxDepth: 10 })
              title
              subTitle
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
                        fontSize: ["1.25rem", "1.5rem", "2rem"],
                        fontFamily: "heading",
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
                  width: "100%",
                  display: ["flex", "flex", "null"],
                  padding: "0px 0px",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "grayScant",
                  color: "grayMed",
                  flexDirection: ["column-reverse", "row", "row"],
                }}
              >
                <Link
                  to={"/"}
                  sx={{
                    width: ["100%", "65%", "48%"],
                    paddingRight: ["10px", "0px", "0px"],
                    boxSizing: "border-box",
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
                    width: ["calc(100%)", "calc(35%)", "calc(52%)"],
                    justifyContent: ["space-between", "flex-end", "flex-end"],
                    paddingRight: ["10px", "35px", "35px"],
                    // padding: ["20px 0px", "20px 0px", "0px"],
                    boxSizing: "border-box",
                    backgroundColor: ["#E9E7E7", "transparent", "transparent"],
                  }}
                >
                  <div
                    sx={{
                      backgroundColor: "newTan",
                      color: "#ffffff",
                      display: ["flex", "none", "none"],
                      alignItems: "center",
                      justifyContent: "center",
                      width: ["20%", "14.3%", "9.9%"],
                      fontFamily: "Oswald",
                      fontSize: ["0.9rem", "1.125rem", "1.125rem"],
                      padding: "5px 0px",
                    }}
                  >
                    <div
                      sx={{
                        "> div": {
                          lineHeight: "1rem",
                          display: ["block", "inline", "inline"],
                        },
                      }}
                    >
                      <div>EST.</div>
                      <div>2001</div>
                    </div>
                  </div>
                  <div
                    sx={{
                      width: ["80%", "auto", "auto"],
                      display: ["flex", "flex", "flex"],
                      justifyContent: ["flex-end", "flex-end", "flex-end"],
                      alignItems: ["center", "flex-start", "center"],
                    }}
                  >
                    <div
                      sx={{
                        cursor: "pointer",
                        marginRight: ["30px", "50px", "35px"],
                        paddingRight: ["0px", "0px", "35px"],
                        borderRight: ["0px", "0px", "thin solid"],
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
                            marginRight: ["30px", "0px", "0px"],
                          }}
                          href="phone:830-249-9339"
                        >
                          <GatsbyImage
                            sx={{
                              marginRight: "10px",
                              width: "27px",
                              display: ["none", "none", "block"],
                            }}
                            alt=""
                            image={data.phone.childImageSharp.gatsbyImageData}
                          />
                          830-249-9339
                        </a>
                      </div>
                      <div
                        sx={{
                          marginLeft: ["0px", "0px", "35px"],
                          paddingLeft: ["0px", "0px", "35px"],
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
                          <GatsbyImage
                            sx={{
                              width: "27px",
                            }}
                            alt=""
                            image={
                              data.facebook.childImageSharp.gatsbyImageData
                            }
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
                            image={
                              data.linkedin.childImageSharp.gatsbyImageData
                            }
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
            </Container>
          </header>
        )}
      />
    )
  }
}

export default Header
