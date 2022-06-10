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
    { height: 1300, width: 1000 },
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
        paddingBottom: "20px",
      }}
    >
      <Link
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        to={"/our-team/" + team.slug.current}
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
            padding: "0px 20px",
          }}
        >
          {team.teamFirstName} {team.teamLastName}
        </h2>
        <div
          sx={{
            textAlign: "center",
            textTransform: "uppercase",
            color: "newTan",
            padding: "0px 20px",
          }}
        >
          {team.teamPosition}
        </div>
      </Link>
    </div>
  )
}
export default TeamTeaser
