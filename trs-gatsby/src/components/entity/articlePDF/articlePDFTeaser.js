/** @jsx jsx */
import { jsx } from "theme-ui"
import { GatsbyImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"

import sanityConfig from "../../../sanityConfig"

const ArticlePDFTeaser = ({ article }) => {
  const imageData = getGatsbyImageData(
    article.coverImage.asset.id,
    { height: 450, width: 800 },
    sanityConfig
  )

  return (
    <div>
      <a href={article.pdf ? article.pdf.asset.url : ""} target="_blank" rel="noopener noreferrer">
        {imageData && (
          <GatsbyImage
            sx={{
              maxWidth: "100%",
              height: "auto",
            }}
            image={imageData}
            width={700}
            height={400}
          />
        )}
      </a>
    </div>
  )
}
export default ArticlePDFTeaser
