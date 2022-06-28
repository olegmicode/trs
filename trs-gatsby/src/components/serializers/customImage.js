/** @jsx jsx */
import { jsx } from "theme-ui"
import { GatsbyImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"

const CustomImage = ({ node }) => {
  const sanityConfig = { projectId: "5b1rgyjn", dataset: "production" }
  const imageAssetId = node.desktopVersion.asset.id

  const imageData = getGatsbyImageData(
    imageAssetId,
    { maxWidth: 1920 },
    sanityConfig
  )

  return (
    <GatsbyImage
      sx={{
        maxWidth: "100%",
        height: "auto",
      }}
      image={imageData}
      width={600}
      aspectRatio={4 / 2}
    />
  )
}

export default CustomImage
