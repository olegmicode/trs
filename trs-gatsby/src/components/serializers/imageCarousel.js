import * as React from "react"
import { Carousel } from "react-responsive-carousel"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { convertToBgImage } from "gbimage-bridge"
import BackgroundImage from "gatsby-background-image"

import Container from "../container"

import "react-responsive-carousel/lib/styles/carousel.min.css"

const Image = ({ image }) => {
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

const shuffle = (array) => {
  let tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}

const ImageCarousel = ({ node }) => {
  const images = React.useMemo(() => {
    if (node.body) {
      return shuffle(node.body);
    }
    return [];
  }, [node])

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
          showStatus={false}
          interval={5000}
          animationHandler="fade"
          swipeable={false}
        >
          {images.map(el => (
            <div className="carousel-image">
              <Image image={el.desktopVersion} />
            </div>
          ))}
        </Carousel>
      </Container>
    </section>
  )
}

export default ImageCarousel
