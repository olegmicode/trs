/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"
import * as React from "react"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { convertToBgImage } from "gbimage-bridge"
import BackgroundImage from "gatsby-background-image"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../serializers/serializers"
import Container from "../container"

const TheBlockContent = ({ node }) => {
  return (
    <Container>
      <h3>test block content</h3>
    </Container>
  )
}

export default TheBlockContent
