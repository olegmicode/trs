/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../components/serializers/serializers"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../layout"
const Team = ({ data }) => {
  const sidebar = data.sidebar
  console.log(data)
  return (
    <Layout>
      <div
        sx={{
          maxWidth: ["1000px", "1100px", "1200px"],
          margin: "0 auto",
          padding: ["40px 0%", "40px 5%", "80px 5%"],
          display: "flex",
          boxSizing: "content-box",
          justifyContent: "space-between",
          flexDirection: ["column-reverse", "row", "row"],
        }}
      >
        {sidebar && (
          <div
            sx={{
              width: ["100%", "280px", "280px"],
              position: ["relative", "sticky", "sticky"],
              top: "20px",
              height: "100%",
              paddingBottom: "20px",
              boxSizing: "border-box",
            }}
            id={sidebar.blockId}
          >
            <BlockContent
              blocks={sidebar._rawBlockcontent}
              serializers={Serializers}
            />
          </div>
        )}

        <div
          sx={{
            width: ["100%", "calc(100% - 350px)", "calc(100% - 350px)"],
            boxSizing: "border-box",
            padding: ["0px 5%", "0px 0px", "0px 0px"],
          }}
        >
          <div
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              flexDirection: ["column", "row", "row"],
              width: "100%",
              marginBottom: "40px",
              paddingBottom: "30px",
              borderBottom: "thin solid darkGray",
            }}
          >
            <div>
              <h1
                sx={{
                  margin: "0px 20px 10px 0px !important",
                  textTransform: "uppercase",
                  lineHeight: "2.3rem !important",
                }}
              >
                {data.team.teamFirstName} {data.team.teamLastName}
              </h1>
              <div
                sx={{
                  color: "newTan",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                {data.team.teamPosition}
              </div>
            </div>
            <div>
              <Link
                sx={{
                  display: "inline-block",
                  textTransform: "uppercase",
                  backgroundColor: "newTan",
                  color: "white",
                  textDecoration: "none",
                  padding: "10px 40px",
                }}
                to={
                  "/contact-us?team=" +
                  data.team.teamFirstName +
                  "&lname=" +
                  data.team.teamLastName
                }
              >
                EMAIL {data.team.teamFirstName}
              </Link>
            </div>
            {data.team.teamSubTitle && (
              <div
                sx={{
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                {data.team.teamSubTitle}
              </div>
            )}
          </div>
          {data.team.teamPhoto && (
            <div
              sx={{
                width: ["calc(100% + 12%)", "30%", "30%"],
                float: ["none", "left", "left"],
                marginRight: ["0px", "40px", "40px"],
                position: "relative",
                left: ["-6%", "0%", "0%"],
                right: ["-6%", "0%", "0%"],
                marginBottom: "20px",
              }}
            >
              <GatsbyImage
                sx={{
                  maxWidth: "100%",
                  height: "auto",
                }}
                image={data.team.teamPhoto.asset.gatsbyImageData}
              />
            </div>
          )}
          <div>
            <BlockContent
              blocks={data.team._rawTeamBio}
              serializers={Serializers}
            />
          </div>
          {data.team._rawTeamMemberAffiliations && (
            <div
              sx={{
                width: "100%",
                ul: {
                  padding: "0px 0px 0px 20px",
                  li: {
                    marginBottom: "10px",
                  },
                },
              }}
            >
              <BlockContent
                blocks={data.team._rawTeamMemberAffiliations}
                serializers={Serializers}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
export default Team

export const TeamQuery = graphql`
  query TeamBySlug($slug: String!) {
    team: sanityTeam(slug: { current: { eq: $slug } }) {
      slug {
        current
      }
      teamPosition
      teamFirstName
      teamLastName
      teamEmail
      teamSubTitle
      _rawTeamBio(resolveReferences: { maxDepth: 10 })
      _rawTeamMemberAffiliations(resolveReferences: { maxDepth: 10 })
      teamPhoto {
        asset {
          gatsbyImageData(
            width: 1600
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
            layout: CONSTRAINED
          )
        }
      }
    }
    sidebar: sanityBlockcontent(blockName: { eq: "Team Sidebar" }) {
      _rawBlockcontent(resolveReferences: { maxDepth: 10 })
      blockId
    }
    hero: sanityTextOverImage(sanityId: { eq: "team-hero" }) {
      sanityId
      backgroundImage {
        asset {
          id
        }
      }
      _rawBody(resolveReferences: { maxDepth: 10 })
      _type
    }
  }
`
