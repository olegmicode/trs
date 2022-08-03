/** @jsx jsx */
import { jsx } from "theme-ui"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { convertToBgImage } from "gbimage-bridge"
import BackgroundImage from "gatsby-background-image"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../serializers/serializers"
import Container from "../container"

import sanityConfig from "../../sanityConfig"

const TextOverImage = ({ node }) => {
  const imageData = getGatsbyImageData(
    node.backgroundImage.asset.id,
    { maxWidth: 1920 },
    sanityConfig
  )

  const bgImage = convertToBgImage(imageData)

  return (
    <section id={node.sanityId}>
      <Container noMobilePadding={true} fullWidth>
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
