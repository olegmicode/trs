/** @jsx jsx */
import { jsx } from "theme-ui"
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import scrollTo from "gatsby-plugin-smoothscroll"
import { AnchorLink } from "gatsby-plugin-anchor-links"

const Menu = open => {
  function menuPath(sanityPath) {
    if (sanityPath == "home") {
      return "#search-results"
    } else {
      return sanityPath
    }
  }
  return (
    <StaticQuery
      query={graphql`
        query MenuQuery {
          menu: sanityMenu {
            title
            _rawChildren(resolveReferences: { maxDepth: 10 })
          }
          facebook: file(name: { eq: "FacebookWhite" }) {
            name
            publicURL
          }
          twitter: file(name: { eq: "TwitterWhite" }) {
            name
            publicURL
          }
          instagram: file(name: { eq: "instagramwhitenew" }) {
            name
            publicURL
          }
          youtube: file(name: { eq: "youtubewhitenew" }) {
            name
            publicURL
          }
          linkedin: file(name: { eq: "LinkedINWhite" }) {
            name
            publicURL
          }
        }
      `}
      render={data => (
        <div
          sx={{
            display: "flex",
            height: [
              "calc(100% - 112px)",
              "calc(100% - 112px)",
              "calc(100% - 123px)",
            ],
          }}
        >
          <div
            sx={{
              margin: "0 auto",
              boxSizing: "content-box",
              width: ["75%", "100%", "100%"],
              maxWidth: ["300px", "100%", "100%"],
              height: "100%",
              right: "0px",
              top: "0px",
              display: "flex",
              flexDirection: ["column", "row", "row"],
              position: ["fixed", "relative", "relative"],
              zIndex: "999",
              borderTop: ["0px", "thin solid #A29A9A", "thin solid #A29A9A"],
              transition: "transform 0.3s ease-in-out",
              boxSizing: "border-box",
              padding: ["20px", "0px", "0px"],
              backgroundColor: [
                "rgba(109, 100, 101, 0.92)",
                "grayLight",
                "grayLight",
              ],
              transform: [
                open.open ? "translateX(0%)" : "translateX(100%)",
                "none",
                "none",
              ],
            }}
          >
            <div
              sx={{
                marginLeft: ["0px", "0px", "35px"],
                paddingLeft: ["0px", "0px", "35px"],
                borderLeft: ["0px", "0px", "thin solid #A29A9A"],
                marginTop: ["0px", "20px", "0px"],
                display: ["flex", "none", "none"],
                justifyContent: "flex-start",
                marginBottom: ["20px", "0px", "0px"],
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
                href="https://www.instagram.com/texasranchesforsale/?hl=en"
                target="_blank"
                sx={{
                  marginLeft: "10px",
                }}
              >
                <img
                  sx={{
                    width: "27px",
                  }}
                  src={data.instagram.publicURL}
                  alt=""
                />
              </a>
              <a
              href="https://www.youtube.com/channel/UC0kN5l4ZuqtXHdQcI4R2ssQ"
              target="_blank"
              sx={{
                marginLeft: "10px",
              }}
            >
              <img
                sx={{
                  width: "27px",
                }}
                src={data.youtube.publicURL}
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
            {data.menu._rawChildren.map((menuItem, index) => (
              <div
                key={index}
                className="menuitem"
                sx={{
                  width: ["100%", "calc(100% / 5)", "calc(100% / 5)"],
                  position: "relative",
                  marginTop: ["25px", "0px", "0px", "0px"],
                  "&:hover > div": {
                    display: "block",
                    visibility: "visible",
                    opacity: 1,
                  },
                  "&:nth-of-type(2)": {
                    borderRight: [
                      "0px",
                      "thin solid #A29A9A",
                      "thin solid #A29A9A",
                    ],
                    backgroundColor: ["transparent", "#ffffff", "#ffffff"],
                    minWidth: "165px",
                    "a > div": {
                      display: "none",
                    },
                  },
                  "&:nth-of-type(3)": {
                    display: ["block", "none", "none"],
                  },
                  a: {
                    color: ["#ffffff", "grayMed", "grayMed"],
                  },
                  '[aria-current="page"]': {
                    backgroundColor: [
                      "transparent",
                      "#D6D2D2",
                      "#D6D2D2",
                      "#D6D2D2",
                    ],
                  },
                }}
              >
                <AnchorLink
                  activeClassName="active"
                  sx={{
                    textDecoration: "none",
                    fontSize: ["1.6rem", "1.125rem", "1.125rem"],
                    width: "100%",
                    display: ["block", "flex", "flex"],
                    alignItems: ["flex-start", "center", "center", "center"],
                    justifyContent: [
                      "flex-start",
                      "center",
                      "center",
                      "center",
                    ],
                    textAlign: ["left", "center", "center"],
                    display: "flex",
                    padding: ["0px"],
                    boxSizing: "border-box",
                    height: ["auto", "100%", "100%", "100%"],
                    "&:hover": {
                      backgroundColor: [
                        "transparent",
                        "#D6D2D2",
                        "#D6D2D2",
                        "#D6D2D2",
                      ],
                    },
                    "&.active": {
                      backgroundColor: [
                        "transparent",
                        "#D6D2D2",
                        "#D6D2D2",
                        "#D6D2D2",
                      ],
                    },
                  }}
                  to={"/" + menuPath(menuItem.children.document.slug.current)}
                >
                  {menuItem.children.title}
                  {menuItem.children.submenu && (
                    <div
                      sx={{
                        width: "0",
                        height: "0",
                        borderLeft: "5px solid transparent",
                        borderRight: "5px solid transparent",
                        borderTop: "5px solid",
                        borderTopColor: "grayMed",
                        marginLeft: "10px",
                        display: ["none", "block", "block"],
                      }}
                    ></div>
                  )}
                </AnchorLink>
                {menuItem.children.submenu && (
                  <div
                    sx={{
                      visibility: ["visible", "hidden", "hidden"],
                      opacity: ["1", "1", "0"],
                      position: ["relative", "absolute", "absolute"],
                      transition: "all 0.5s ease",
                      left: 0,
                      marginTop: ["0px", "0px", "0px", "0px"],
                      display: ["block", "none", "none"],
                      minWidth: ["auto", "300px", "300px"],
                      backgroundColor: [
                        "transparent",
                        "grayLight",
                        "grayLight",
                      ],
                    }}
                  >
                    {menuItem.children.submenu.map((menuSubItem, index) => (
                      <Link
                        activeClassName="active"
                        sx={{
                          color: ["#ffffff", "grayMed", "grayMed"],
                          textDecoration: "none",
                          display: "block",
                          padding: [
                            "0px 0px",
                            "10px 10px",
                            "20px 25px",
                            "20px 25px",
                          ],
                          marginLeft: ["25px", "0px", "0px"],
                          marginTop: ["25px", "0px", "0px"],
                          backgroundColor: [
                            "transparent",
                            "grayLight",
                            "grayLight",
                          ],
                          textWrap: "wrap",
                          fontSize: ["1.125rem", "1.125rem", "1.125rem"],
                          "&:hover": {
                            backgroundColor: [
                              "transparent",
                              "#D6D2D2",
                              "#D6D2D2",
                              "#D6D2D2",
                            ],
                          },
                          "&.active": {
                            backgroundColor: [
                              "transparent",
                              "#D6D2D2",
                              "#D6D2D2",
                              "#D6D2D2",
                            ],
                          },
                        }}
                        to={"/" + menuSubItem.document.slug.current}
                        key={index}
                      >
                        {menuSubItem.document.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    />
  )
}

export default Menu
