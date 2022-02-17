/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"
import * as React from "react"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { convertToBgImage } from "gbimage-bridge"
import BackgroundImage from "gatsby-background-image"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../serializers/serializers"
import Container from "../container"
const TextOverImage = ({ node }) => {
  const sanityConfig = { projectId: "5b1rgyjn", dataset: "production" }
  const imageAssetId = node.backgroundImage.asset.id

  const imageData = getGatsbyImageData(
    imageAssetId,
    { maxWidth: 1920 },
    sanityConfig
  )
  const bgImage = convertToBgImage(imageData)
  return (
    <section id={node.sanityId}>
      <Container>
        <BackgroundImage
          Tag="div"
          // Spread bgImage into BackgroundImage:
          {...bgImage}
          preserveStackingContext
          sx={{
            padding: "100px 60px",
          }}
        >
          <BlockContent blocks={node.body} serializers={Serializers} />
        </BackgroundImage>
      </Container>
    </section>
  )
}

export default TextOverImage
