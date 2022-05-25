/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"

const TeamTeaser = ({ team }) => {
  const sanityConfig = { projectId: "5b1rgyjn", dataset: "production" }
  const imageAssetId = team.teamPhoto.asset.id
  const imageData = getGatsbyImageData(
    imageAssetId,
    { height: 1000, width: 700 },
    sanityConfig
  )
  // const teamImage = getImage(imageData)
  // console.log(teamImage)
  // console.log(imageData)
  return (
    <div
      sx={{
        boxSizing: "border-box",
        height: "100%",
        boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.25)",
        letterSpacing: "0px",
      }}
    >
      {team.teamPhoto && (
        <GatsbyImage
          sx={{
            maxWidth: "100%",
            height: "auto",
          }}
          image={imageData}
          width={200}
          height={300}
        />
      )}
      <h2
        sx={{
          textAlign: "center",
          marginTop: "30px",
          fontWeight: "bold",
          textTransform: "uppercase",
          fontSize: "1rem !important",
          fontFamily: "Open Sans, sans-serif !important",
        }}
      >
        {team.teamFirstName} {team.teamLastName}
      </h2>
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
            width: "100%",
            textAlign: "center",
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
