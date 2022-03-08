/** @jsx jsx */
import { jsx } from "theme-ui"
// import { Link } from "gatsby"
import { Link } from "gatsby-plugin-modal-routing-3"
import Img from "gatsby-image"
import { GatsbyImage } from "gatsby-plugin-image"
import Favorite from "../property/favorite"
import { render } from "react-dom"
import { StaticQuery, graphql } from "gatsby"

// add property type value? If sanity property or drupal?

function truncate(str) {
  return str.length > 10 ? str.substring(0, 160) + "..." : str
}

function propClick() {}

const PropertyTeaser = ({ property }) => {
  var slugPath = ""
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
          }}
        >
          <Link
            state={{
              noScroll: true,
            }}
            asModal
            to={slugPath}
            onClick={propClick}
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
                  lineHeight: "1.4rem !important",
                  margin: "24px 22px 10px 22px",
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
              {property.status === "for-sale" ? (
                <div
                  sx={{
                    backgroundColor: "newTan",
                    color: "#ffffff",
                    fontSize: "1rem",
                    position: "absolute",
                    right: "20px",
                    top: "-15px",
                    padding: "3px 12px",
                    zIndex: "1",
                  }}
                >
                  FOR SALE
                </div>
              ) : (
                <div
                  sx={{
                    backgroundColor: "newTan",
                    color: "#ffffff",
                    fontSize: "1rem",
                    position: "absolute",
                    right: "20px",
                    top: "-15px",
                    padding: "3px 12px",
                    zIndex: "1",
                  }}
                >
                  SOLD
                </div>
              )}
              <div
                sx={{
                  textAlign: "center",
                }}
              >
                {property.sanityimage && (
                  <GatsbyImage
                    sx={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                    alt=""
                    image={property.sanityimage[0].asset.gatsbyImageData}
                    width={600}
                    aspectRatio={4 / 2}
                  />
                )}
                {property.image && (
                  <GatsbyImage
                    sx={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                    alt=""
                    image={property.image.childImageSharp.gatsbyImageData}
                    width={600}
                    aspectRatio={4 / 3}
                  />
                )}
              </div>
            </div>
            {/**<Favorite
            sx={{
              display: "none",
            }}
            property={property}
          >
            Add to Favorites
          </Favorite>*/}
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
