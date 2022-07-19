/** @jsx jsx */
import { jsx } from "theme-ui"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "./serializers"
import Container from "../container"
import InfiniteLooper from "../InfiniteLooper"
import "./columns.css"

const Columns = ({ node }) => {
  const handleClick = url => {
    if (typeof window !== "undefined" && window) {
      window.open(url, "_blank").focus()
    }
  }

  return (
    <section
      id={node.sanityId}
      sx={{
        padding: "25px 0px",
      }}
    >
      <Container>
        {node.title && (
          <h2
            sx={{
              textTransform: "uppercase",
              fontWeight: "400 !important",
              textAlign: "center",
              margin: "25px 0",
            }}
          >
            {node.title}
          </h2>
        )}

        {node.item.find(e => e._type === "blockText") && (
          <div
            sx={{
              display: "flex",
              alignItems: "center",
              img: {
                width: "100%",
                height: "auto",
              },
            }}
          >
            {node.item.map((item, index) => (
              <div
                sx={{
                  padding: "0px 20px",
                }}
                key={index}
              >
                {item && (
                  <BlockContent blocks={item} serializers={Serializers} />
                )}
              </div>
            ))}
          </div>
        )}

        {!node.item.find(e => e._type === "blockText") && (
          <div
            sx={{
              overflow: "hidden",
              position: "relative",
              transition: "all 0.3s ease",
              display: "block",
            }}
          >
            <div
              className="logo-slider"
              sx={{
                display: "flex",
                margin: "25px 0",
              }}
            >
              <InfiniteLooper speed="30" direction="left">
                {node.item.map((item, index) => (
                  <div className="contentBlock contentBlock--one" key={index} onClick={() => handleClick(item.url)}>
                    {item && (
                      <BlockContent blocks={item} serializers={Serializers} />
                    )}
                  </div>
                ))}
              </InfiniteLooper>
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}

export default Columns
