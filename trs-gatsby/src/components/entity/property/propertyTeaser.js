/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby-plugin-modal-routing-3"
import { GatsbyImage } from "gatsby-plugin-image"
import { StaticQuery, graphql } from "gatsby"

import { NoImage } from "./noImage"

import { truncate } from "../../../utils/stringUtils"

const Ribbon = ({ color, label }) => (
  <div
    sx={{
      backgroundColor: color,
      color: "#ffffff",
      fontSize: "1rem",
      position: "absolute",
      right: "20px",
      top: "-15px",
      padding: "3px 12px",
      zIndex: "1",
    }}
  >
    {label}
  </div>
)

const PropertyTeaser = ({ property, asModal }) => {
  let slugPath = ""
  if (property.slug) {
    if (property.slug.current) {
      slugPath = "/property/" + property.slug.current
    } else {
      slugPath = "/property/" + property.slug
    }
  }

  return (
    <StaticQuery
      query={graphql`
        query TeaserQuery {
          mappin: file(name: { eq: "map-pin" }) {
            name
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      `}
      render={data => (
        <div
          sx={{
            height: "100%",
            boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.25)",
            letterSpacing: "0px",
          }}
        >
          <Link
            state={{
              noScroll: true,
            }}
            asModal={asModal}
            to={slugPath}
            onClick={() => {}}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              sx={{
                flexGrow: "1",
                display: "flex",
                flexDirection: "column",
                flex: ["1", "1", "1"],
                minHeight: "140px",
              }}
            >
              <h2
                sx={{
                  color: "grayHvy",
                  fontSize: "1.25rem !important",
                  lineHeight: "1.5rem !important",
                  margin: "30px 22px 10px 22px !important",
                  fontFamily: "Open Sans,sans-serif !important",
                  fontWeight: "normal !important",
                }}
              >
                {property.address}
              </h2>
              <div
                sx={{
                  display: "flex",
                  padding: "0px 22px 30px 22px",
                  color: "grayHvy",
                  justifyContent: "space-between",
                }}
              >
                <div
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <GatsbyImage
                    sx={{
                      width: "11px",
                      marginRight: "10px",
                    }}
                    alt=""
                    image={data.mappin.childImageSharp.gatsbyImageData}
                  />
                  {property.sanitycounty && property.sanitycounty.countyName}
                  {property.county && property.county}
                </div>
                {property.acreage && (
                  <div>
                    {property.acreage
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ""}
                    <span> acres</span>
                  </div>
                )}
              </div>
            </div>
            <div
              sx={{
                width: "100%",
                position: "relative",
              }}
            >
              {property.status === "just-sold" ? (
                <Ribbon color="#6D6465" label="JUST SOLD" />
              ) : property.status === "under-contract" ? (
                <Ribbon color="#887E7E" label="UNDER CONTRACT" />
              ) : property.status === "reduced" ? (
                <Ribbon color="#E9E7E7" label="REDUCED" />
              ) : property.status === "new" ? (
                <Ribbon color="#AA4044" label="NEW" />
              ) : property.status === "coming-soon" ? (
                <Ribbon color="#0070B2" label="COMING SOON" />
              ) : property.status === "for-sale" ? (
                <Ribbon color="#C1B098" label="FOR SALE" />
              ) : (
                <Ribbon color="#484242" label="SOLD" />
              )}
              <div
                sx={{
                  textAlign: "center",
                  img: {
                    maxWidth: "100%",
                    height: "auto",
                  },
                }}
              >
                {property.sanityimage && (
                  <GatsbyImage
                    layout="constrained"
                    alt=""
                    image={property.sanityimage[0].asset.gatsbyImageData}
                    aspectRatio={20 / 13}
                  />
                )}
                {property.image && (
                  <GatsbyImage
                    layout="constrained"
                    alt=""
                    image={property.image.childImageSharp.gatsbyImageData}
                    aspectRatio={20 / 13}
                  />
                )}
                {!property.sanityimage && !property.image && <NoImage />}
              </div>
            </div>
            <div
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                flexGrow: "1",
              }}
            >
              {property.description && (
                <div
                  sx={{
                    padding: "30px 22px 30px 22px",
                    color: "grayHvy",
                    fontSize: "1rem",
                  }}
                >
                  {truncate(property.description)}
                </div>
              )}

              <div
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "grayLight",
                  color: "grayMed",
                  padding: "12px 20px",
                  fontWeight: "700",
                }}
              >
                {property.price && (
                  <div>
                    {property.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </div>
                )}
                <div>VIEW DETAILS</div>
              </div>
            </div>
          </Link>
        </div>
      )}
    />
  )
}

export default PropertyTeaser
