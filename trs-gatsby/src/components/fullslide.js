/** @jsx jsx */
import { jsx } from "theme-ui"
import { withBreakpoints } from "gatsby-plugin-breakpoints"
import React, { forwardRef } from "react"
import { Fade } from "react-slideshow-image"
import { GatsbyImage } from "gatsby-plugin-image"
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import _ from "lodash"
import "react-slideshow-image/dist/styles.css"

const ReturnImage = forwardRef(({ image, index }, ref) => {
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

class FullSlide extends React.Component {
  constructor(props) {
    super(props)
    this.toggleArrows = this.toggleArrows.bind(this)
  }
  componentDidMount() {
    this.divRef.current.focus()
  }
  toggleArrows(e) {
    if (e.key === "ArrowRight") {
      this.ref.current.goNext()
    }
    if (e.key === "ArrowLeft") {
      this.ref.current.goBack()
    }
  }

  render() {
    this.ref = React.createRef()
    this.divRef = React.createRef()
    this.videoRef = React.createRef()
    const { breakpoints } = this.props
    const properties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      arrows: true,
      indicators: true,
      autoplay: false,
      onChange: (previous, next) => {
        if (this.videoRef.current) {
          if (previous === 1) {
            console.log(this.videoRef.current.childNodes)
            this.videoRef.current.childNodes.forEach(element => {
              if (element.classList.contains("lyt-activated")) {
                // element.classList = ["yt-lite"]
                console.log(element)
                element.childNodes.forEach(elementInner => {
                  if (elementInner.tagName === "IFRAME") {
                    console.log(elementInner.src)
                    var src = elementInner.src.replace(
                      "autoplay=1",
                      "autoplay=0"
                    )
                    elementInner.src = src
                  }
                })
              }
            })
            // this.videoRef.current.childNodes[3].play()
          }
        }
      },
    }
    return (
      <div onKeyDown={this.toggleArrows} ref={this.divRef}>
        {breakpoints.sm ? (
          <div>
            {this.props.images.map((image, index) => (
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
          <Fade {...properties} ref={this.ref} defaultIndex={this.props.index}>
            {this.props.images.map((image, index) => (
              <ReturnImage
                image={image}
                index={index}
                ref={this.videoRef}
              ></ReturnImage>
            ))}
          </Fade>
        )}
      </div>
    )
  }
}

export default withBreakpoints(FullSlide)
