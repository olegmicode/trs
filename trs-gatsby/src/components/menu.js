/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const Menu = open => {
  function menuPath(sanityPath) {
    if (sanityPath == "home") {
      return ""
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
                "rgba(170, 64, 66, 0.92);",
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
            {data.menu._rawChildren.map((menuItem, index) => (
              <div
                key={index}
                className="menuitem"
                sx={{
                  width: ["100%", "calc(100% / 5)", "calc(100% / 5)"],
                  position: "relative",
                  "&:hover": {},
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
                    minWidth: "150px",
                    "a > div": {
                      display: "none",
                    },
                  },
                  "&:nth-of-type(3)": {
                    display: ["block", "none", "none"],
                  },
                  a: {
                    color: ["#ffffff", "grayMed", "grayMed"],

                    // fontSize: "1.125rem",
                  },
                }}
              >
                <Link
                  sx={{
                    textDecoration: "none",
                    fontSize: ["1.6rem", "1.125rem", "1.125rem"],
                    width: "100%",
                    display: ["block", "flex", "flex"],
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: ["left", "center", "center"],
                    display: "flex",
                    padding: ["10px 0px", "17px 10px", "20px 10px"],
                    boxSizing: "border-box",
                    "&:hover": {
                      backgroundColor: [
                        "transparent",
                        "#D6D2D2",
                        "#D6D2D2",
                        "#D6D2D2",
                      ],
                    },
                  }}
                  activeStyle={{
                    textDecoration: "underline",
                    backgroundColor: [
                      "transparent",
                      "#D6D2D2",
                      "#D6D2D2",
                      "#D6D2D2",
                    ],
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
                </Link>
                {menuItem.children.submenu && (
                  <div
                    sx={{
                      visibility: ["visible", "hidden", "hidden"],
                      opacity: ["1", "1", "0"],
                      position: ["relative", "absolute", "absolute"],
                      transition: "all 0.5s ease",
                      left: 0,
                      marginTop: ["0px", "17px", "20px", "20px"],
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
                          marginLeft: ["10px", "0px", "0px"],
                          marginTop: ["5px", "0px", "0px"],
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
                        }}
                        activeStyle={{ textDecoration: "underline" }}
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
