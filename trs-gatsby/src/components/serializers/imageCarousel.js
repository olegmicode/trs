import * as React from "react"
import { Carousel } from "react-responsive-carousel"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { convertToBgImage } from "gbimage-bridge"
import BackgroundImage from "gatsby-background-image"

import Container from "../container"
import useIsMobile from "../../hooks/useIsMobile";

import "react-responsive-carousel/lib/styles/carousel.min.css"

const DesktopImage = ({ image }) => {
  const sanityConfig = { projectId: "5b1rgyjn", dataset: "production" }
  const imageAssetId = image.asset.id

  const imageData = getGatsbyImageData(
    imageAssetId,
    { maxWidth: 1920 },
    sanityConfig
  )
  const bgImage = convertToBgImage(imageData)
  return (
    <BackgroundImage
      Tag="div"
      // Spread bgImage into BackgroundImage:
      {...bgImage}
      preserveStackingContext
      sx={{
        padding: "100px 60px",
      }}
    >
    </BackgroundImage>
  )
};

const MobileImage = ({ image }) => {
  const sanityConfig = { projectId: "5b1rgyjn", dataset: "production" }
  const imageAssetId = image.asset.id

  const imageData = getGatsbyImageData(
    imageAssetId,
    { maxWidth: 675 },
    sanityConfig
  )
  const bgImage = convertToBgImage(imageData)
  return (
    <BackgroundImage
      Tag="div"
      // Spread bgImage into BackgroundImage:
      {...bgImage}
      preserveStackingContext
      sx={{
        padding: "100px 60px",
      }}
    >
    </BackgroundImage>
  )
};

const ImageCarousel = ({ node }) => {
  const isMobile = useIsMobile();

  if (!node.body) {
    return <div />
  }

  return (
    <section id={node.sanityId}>
      <Container noMobilePadding={true}>
        <Carousel
          stopOnHover={false}
          dynamicHeight={false}
          autoPlay
          showThumbs={false}
          infiniteLoop
          showIndicators={false}
          showArrows={false}
        >
          {node.body.map(el => (
            <div>
              {isMobile ? <MobileImage image={el.mobileVersion} /> : <DesktopImage image={el.desktopVersion} />}
            </div>
          ))}
        </Carousel>
      </Container>
    </section>
  )
}

export default ImageCarousel
