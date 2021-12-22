/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import Layout from "./layout"
import { Link, ModalRoutingContext } from "gatsby-plugin-modal-routing-3"
import SearchResults from "../components/searchResults"
import Modal from "react-modal"

const ConditionalLayout = ({ children, ...rest }) => {
  let subtitle
  const [modalIsOpen, setIsOpen] = React.useState(true)

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00"
  }

  function closeModal() {
    setIsOpen(false)
  }
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
            <Link to={closeTo}>Close</Link>
            {children}
          </div>
        ) : (
          <Layout>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
            >
              <button onClick={closeModal}>Close</button>
              {children}
            </Modal>
            <SearchResults />
          </Layout>
        )
      }
    </ModalRoutingContext.Consumer>
  )
}

export default ConditionalLayout
