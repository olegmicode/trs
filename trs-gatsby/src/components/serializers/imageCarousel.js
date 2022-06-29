import React, { useEffect, useRef, useState }from "react"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { GatsbyImage } from "gatsby-plugin-image"

import Container from "../container"

const Image = ({ image }) => {
  const sanityConfig = { projectId: "5b1rgyjn", dataset: "production" }
  const imageAssetId = image.asset.id

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
};

const ImageCarousel = ({ node }) => {
  const currentIndexRef = useRef(-1);
  const [idx, setIndex] = useState(0)

  const displayRandomImage = () => {
    let index = Math.floor(Math.random() * (node.body ? node.body.length : 0));
    while (currentIndexRef.current === index) {
      index = Math.floor(Math.random() * (node.body ? node.body.length : 0));
    }
    if (currentIndexRef.current !== index) {
      currentIndexRef.current = index;
      setIndex(index);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => displayRandomImage(), 5000);

    return () => {
      clearInterval(timer);
    }
  }, []);

  if (!node.body && node.body.length < 1) {
    return <div />
  }

  return (
    <section id={node.sanityId}>
      <Container noMobilePadding={true}>
        <div className="carousel-image">
          <Image image={node.body[idx].desktopVersion} />
        </div>
      </Container>
    </section>
  )
}

export default ImageCarousel
