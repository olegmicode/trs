/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"

const TeamTeaser = ({ team }) => {
  const sanityConfig = { projectId: "5b1rgyjn", dataset: "production" }
  const imageAssetId = team.teamPhoto.asset.id
  const imageData = getGatsbyImageData(
    imageAssetId,
    { maxWidth: 800 },
    sanityConfig
  )
  // const teamImage = getImage(imageData)
  // console.log(teamImage)
  // console.log(imageData)
  return (
    <div
      sx={{
        boxSizing: "border-box",
      }}
    >
      {team.teamPhoto && (
        <GatsbyImage
          sx={{
            maxWidth: "100%",
            height: "auto",
          }}
          image={imageData}
          width={800}
          aspectRatio={4 / 3}
        />
      )}
      <div
        sx={{
          textAlign: "center",
          marginTop: "30px",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        {team.teamFirstName} {team.teamLastName}
      </div>
      <div
        sx={{
          textAlign: "center",
          margin: "10px 0px 20px 0px",
          textTransform: "uppercase",
          color: "newTan",
        }}
      >
        {team.teamPosition}
      </div>

      <div
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link
          sx={{
            display: "inline-block",
            backgroundColor: "newTan",
            color: "white !important",
            padding: "10px 20px",
          }}
          to={"/our-team/" + team.slug.current}
        >
          MORE INFO
        </Link>
      </div>
    </div>
  )
}
export default TeamTeaser
