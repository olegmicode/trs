/** @jsx jsx */
import { jsx } from "theme-ui"
import { GatsbyImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"

const ArticlePDFTeaser = ({ article }) => {
  const sanityConfig = { projectId: "5b1rgyjn", dataset: "production" }
  const imageAssetId = article.coverImage.asset.id
  const imageData = getGatsbyImageData(
    imageAssetId,
    { height: 450, width:800 },
    sanityConfig
  )  
  return (
    <div>
    <a href={article.pdf ? article.pdf.asset.url : ""}>
    { imageData && (
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
