/** @jsx jsx */
import { jsx } from "theme-ui"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../serializers/serializers"

const TheBlockContent = ({ node }) => {
  console.log(node)
  return (
    <div id={node.blockId ? node.blockId : ""}>
      {node.entities &&
        node.entities.map((item, index) => (
          <BlockContent key={index} blocks={item} serializers={Serializers} />
        ))}
      {node.blockcontent &&
        node.blockcontent.map((item, index) => (
          <BlockContent key={index} blocks={item} serializers={Serializers} />
        ))}
    </div>
  )
}

export default TheBlockContent
