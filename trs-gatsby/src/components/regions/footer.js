/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Container from "../container"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../serializers/serializers"
class Footer extends React.Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query FooterQuery {
            footer: sanityFooter {
              item {
                _rawBody(resolveReferences: { maxDepth: 10 })
              }
            }
          }
        `}
        render={data => (
          <footer
            sx={{
              backgroundColor: "#484242",
              color: "white",
              padding: "80px 0px 20px 0px",
              a: {
                color: "#3b80bf !important",
                textDecoration: "none !important",
              },
            }}
          >
            <Container>
              <div
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  img: {
                    width: "100%",
                    height: "auto",
                  },
                  "> div:nth-of-type(1)": {
                    width: ["100%", "100%", "35%"],
                    padding: [
                      "0px 0px 0px 0px",
                      "0px 0px 0px 0px",
                      "0px 50px 0px 0px",
                    ],
                    h3: {
                      fontSize: "2.25rem",
                      lineHeight: "2.25rem",
                      margin: "0px",
                      fontWeight: "normal",
                    },
                  },
                  "> div:nth-of-type(2)": {
                    width: ["100%", "100%", "40%"],
                    borderRight: ["0x", "0px", "thin solid #E9E7E7"],
                    borderLeft: ["0x", "0px", "thin solid #E9E7E7"],
                    padding: ["0px 0px", "0px 0px", "0px 50px"],
                    fontSize: "1rem,",
                  },
                  "> div:nth-of-type(3)": {
                    width: ["100%", "100%", "25%"],
                    padding: [
                      "0px 0px 0px 0px",
                      "0px 0px 0px 0px",
                      "0px 0px 0px 50px",
                    ],
                    p: {
                      display: "none",
                    },
                  },
                  "> div:nth-of-type(4)": {
                    width: "calc(100%)",
                    fontSize: "0.875rem",
                    textAlign: ["left", "left", "center"],
                    marginTop: ["60px", "60px", "100px"],
                  },
                }}
              >
                {data.footer.item.map((item, index) => (
                  <div
                    sx={{
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      "> div": {
                        img: {
                          width: "100%",
                          height: "auto",
                          maxWidth: "300px !important",
                        },
                      },
                    }}
                  >
                    <BlockContent
                      blocks={item._rawBody}
                      serializers={Serializers}
                    />
                  </div>
                ))}
              </div>
            </Container>
          </footer>
        )}
      />
    )
  }
}

export default Footer
