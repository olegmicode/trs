/** @jsx jsx */
import { jsx } from "theme-ui"
import { useBreakpoint } from "gatsby-plugin-breakpoints"
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"
import { GatsbyImage } from "gatsby-plugin-image"
import { Fade } from "react-slideshow-image"
import "react-slideshow-image/dist/styles.css"

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  arrows: true,
  indicators: true,
  autoplay: false,
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
        width={600}
        aspectRatio={4 / 2}
        alt=""
      />
    )
  } else if (image.video) {
    return <LiteYouTubeEmbed id={image.video} />
  } else if (image.childImageSharp) {
    return (
      <GatsbyImage
        sx={{
          maxWidth: "100%",
          height: "auto",
        }}
        image={image.childImageSharp.gatsbyImageData}
        width={600}
        aspectRatio={4 / 2}
        alt=""
      />
    )
  } else {
    return null
  }
}
const ReturnMobileImage = ({ image }) => {
  if (image.asset) {
    return (
      <GatsbyImage
        sx={{
          maxWidth: "100%",
          height: "auto",
        }}
        image={image.asset.gatsbyImageData}
        width={600}
        aspectRatio={4 / 2}
        alt=""
      />
    )
  } else if (image.videoId) {
    return <LiteYouTubeEmbed id={image.video} />
  } else if (image.childImageSharp) {
    return (
      <GatsbyImage
        sx={{
          maxWidth: "100%",
          height: "auto",
        }}
        image={image.childImageSharp.gatsbyImageData}
        width={600}
        aspectRatio={4 / 2}
        alt=""
      />
    )
  } else {
    return null
  }
}
const PropImages = ({ newImages, openModal }) => {
  const breakpoints = useBreakpoint()
  return (
    <div
      sx={{
        ".indicators": {
          margin: "0px",
          padding: "0px 20px",
        },
      }}
    >
      {breakpoints.sm ? (
        <Fade {...properties}>
          {newImages.map((image, index) => (
            <div
              sx={{
                cursor: "pointer",
              }}
              onClick={() => openModal(index)}
              key={index}
            >
              <ReturnMobileImage image={image} />
            </div>
          ))}
        </Fade>
      ) : (
        <div
          sx={{
            overflow: "scroll",
            height: ["auto", "100%", "100%"],
            boxSizing: "border-box",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignContent: "start",
            "> div": {
              width: "calc(50% - 2.5px)",
              marginBottom: "5px",
              "&:nth-child(1)": {
                width: "100%",
              },
              ".yt-lite": {
                height: "100%",
                pointerEvents: "none",
              },
            },
          }}
        >
          {newImages.map((image, index) => (
            <div
              sx={{
                cursor: "pointer",
              }}
              onClick={() => openModal(index)}
              key={index}
            >
              <ReturnImage image={image} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PropImages
