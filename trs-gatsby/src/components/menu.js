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
          facebook: file(name: { eq: "Facebook-white" }) {
            name
            childImageSharp {
              gatsbyImageData
            }
          }
          twitter: file(name: { eq: "Twitter-white" }) {
            name
            childImageSharp {
              gatsbyImageData
            }
          }
          linkedin: file(name: { eq: "LinkedIN-white" }) {
            name
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      `}
      render={data => (
        <div
          sx={{
            display: "flex",
          }}
        >
          {console.log(data)}
          <div
            sx={{
              backgroundColor: "newTan",
              color: "#ffffff",
              display: ["none", "flex", "flex"],
              alignItems: "center",
              justifyContent: "center",
              width: ["20%", "14.9%", "10.7%"],
              fontFamily: "Oswald",
              fontSize: "1.125rem",
            }}
          >
            EST. 2001
          </div>
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
              borderTop: ["0px", "thin solid darkGray", "thin solid darkGray"],
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
                borderLeft: ["0px", "0px", "thin solid"],
                borderColor: "grayMed",
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
            {data.menu._rawChildren.map((menuItem, index) => (
              <div
                key={index}
                sx={{
                  width: ["100%", "calc(100% / 5)", "calc(100% / 5)"],
                  position: "relative",
                  padding: ["10px 0px", "10px 10px", "20px 10px"],

                  "&:hover > div": {
                    display: "block",
                    visibility: "visible",
                    opacity: 1,
                  },
                  "&:nth-of-type(2)": {
                    borderRight: [
                      "0px",
                      "thin solid darkGray",
                      "thin solid darkGray",
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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: ["left", "center", "center"],
                  }}
                  activeStyle={{ textDecoration: "underline" }}
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
                      paddingTop: ["0px", "0px", "0px"],
                      left: 0,
                      marginTop: ["0px", "20px", "20px"],
                      display: ["block", "none", "none"],
                      minWidth: ["auto", "300px", "300px"],
                    }}
                  >
                    {menuItem.children.submenu.map((menuSubItem, index) => (
                      <Link
                        sx={{
                          color: ["#ffffff", "grayMed", "grayMed"],
                          textDecoration: "none",
                          display: "block",
                          padding: ["0px 0px", "10px 10px", "10px 10px"],
                          marginLeft: ["10px", "0px", "0px"],
                          marginTop: ["5px", "0px", "0px"],
                          backgroundColor: [
                            "transparent",
                            "grayScant",
                            "grayScant",
                          ],
                          textWrap: "wrap",
                          fontSize: ["1.125rem", "1.125rem", "1.125rem"],
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
