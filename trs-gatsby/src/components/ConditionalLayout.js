/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import Layout from "./layout"
import { Link, ModalRoutingContext } from "gatsby-plugin-modal-routing-3"
import SearchResults from "../components/searchResults"
import Modal from "react-modal"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../components/serializers/serializers"
import { navigate } from "gatsby"
import Header from "../components/regions/header"

class ConditionalLayout extends React.Component {
  constructor(props) {
    super(props)
    // this.state = { value: '' };
    this.state = {
      modalIsOpen: true,
      setIsOpen: true,
    }
    this.closeModal = this.closeModal.bind(this)
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
  }

  closeModal() {
    this.setState(prevState => ({
      modalIsOpen: !prevState.modalIsOpen,
    }))
    var currentState = this.state
    // window.location.pathname = "/"
    navigate("/", {
      replace: true,
      state: {
        currentState,
      },
    })

    // this.props.history.push("/")
    // if (typeof window !== "undefined" && window) {
    //   window.location = window.location.origin
    // }
  }
  openModal() {
    this.setState(prevState => ({
      setIsOpen: !prevState.setIsOpen,
    }))
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00"
  }
  componentWillMount() {}

  render() {
    return (
      <ModalRoutingContext.Consumer>
        {({ modal, closeTo }) =>
          modal ? (
            <div
              sx={{
                zIndex: "1",
                position: "relative",
                background: "#f7f7f7",
                height: "100%",
                fontFamily: "Open Sans,sans-serif",
                fontSize: "1rem",
                fontWeight: "400",
                lineHeight: "1.438rem",
                letterSpacing: "1px",
              }}
            >
              <div
                sx={{
                  display: ["block", "block", "none"],
                }}
              >
                <Header noMobilePadding={true}></Header>
              </div>
              <div
                sx={{
                  background: [
                    "linear-gradient(rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)",
                    "linear-gradient(rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)",
                    "none",
                  ],
                  width: ["100%", "calc(55% - 10px)", "100%"],
                  height: "50px",
                  position: ["absolute"],
                  zIndex: "9",
                }}
              >
                <Link
                  to={closeTo}
                  state={{
                    noScroll: true,
                  }}
                  className="prop-modal-close"
                  sx={{
                    position: ["relative", "relative", "absolute"],

                    right: ["-20px", "-20px", "-40px"],
                    top: ["10px", "10px", "5px"],
                    zIndex: "9",
                    height: "30px",
                    width: "30px",
                    ":after": {
                      display: ["none", "none", "block"],
                      content: "' '",
                      height: "30px",
                      borderLeft: "3px solid #fff",
                      position: "absolute",
                      transform: "rotate(45deg)",
                      left: "10px",
                    },
                    ":before": {
                      display: ["none", "none", "block"],
                      content: "' '",
                      height: "30px",
                      borderLeft: "3px solid #fff",
                      position: "absolute",
                      transform: "rotate(-45deg)",
                      left: "10px",
                    },
                  }}
                >
                  <svg
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                    sx={{
                      transform: "rotate(90deg)",
                      color: "white",
                      height: "30px",
                      display: ["block", "block", "none"],
                    }}
                  >
                    <title>Chevron Left</title>
                    <path
                      stroke="none"
                      d="M29.41 8.59a2 2 0 00-2.83 0L16 19.17 5.41 8.59a2 2 0 00-2.83 2.83l12 12a2 2 0 002.82 0l12-12a2 2 0 00.01-2.83z"
                      sx={{
                        fill: "white",
                      }}
                    ></path>
                  </svg>
                </Link>
              </div>
              {this.props.children}
            </div>
          ) : (
            <Layout banner={false} header={true}>
              <BlockContent
                blocks={this.props.data.blockFragment._rawEntities[0]}
                serializers={Serializers}
              />
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
              >
                <div
                  sx={{
                    zIndex: "1",
                    position: "relative",
                    background: "#f7f7f7",
                    height: "100%",
                    fontFamily: "Open Sans,sans-serif",
                    fontSize: "1rem",
                    fontWeight: "400",
                    lineHeight: "1.438rem",
                    letterSpacing: "1px",
                  }}
                >
                  <div
                    onClick={this.closeModal}
                    className="prop-modal-close"
                    sx={{
                      position: "absolute",
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
                  {this.props.children}
                </div>
              </Modal>
              <SearchResults />
            </Layout>
          )
        }
      </ModalRoutingContext.Consumer>
    )
  }
}
// const ConditionalLayout = ({ children, ...rest }) => {
//   let subtitle
//   const [modalIsOpen, setIsOpen] = React.useState(true)

//   function openModal() {
//     setIsOpen(true)
//   }

//   function afterOpenModal() {
//     // references are now sync'd and can be accessed.
//     // subtitle.style.color = "#f00"
//   }

//   function closeModal() {
//     setIsOpen(false)
//     console.log(this)
//     // this.props.history.push("/")
//     // if (typeof window !== "undefined" && window) {
//     //   window.location = window.location.origin
//     // }
//   }
//   return (
//     <ModalRoutingContext.Consumer>
//       {({ modal, closeTo }) =>
//         modal ? (
//           <div
//             sx={{
//               zIndex: "1",
//               position: "relative",
//             }}
//           >
//             <Link to={closeTo}>Close</Link>
//             {children}
//           </div>
//         ) : (
//           <Layout>
//             <BlockContent
//               blocks={rest.data.blockFragment._rawEntities[0]}
//               serializers={Serializers}
//             />
//             <Modal
//               isOpen={modalIsOpen}
//               onAfterOpen={afterOpenModal}
//               onRequestClose={closeModal}
//               contentLabel="Example Modal"
//             >
//               <button onClick={closeModal}>Close</button>
//               {children}
//             </Modal>
//             <SearchResults />
//           </Layout>
//         )
//       }
//     </ModalRoutingContext.Consumer>
//   )
// }

export default ConditionalLayout
