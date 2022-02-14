/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"
import * as React from "react"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { convertToBgImage } from "gbimage-bridge"
import BackgroundImage from "gatsby-background-image"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "./serializers"
import Container from "../container"
const Columns = ({ node }) => {
  console.log(node)

  return (
    <section
      id={node.sanityId}
      sx={{
        padding: "40px 0px",
      }}
    >
      <Container>
        {node.title && (
          <h2
            sx={{
              fontSize: "4rem",
              fontWeight: "400 !important",
              textAlign: "center",
            }}
          >
            {node.title}
          </h2>
        )}

        <div
          sx={{
            display: "flex",
            alignItems: "center",
            img: {
              width: "100%",
              height: "auto",
            },
          }}
        >
          {node.item.map((item, index) => (
            <div
              sx={{
                padding: "0px 20px",
              }}
            >
              <BlockContent blocks={item.body} serializers={Serializers} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Columns
