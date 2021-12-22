/** @jsx jsx */
import { jsx } from "theme-ui"
// import { Link } from "gatsby"
import { Link } from "gatsby-plugin-modal-routing-3"
import Img from "gatsby-image"
import { GatsbyImage } from "gatsby-plugin-image"
import Favorite from "../property/favorite"
import { render } from "react-dom"
// add property type value? If sanity property or drupal?

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
    <div>
      <Link
        state={{
          noScroll: true,
        }}
        asModal
        to={slugPath}
      >
        <div
          sx={{
            width: "100%",
          }}
        >
          {property.sanityimage && (
            <GatsbyImage
              sx={{
                maxWidth: "100%",
                height: "auto",
              }}
              image={property.sanityimage.asset.gatsbyImageData}
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
              image={property.image.childImageSharp.gatsbyImageData}
              width={600}
              aspectRatio={4 / 3}
            />
          )}
        </div>
        <div>
          <h2>{property.address}</h2>
          {property.strapline && <div>{property.strapline}</div>}
          {property.zip && (
            <div>
              <span>{property.city}</span>
              <span> {property.state}, </span>
              <span>{property.zip}</span>
            </div>
          )}
          {/**<Favorite
            sx={{
              display: "none",
            }}
            property={property}
          >
            Add to Favorites
          </Favorite>*/}
          <div>
            <strong>County:</strong>
            {property.sanitycounty && property.sanitycounty.countyName}
            {property.county && property.county}
          </div>
          <div>
            {property.price && (
              <span>
                <strong>Price:</strong>
                <span>
                  {property.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </span>
              </span>
            )}
            {property.pricePerAcre && (
              <span>
                <span> or </span>
                <span>
                  {property.pricePerAcre.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </span>
                <span> per acre </span>
              </span>
            )}
          </div>
          {property.acreage && (
            <div>
              <strong>Acres:</strong>
              {property.acreage
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "+/-"}
            </div>
          )}
          {property.description && (
            <div>
              <strong>Description:</strong>
              {property.description}
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}
export default PropertyTeaser
