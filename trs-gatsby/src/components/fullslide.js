/** @jsx jsx */
import { jsx } from "theme-ui"
import { withBreakpoints } from "gatsby-plugin-breakpoints"
import { GatsbyImage } from "gatsby-plugin-image"
import _ from "lodash"
import { forwardRef, useEffect, useRef, useMemo } from "react"
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import { Fade } from "react-slideshow-image"

import "react-slideshow-image/dist/styles.css"

const ReturnImage = forwardRef(({ image }, ref) => {
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
    return (
      <div ref={ref}>
        <LiteYouTubeEmbed id={image.video}>
          {" "}
          {console.log(ref)}
        </LiteYouTubeEmbed>
      </div>
    )
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
})

const FullSlide = ({ ...props }) => {
  const ref = useRef()
  const divRef = useRef()
  const videoRef = useRef()

  useEffect(() => {
    if (divRef) {
      divRef.current?.focus()
    }
  }, [])

  const toggleArrows = e => {
    if (e.key === "ArrowRight") {
      ref.current.goNext()
    }
    if (e.key === "ArrowLeft") {
      ref.current.goBack()
    }
  }

  const { breakpoints } = props

  const properties = useMemo(() => {
    return {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      arrows: true,
      indicators: true,
      autoplay: false,
      onChange: (previous) => {
        if (videoRef.current) {
          if (previous === 1) {
            videoRef.current.childNodes.forEach(element => {
              if (element.classList.contains("lyt-activated")) {
                element.childNodes.forEach(elementInner => {
                  if (elementInner.tagName === "IFRAME") {
                    var src = elementInner.src.replace(
                      "autoplay=1",
                      "autoplay=0"
                    )
                    elementInner.src = src
                  }
                })
              }
            })
          }
        }
      },
    }
  }, [videoRef])

  return (
    <div onKeyDown={toggleArrows} ref={divRef}>
      {breakpoints.sm ? (
        <div>
          {props.images.map((image, index) => (
            <div
              key={_.uniqueId()}
              sx={{
                marginBottom: "10px",
              }}
            >
              <ReturnImage image={image} index={index}></ReturnImage>
            </div>
          ))}
        </div>
      ) : (
        <Fade {...properties} ref={ref} defaultIndex={props.index}>
          {props.images.map((image, index) => (
            <ReturnImage
              key={_.uniqueId()}
              image={image}
              index={index}
              ref={videoRef}
            ></ReturnImage>
          ))}
        </Fade>
      )}
    </div>
  )
}

export default withBreakpoints(FullSlide)
