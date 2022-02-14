/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../components/serializers/serializers"
import { GatsbyImage } from "gatsby-plugin-image"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"
import ConditionalLayout from "../components/ConditionalLayout"

const ReturnImage = ({ image }) => {
  if (image.asset) {
    return (
      <GatsbyImage
        sx={{
          maxWidth: "100%",
          height: "auto",
        }}
        image={image.asset.gatsbyImageData}
        width={600}
        aspectRatio={4 / 2}
      />
    )
  } else {
    return (
      <GatsbyImage
        sx={{
          maxWidth: "100%",
          height: "auto",
        }}
        image={image.childImageSharp.gatsbyImageData}
        width={600}
        aspectRatio={4 / 2}
      />
    )
  }
}
const ReturnCounty = ({ county }) => {
  if (county.countyName) {
    return county.countyName
  } else {
    return county
  }
}

function youtube_parser(url) {
  var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/
  var match = url.match(regExp)
  return match && match[1].length == 11 ? match[1] : false
}
if (this.props.property) {
  var node = this.props.property
  var images = node.childrenFile
  var county = node.county
  var feedDescription = node.propertyDescription
} else {
  var node = this.props.ourproperty
  var images = node.propertyImages
  var county = node.ourcounty
  var description = node._rawPropertyDescrition
  var contacts = node.propertyContacts
  if (node.youtubeUrl) {
    var videoId = youtube_parser(node.youtubeUrl)
  }
}

class Property extends React.Component {
  constructor(props) {
    super(props)
    // this.state = { value: '' };
    this.state = {
      menuOpen: false,
      updateOpen: null,
      overview: true,
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  // tabState(tab) {
  //   this.setState({
  //     tab: ,
  //   })
  //   this.setState(prevState => ({
  //     tab: !prevState.updateOpen,
  //   }))
  // }
  // const node = data.property
  // const images = node.childrenFile
  render() {
    return (
      <ConditionalLayout data={this.props}>
        <div
          sx={{
            display: "flex",
            flexWrap: "wrap",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <div
            sx={{
              width: "calc(60% - 10px)",
              backgroundColor: "white",
              overflow: "scroll",
              height: "100%",
            }}
          >
            {images.map((image, index) => (
              <ReturnImage image={image}></ReturnImage>
            ))}
          </div>

          <div
            sx={{
              width: "40%",
              backgroundColor: "white",
              overflow: "scroll",
              height: "100%",
              padding: "20px 30px",
              boxSizing: "border-box",
              color: "grayBlk",
            }}
          >
            <div
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "thin solid",
                borderColor: "grayMed",
                paddingBottom: "20px",
                marginBottom: "30px",
              }}
            >
              <div>
                <a
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1.125rem",
                    color: "grayMed",
                    textDecoration: "none",
                  }}
                  href="tel:830-249-9339"
                >
                  <GatsbyImage
                    sx={{
                      marginRight: "10px",
                      width: "27px",
                    }}
                    image={this.props.phone.childImageSharp.gatsbyImageData}
                  />
                  830-249-9339
                </a>
              </div>
              <div>
                <a
                  href="https://www.facebook.com/TexasRanchesForSale"
                  target="_blank"
                >
                  <GatsbyImage
                    sx={{
                      width: "27px",
                    }}
                    image={this.props.facebook.childImageSharp.gatsbyImageData}
                  />
                </a>
                <a
                  href="https://twitter.com/hashtag/TexasRanchesForSale"
                  target="_blank"
                  sx={{
                    marginLeft: "10px",
                  }}
                >
                  <GatsbyImage
                    sx={{
                      width: "27px",
                    }}
                    image={this.props.twitter.childImageSharp.gatsbyImageData}
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/texas-ranches-for-sale"
                  target="_blank"
                  sx={{
                    marginLeft: "10px",
                  }}
                >
                  <GatsbyImage
                    sx={{
                      width: "27px",
                    }}
                    image={this.props.linkedin.childImageSharp.gatsbyImageData}
                  />
                </a>
              </div>
            </div>
            <div
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "thin solid",
                borderColor: "grayMed",
                paddingBottom: "20px",
                marginBottom: "30px",
                alignItems: "center",
              }}
            >
              {node.price && (
                <div
                  sx={{
                    fontSize: "2.25rem",
                    color: "grayMed",
                    fontWeight: "700",
                  }}
                >
                  {node.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </div>
              )}
              {node.acreage && (
                <div
                  sx={{
                    fontSize: "1rem",
                    color: "grayMed",
                    fontWeight: "600",
                  }}
                >
                  {node.acreage
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " acres"}
                </div>
              )}
            </div>
            <div
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "thin solid",
                borderColor: "grayMed",
                paddingBottom: "20px",
                marginBottom: "30px",
                alignItems: "center",
              }}
            >
              {node.propertyName && (
                <div
                  sx={{
                    fontSize: "1.125rem",
                    color: "grayMed",
                    fontWeight: "600",
                  }}
                >
                  {node.propertyName}
                </div>
              )}
              {node.county && (
                <div
                  sx={{
                    fontSize: "1rem",
                    color: "grayMed",
                    fontWeight: "400",
                  }}
                >
                  {node.county + " County"}
                </div>
              )}
            </div>

            {description && (
              <div>
                <div
                  sx={{
                    fontSize: "1.125rem",
                    color: "grayMed",
                    fontWeight: "700",
                  }}
                >
                  OVERVIEW
                </div>
                <div>
                  {" "}
                  <BlockContent
                    blocks={description}
                    serializers={Serializers}
                  />
                </div>
              </div>
            )}
            {feedDescription && (
              <div>
                <div
                  sx={{
                    fontSize: "1.125rem",
                    color: "grayMed",
                    fontWeight: "700",
                    marginBottom: "10px",
                  }}
                >
                  OVERVIEW
                </div>
                <div>{feedDescription}</div>
              </div>
            )}
            <div>
              <strong>MLSID:</strong>
              {node.mlsid}
            </div>
            {node._rawPropertyLocation && (
              <div>
                <strong>Location:</strong>
                <BlockContent
                  blocks={node._rawPropertyLocation}
                  serializers={Serializers}
                />
              </div>
            )}
            {node._rawPropertyLand && (
              <div>
                <strong>Land:</strong>
                <BlockContent
                  blocks={node._rawPropertyLand}
                  serializers={Serializers}
                />
              </div>
            )}
            {node._rawPropertyImprovements && (
              <div>
                <strong>Improvements:</strong>
                <BlockContent
                  blocks={node._rawPropertyImprovements}
                  serializers={Serializers}
                />
              </div>
            )}
            {node._rawPropertyWater && (
              <div>
                <strong>Water:</strong>
                <BlockContent
                  blocks={node._rawPropertyWater}
                  serializers={Serializers}
                />
              </div>
            )}
            {node._rawPropertyWildlife && (
              <div>
                <strong>Wildlife:</strong>
                <BlockContent
                  blocks={node._rawPropertyWildlife}
                  serializers={Serializers}
                />
              </div>
            )}
            {node.region && (
              <div>
                <strong>Contacts:</strong>
                {contacts.map((contact, index) => (
                  <div>
                    <div>{contact.teamEmail}</div>
                    <div>{contact.teamFirstName}</div>
                    <div>{contact.teamLastName}</div>
                  </div>
                ))}
              </div>
            )}
            {node.contacts && (
              <div>
                <strong>Contacts:</strong>
                {contacts.map((contact, index) => (
                  <div>
                    <div>{contact.teamEmail}</div>
                    <div>{contact.teamFirstName}</div>
                    <div>{contact.teamLastName}</div>
                  </div>
                ))}
              </div>
            )}
            {node.propertyTopographicMap && (
              <div>
                <strong>Topographic Map:</strong>
                <div
                  key={`map`}
                  id="___map"
                  dangerouslySetInnerHTML={{
                    __html: node.propertyTopographicMap,
                  }}
                />
              </div>
            )}
            {videoId && (
              <div>
                <LiteYouTubeEmbed id={videoId} />
              </div>
            )}
            {node.propertyInteractiveLocationMap && (
              <div>
                <strong>Interactive Location Map:</strong>
                <div
                  key={`map`}
                  id="___map"
                  dangerouslySetInnerHTML={{
                    __html: node.propertyInteractiveLocationMap,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </ConditionalLayout>
    )
  }
}
export default Property

export const postQuery = graphql`
  query PropertyBySlug($mlsid: String!) {
    property: property(mlsid: { eq: $mlsid }) {
      ...propertyFullFragment
    }
    ourproperty: sanityProperty(mlsid: { eq: $mlsid }) {
      ...ourPropertyFullFragment
    }
    blockFragment: sanityPageDefinition(slug: { current: { eq: "home" } }) {
      ...blockFragment
    }
    facebook: file(name: { eq: "Facebook" }) {
      name
      childImageSharp {
        gatsbyImageData
      }
    }
    twitter: file(name: { eq: "Twitter" }) {
      name
      childImageSharp {
        gatsbyImageData
      }
    }
    linkedin: file(name: { eq: "LinkedIN" }) {
      name
      childImageSharp {
        gatsbyImageData
      }
    }
    phone: file(name: { eq: "Phone" }) {
      name
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`
