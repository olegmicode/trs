/** @jsx jsx */
import { jsx } from "theme-ui"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "./serializers"
import Container from "../container"

const Columns = ({ node }) => {
  console.log(node)
  return (
    <section
      id={node.sanityId}
      sx={{
        padding: "40px 0px",
      }}
    >
      <Container>
        {node.title && (
          <h2
            sx={{
              fontSize: "4rem",
              fontWeight: "400 !important",
              textAlign: "center",
            }}
          >
            {node.title}
          </h2>
        )}

        <div
          sx={{
            display: "flex",
            alignItems: "center",
            img: {
              width: "100%",
              height: "auto",
            },
            animation: node.item.find(e => e._type === "blockText") ? "none" : "left-moving 50s linear 0s infinite alternate;",
          }}
        >
          {node.item.find(e => e._type === "blockText") && node.item.map((item, index) => (
            <div
              sx={{
                padding: "0px 20px",
              }}
              key={index}
            >
              {item && <BlockContent blocks={item} serializers={Serializers} />}
            </div>
          ))}
          {!node.item.find(e => e._type === "blockText") && (<div sx={{ display: "flex", alignItems: "center" }}>
            {node.item.map((item, index) => (
              <div key={index} sx={{ minWidth: "16%" }}>
                {item && <BlockContent blocks={item} serializers={Serializers} />}
              </div>
            ))}
          </div>)}
        </div>
      </Container>
    </section>
  )
}

export default Columns
