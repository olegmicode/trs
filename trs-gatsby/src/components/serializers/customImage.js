/** @jsx jsx */
import { jsx } from "theme-ui"
import { GatsbyImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"

import sanityConfig from "../../sanityConfig"

const CustomImage = ({ node }) => {
  const imageData = getGatsbyImageData(
    node.desktopVersion.asset.id,
    { maxWidth: 1920 },
    sanityConfig
  )

  return (
    <GatsbyImage
      image={imageData}
    />
  )
}

export default CustomImage
