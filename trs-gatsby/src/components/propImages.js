/** @jsx jsx */
import { jsx } from "theme-ui"
import { useBreakpoint } from "gatsby-plugin-breakpoints"
import { GatsbyImage } from "gatsby-plugin-image"
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import { Slide } from "react-slideshow-image"
import "react-slideshow-image/dist/styles.css"
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  arrows: false,
  indicators: true,
  autoplay: false,
}

const ReturnImage = ({ image }) => {
  if (image.asset) {
    return (
      <GatsbyImage
        sx={{
          maxWidth: "100%",
          height: "100%",
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
          maxWidth: "fit-content",
          height: "auto",
        }}
        image={image.childImageSharp.gatsbyImageData}
        width={900}
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
        <Slide {...properties}>
          {newImages.map((image, index) => (
            <div
              sx={{
                cursor: "pointer",
                height: "100%",
              }}
              onClick={() => openModal(index)}
              key={index}
            >
              <ReturnMobileImage image={image} />
            </div>
          ))}
        </Slide>
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
                width: "100%",
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
