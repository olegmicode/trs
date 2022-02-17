/** @jsx jsx */
import { jsx } from "theme-ui"
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

const ReturnImage = ({ image, videoId, index }) => {
  if (image.asset) {
    return (
      <GatsbyImage
        sx={{
          maxWidth: "100%",
          height: "auto",
        }}
        alt=""
        image={image.asset.gatsbyImageData}
        width={600}
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
        alt=""
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

class FullSlide extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.state = {
      showInfo: false,
    }
  }
  componentDidMount() {
    // if (this.props.index != 1) {
    //   this.ref.current.goTo(this.props.index - 1)
    // }
  }
  componentDidUpdate() {
    // this.ref.current.goTo(this.props.index - 1)
  }
  render() {
    {
      console.log(this)
    }
    return (
      <div>
        <Fade {...properties} ref={this.ref} defaultIndex={this.props.index}>
          {this.props.images.map((image, index) => (
            <ReturnImage image={image} index={index}></ReturnImage>
          ))}
        </Fade>
      </div>
    )
  }
}

export default FullSlide
