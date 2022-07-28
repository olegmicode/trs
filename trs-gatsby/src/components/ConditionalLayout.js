/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import Layout from "../layout"
import { Link, ModalRoutingContext } from "gatsby-plugin-modal-routing-3"
import Header from "../layout/header"
import Container from "../components/container"

const ConditionalLayout = ({ ...props }) => {
  return (
    <ModalRoutingContext.Consumer>
      {({ modal, closeTo }) =>
        modal ? (
          <div
            sx={{
              zIndex: "1",
              position: "relative",
              background: "#f7f7f7",
              height: "100%",
              fontFamily: "Arimo,sans-serif",
              fontSize: "1rem",
              fontWeight: "400",
              lineHeight: "1.438rem",
              letterSpacing: "1px",
            }}
          >
            <div
              sx={{
                display: ["block", "none", "none", "none"],
              }}
            >
              <Header noMobilePadding={true}></Header>
            </div>
            <div
              sx={{
                width: ["100%", "100%", "100%"],
                position: ["absolute"],
                zIndex: "9",
              }}
            >
              <Link
                to={closeTo}
                state={{
                  noScroll: true,
                }}
                className="prop-modal-close"
                sx={{
                  position: ["relative", "absolute", "absolute"],
                  top: ["40px", "5px", "5px", "5px"],
                  right: ["-20px", "-40px", "-40px"],

                  zIndex: "9",
                  height: ["40px", "30px", "30px", "30px"],
                  width: ["120px", "30px", "30px", "30px"],
                  backgroundColor: [
                    "#887E7E",
                    "transparent",
                    "transparent",
                    "transparent",
                  ],
                  display: "flex",
                  left: ["0", "auto", "auto", "auto"],
                  alignItems: "center",
                  borderTopRightRadius: ["25px", "0px", "0px", "0px"],
                  borderBottomRightRadius: ["25px", "0px", "0px", "0px"],
                  textDecoration: "none",
                  boxShadow: [
                    "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    "none",
                    "none",
                    "none",
                  ],
                  ":after": {
                    display: ["none", "block", "block"],
                    content: "' '",
                    height: "30px",
                    borderLeft: "3px solid #fff",
                    position: "absolute",
                    transform: "rotate(45deg)",
                    left: "10px",
                  },
                  ":before": {
                    display: ["none", "block", "block"],
                    content: "' '",
                    height: "30px",
                    borderLeft: "3px solid #fff",
                    position: "absolute",
                    transform: "rotate(-45deg)",
                    left: "10px",
                  },
                }}
              >
                <svg
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                  sx={{
                    transform: "rotate(90deg)",
                    color: "white",
                    height: "30px",
                    display: ["block", "none", "none", "none"],
                  }}
                >
                  <path
                    stroke="none"
                    d="M29.41 8.59a2 2 0 00-2.83 0L16 19.17 5.41 8.59a2 2 0 00-2.83 2.83l12 12a2 2 0 002.82 0l12-12a2 2 0 00.01-2.83z"
                    sx={{
                      fill: "white",
                    }}
                  ></path>
                </svg>
                <span
                  sx={{
                    color: "white",
                    fontSize: "14px",
                    display: ["block", "none", "none", "none"],
                    position: "relative",
                    top: "1px",
                  }}
                >
                  Back to List
                </span>
              </Link>
            </div>
            {props.children}
          </div>
        ) : (
          <Layout banner={true} header={true}>
            <Container background={props.background} noMobilePadding={true}>
              <div
                sx={{
                  height:["auto","calc(100vh - 170px)","calc(100vh - 185px)"],
                  overFlow:"hidden",
                  ".prop-social": {
                    display: "none",
                  },
                  ".prop-left": {
                    width: [
                      "100%",
                      "60%",
                      "calc(100% - 500px)",
                      "calc(100% - 500px)",
                    ],
                  },
                  ".prop-right": {
                    // height: "auto",
                    width: ["100%", "40%", "500px", "500px"],
                    // overflow: ["visible","hidden","hidden","hidden"],
                    "> div": {
                      marginRight: "0px",
                      // height: "100%",
                      overflow: "visible",
                      boxSizing: "border-box",
                    },
                  },
                }}
              >
                {props.children}
              </div>
            </Container>
          </Layout>
        )
      }
    </ModalRoutingContext.Consumer>
  )
}

export default ConditionalLayout
