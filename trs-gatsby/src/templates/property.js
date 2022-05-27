/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { graphql, Helmet } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../components/serializers/serializers"
import { GatsbyImage } from "gatsby-plugin-image"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"
import SEO from "../components/seo"
import ConditionalLayout from "../components/ConditionalLayout"
import { Link } from "gatsby"
import scrollTo from "gatsby-plugin-smoothscroll"
import FullSlide from "../components/fullslide"
import Modal from "react-modal"
import Header from "../components/regions/header"
import { useBreakpoint } from "gatsby-plugin-breakpoints"
import PropImages from "../components/propImages"
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion"

const ReturnCounty = ({ county }) => {
  console.log(county)
  // if (county.countyName) {
  //   return county.countyName
  // } else {
  //   return county
  // }
}

function truncate(str) {
  return str.length > 10 ? str.substring(0, 380) : str
}

function youtube_parser(url) {
  var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/
  var match = url.match(regExp)
  return match && match[1].length == 11 ? match[1] : false
}

class Property extends React.Component {
  constructor(props) {
    super(props)
    // this.state = { value: '' };
    this.state = {
      modalIsOpen: false,
      slideIndex: "1",
      videoId: null,
      images: null,
    }
    this.closeModal = this.closeModal.bind(this)
    this.openModal = this.openModal.bind(this)
  }
  closeModal() {
    this.setState(prevState => ({
      modalIsOpen: !prevState.modalIsOpen,
    }))
  }
  openModal(index, videoId) {
    this.setState(prevState => ({
      modalIsOpen: !prevState.modalIsOpen,
    }))
    this.setState({
      slideIndex: index,
    })
    this.setState({
      videoId: videoId,
    })
  }
  // componentDidMount() {
  //   var theImages = this.props.data.ourproperty.propertyImages
  //   const newVar = this.props.data.ourproperty.propertyImages.slice()
  //   newVar.splice(1, 0, "test")
  //   console.log(newVar)

  //   this.setState({
  //     images: newVar,
  //   })
  // }

  render() {
    console.log(this.props.data)

    if (this.props.data.property) {
      var node = this.props.data.property
      var images = node.childrenFile
      var county = node.county
      var feedDescription = node.propertyDescription
      var acreage = node.acreage
      var newImages = images.slice()
      var metaTitle = node.propertyName ? node.propertyName : node.mlsid
      var metaDescription = truncate(node.propertyDescription)
      var propPath = "https://www.texasranchesforsale.com" + this.props.path
      var office = this.props.data.property.field_office1
      var mlsid = this.props.data.property.mlsid
      if (this.props.data.property.field_listingidserbo) {
        var disclaimer =
          "©2019 San Antonio Board of Realtors. All rights reserved. Information Deemed Reliable but Not Guaranteed. Information on this site is provided exclusively for consumers personal, non-commercial use and may not be used for any purpose other than to identify prospective properties consumers may be interested in purchasing. Listing courtesy of " +
          office +
          "."
      }
      if (this.props.data.property.field_mst_mls_number) {
        var disclaimer =
          "©2019 Kerrville Board of Realtors® All rights reserved. The data relating to real estate for sale on this web site comes in part from the Kerrville Board of Realtors®. The broker providing this data believes it to be correct, but advises interested parties to confirm the data before relying on it in a purchase decision. Some properties which appear for sale on this web site may subsequently have sold and may no longer be available. Listing courtesy of " +
          office +
          "."
      }
      if (this.props.data.property.field_idx_mls_number) {
        var disclaimer =
          "The data relating to real estate for sale on this website comes in part from the Internet Data Exchange (IDX) of the Central Hill Country Board of REALTORS® Multiple Listing Service (CHCBRMLS). The CHCBR IDX logo indicates listings of other real estate firms that are identified in the detailed listing information. The information being provided is for consumers' personal, non-commercial use and may not be used for any purpose other than to identify prospective properties consumers may be interested in purchasing. Information herein is deemed reliable but not guaranteed, representations are approximate, individual verifications are recommended. Copyright 2019 Central Hill Country Board of REALTORS®. All rights reserved. Listing courtesy of " +
          office +
          "."
      }
    } else {
      var ourDisclaimer = this.props.data.disclaimer.nodes[0]._rawBlockcontent
      var node = this.props.data.ourproperty
      var images = node.propertyImages
      var ourImages = node.propertyImages
      var county = node.ourcounty
      var description = node._rawPropertyDescrition
      var contacts = node.propertyContacts
      var acreage = node.acreage
      var metaTitle = node.metaTitle ? node.metaTitle : node.propertyName
      var propPath = "https://www.texasranchesforsale.com" + this.props.path
      var status = node.status
      var mlsid = node.mlsid
      console.log(node)
      if (status === "z-sold") {
        var newImages = images.slice(0, 3)
      } else {
        var newImages = images.slice()
      }
      console.log(status)
      if (node.metaDescription) {
        var metaDescription = node.metaDescription
      } else {
        var metaDescription = truncate(node.propertySummary)
      }
      if (node.youtubeUrl && status !== "z-sold") {
        // var videoId = youtube_parser(node.youtubeUrl)
        var videoId = youtube_parser(node.youtubeUrl)
        // var newImages = images.slice()
        newImages.splice(1, 0, { video: videoId })
      }
    }

    return (
      <ConditionalLayout data={this.props.data}>
        <SEO
          title={metaTitle}
          description={metaDescription}
          path={propPath}
        ></SEO>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          className="slideshow-modal"
        >
          <div>
            <div
              onClick={this.closeModal}
              sx={{
                position: "absolute",
                right: "0px",
                top: "5px",
                zIndex: "9",
                height: "30px",
                width: "30px",
                cursor: "pointer",
                ":after": {
                  content: "' '",
                  height: "30px",
                  borderLeft: "3px solid #fff",
                  position: "absolute",
                  transform: "rotate(45deg)",
                  left: "10px",
                },
                ":before": {
                  content: "' '",
                  height: "30px",
                  borderLeft: "3px solid #fff",
                  position: "absolute",
                  transform: "rotate(-45deg)",
                  left: "10px",
                },
              }}
            ></div>

            <FullSlide images={newImages} index={this.state.slideIndex} />
          </div>
        </Modal>
        <div
          className="prop-container"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            height: ["auto", "100%", "100%"],

            justifyContent: "space-betweeen",
            flexDirection: ["column", "row", "row"],
          }}
        >
          <div
            className="prop-left"
            sx={{
              width: ["100%", "55%", "55%"],
              backgroundColor: "white",
              overflow: ["hidden", "scroll", "scroll"],
              height: ["auto", "100%", "100%"],
              paddingRight: ["0px", "10px", "10px"],
              boxSizing: "border-box",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignContent: "start",
              "> div": {
                width: "calc(50% - 2.5px)",
                marginBottom: "5px",
                "&:nth-of-type(1)": {
                  width: "100%",
                },
                ".yt-lite": {
                  height: "100%",
                  pointerEvents: "none",
                },
              },
            }}
          >
            <PropImages
              newImages={newImages}
              openModal={this.openModal}
            ></PropImages>
          </div>

          <div
            className="prop-right"
            sx={{
              width: ["100%", "45%", "45%"],
              overflow: "scroll",
              height: ["auto", "100%", "100%"],

              boxSizing: "border-box",
              color: "grayBlk",

              boxSizing: "border-box",
            }}
          >
            <div
              sx={{
                padding: ["20px 20px", "20px 20px", "20px 30px"],
                marginRight: ["0px", "10px", "10px"],
                backgroundColor: "white",
                borderLeft: "1px solid #E5E5E5",
                borderRight: "1px solid #E5E5E5",
              }}
            >
              <div
                className="prop-social"
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
                      image={
                        this.props.data.phone.childImageSharp.gatsbyImageData
                      }
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
                      image={
                        this.props.data.facebook.childImageSharp.gatsbyImageData
                      }
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
                      image={
                        this.props.data.twitter.childImageSharp.gatsbyImageData
                      }
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
                      image={
                        this.props.data.linkedin.childImageSharp.gatsbyImageData
                      }
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
                {node.status !== "z-sold" && node.price && (
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
                {acreage && (
                  <div
                    sx={{
                      fontSize: "1rem",
                      color: "grayMed",
                      fontWeight: "600",
                    }}
                  >
                    {acreage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                      " acres"}
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
                  alignItems: "center",
                }}
              >
                {node.propertyName && (
                  <h1
                    sx={{
                      fontSize: "1.125rem",
                      color: "grayMed",
                      fontWeight: "500",
                      margin: "0px",
                    }}
                  >
                    {node.propertyName}
                  </h1>
                )}
                {county && (
                  <div
                    sx={{
                      fontSize: "1rem",
                      color: "grayMed",
                      fontWeight: "400",
                    }}
                  >
                    {county + " County"}
                  </div>
                )}
              </div>
              <Accordion
                allowMultipleExpanded={true}
                allowZeroExpanded={true}
                preExpanded={["1"]}
                sx={{
                  ".accordion__button": {
                    backgroundImage: `url(${this.props.data.carrotLeft.publicURL})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPositionX: "calc(100% - 10px)",
                    backgroundPositionY: "center",
                    backgroundSize: "8px",
                    cursor: "pointer",
                  },
                  ".accordion__button[aria-expanded='true']": {
                    backgroundImage: `url(${this.props.data.carrotDown.publicURL})`,
                    backgroundSize: "15px",
                    backgroundPositionX: "calc(100% - 5px)",
                  },
                  ".accordion__item": {
                    borderBottom: "thin solid",
                    borderColor: "grayMed",
                    paddingBottom: "20px",
                    paddingTop: "20px",
                  },
                  ".accordion__heading": {
                    fontSize: "1.125rem",
                    color: "grayMed",
                    fontWeight: "700",
                  },
                  ".accordion__panel": {
                    marginTop: "10px",
                    lineHeight: "1.438rem",
                  },
                }}
              >
                {description && (
                  <AccordionItem uuid="1">
                    <AccordionItemHeading>
                      <AccordionItemButton>OVERVIEW</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <BlockContent
                        blocks={description}
                        serializers={Serializers}
                      />
                      <div
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        {contacts[0] && (
                          <div
                            sx={{
                              color: "white",
                              backgroundColor: "newTan",
                              textDecoration: "none",
                              padding: "15px 0px",
                              width: "200px",
                              textAlign: "center",
                              fontWeight: "600",
                              marginTop: "40px",
                              cursor: "pointer",
                            }}
                          >
                            <Link
                              sx={{
                                color: "white !important",
                                textDecoration: "none",
                              }}
                              to={
                                "/contact-us?team=" +
                                contacts[0].teamFirstName +
                                "&lname=" +
                                contacts[0].teamLastName +
                                "&address=" +
                                node.propertyName
                              }
                            >
                              Contact {contacts[0].teamFirstName}
                              {" " + contacts[0].teamLastName}
                            </Link>
                          </div>
                        )}
                      </div>
                    </AccordionItemPanel>
                  </AccordionItem>
                )}
                {feedDescription && (
                  <div>
                    <AccordionItem uuid="1">
                      <AccordionItemHeading>
                        <AccordionItemButton>OVERVIEW</AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <div>{feedDescription}</div>
                        <div
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <div
                            sx={{
                              color: "white",
                              backgroundColor: "newTan",
                              textDecoration: "none",
                              padding: "15px 0px",
                              width: "200px",
                              textAlign: "center",
                              fontWeight: "600",
                              marginTop: "40px",
                              cursor: "pointer",
                            }}
                          >
                            <Link
                              sx={{
                                color: "white !important",
                                textDecoration: "none",
                              }}
                              to={
                                "/contact-us?team=" +
                                contacts[0].teamFirstName +
                                "&lname=" +
                                contacts[0].teamLastName +
                                "&address=" +
                                node.propertyName
                              }
                            >
                              Contact Ken Hoerster
                            </Link>
                          </div>
                        </div>
                      </AccordionItemPanel>
                    </AccordionItem>
                  </div>
                )}

                {node._rawPropertyLocation && (
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>LOCATION</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <BlockContent
                        blocks={node._rawPropertyLocation}
                        serializers={Serializers}
                      />
                    </AccordionItemPanel>
                  </AccordionItem>
                )}

                {node._rawPropertyLand && (
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>LAND</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <BlockContent
                        blocks={node._rawPropertyLand}
                        serializers={Serializers}
                      />
                    </AccordionItemPanel>
                  </AccordionItem>
                )}

                {node._rawPropertyImprovements && (
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>IMPROVEMENTS</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <BlockContent
                        blocks={node._rawPropertyImprovements}
                        serializers={Serializers}
                      />
                    </AccordionItemPanel>
                  </AccordionItem>
                )}

                {node._rawPropertyWildlife && (
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>WILDLIFE</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <BlockContent
                        blocks={node._rawPropertyWildlife}
                        serializers={Serializers}
                      />
                    </AccordionItemPanel>
                  </AccordionItem>
                )}

                {node._rawPropertyWater && (
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>WATER</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <BlockContent
                        blocks={node._rawPropertyWater}
                        serializers={Serializers}
                      />
                    </AccordionItemPanel>
                  </AccordionItem>
                )}
                {node.status !== "z-sold" && node.propertyTopographicMap && (
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>MAP</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <div>
                        Click “View Full Screen” button on map to see the map
                        legend and additional features.
                      </div>
                      <div
                        key={`map`}
                        id="___map"
                        dangerouslySetInnerHTML={{
                          __html: node.propertyTopographicMap,
                        }}
                      />
                    </AccordionItemPanel>
                  </AccordionItem>
                )}
                {node.status !== "z-sold" &&
                  node.propertyInteractiveLocationMap && (
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton>MAP</AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <div
                          sx={{
                            marginBottom: "20px",
                          }}
                        >
                          Click “View Full Screen” button on map to see the map
                          legend and additional features.
                        </div>
                        <div
                          key={`map`}
                          id="___map"
                          dangerouslySetInnerHTML={{
                            __html: node.propertyInteractiveLocationMap,
                          }}
                        />
                      </AccordionItemPanel>
                    </AccordionItem>
                  )}
              </Accordion>
              <div
                id="contact"
                sx={{
                  padding: "20px 0px",
                }}
              >
                {ourDisclaimer && (
                  <BlockContent
                    blocks={ourDisclaimer}
                    serializers={Serializers}
                  />
                )}
                {disclaimer && disclaimer}
              </div>
            </div>
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
    ourproperty: sanityProperty(slug: { current: { eq: $mlsid } }) {
      ...ourPropertyFullFragment
    }
    blockFragment: sanityPageDefinition(slug: { current: { eq: "home" } }) {
      ...blockFragment
    }
    disclaimer: allSanityBlockcontent(
      filter: { blockId: { eq: "disclaimer" } }
    ) {
      nodes {
        blockId
        _rawBlockcontent(resolveReferences: { maxDepth: 10 })
      }
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
    carrotLeft: file(name: { eq: "carrotLeft" }) {
      publicURL
    }
    carrotDown: file(name: { eq: "carrotDown" }) {
      publicURL
    }
  }
`
