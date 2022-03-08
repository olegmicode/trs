/** @jsx jsx */
import { jsx } from "theme-ui"
import { useBreakpoint } from "gatsby-plugin-breakpoints"
import React from "react"
import { Fade } from "react-slideshow-image"
import { GatsbyImage } from "gatsby-plugin-image"
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import "react-slideshow-image/dist/styles.css"
import YouTube from "react-youtube"
const opts = {
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
}

const ReturnImage = ({ image }) => {
  if (image.asset) {
    return (
      <GatsbyImage
        sx={{
          maxWidth: "100%",
          height: "auto",
        }}
        image={image.asset.gatsbyImageData}
        width={800}
        aspectRatio={4 / 2}
      />
    )
  } else if (image.video) {
    return <LiteYouTubeEmbed id={image.video} />
  } else {
    return (
      <GatsbyImage
        sx={{
          maxWidth: "100%",
          height: "auto",
        }}
        image={image.childImageSharp.gatsbyImageData}
        width={600}
        aspectRatio={4 / 2}
      />
    )
  }
}

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  arrows: true,
  indicators: true,
  autoplay: false,
}
const FullSlide = ({ images, index, openModal }) => {
  const breakpoints = useBreakpoint()
  const ref = React.createRef()

  return (
    <div>
      {breakpoints.sm ? (
        <div>
          {images.map((image, index) => (
            <ReturnImage image={image} index={index}></ReturnImage>
          ))}
        </div>
      ) : (
        <Fade {...properties} ref={ref} defaultIndex={index}>
          {images.map((image, index) => (
            <ReturnImage image={image} index={index}></ReturnImage>
          ))}
        </Fade>
      )}
    </div>
  )
}

export default FullSlide
