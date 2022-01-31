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
    // window.location.pathname = "/"
    navigate("/", {
      replace: true,
      state: {
        disableScrollUpdate: true,
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
  render() {
    return (
      <ModalRoutingContext.Consumer>
        {({ modal, closeTo }) =>
          modal ? (
            <div
              sx={{
                zIndex: "1",
                position: "relative",
              }}
            >
              <Link
                to={closeTo}
                state={{
                  noScroll: true,
                }}
              >
                Close
              </Link>
              {this.props.children}
            </div>
          ) : (
            <Layout>
              <BlockContent
                blocks={this.props.data.blockFragment._rawEntities[0]}
                serializers={Serializers}
              />
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                contentLabel="Example Modal"
              >
                <button onClick={this.closeModal}>Close</button>
                {this.props.children}
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
