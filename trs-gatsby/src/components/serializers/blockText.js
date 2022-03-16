/** @jsx jsx */
import { jsx } from "theme-ui"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "./serializers"
import TeamTeaser from "../entity/team/teamTeaser"

const BlockText = ({ node }) => {
  return (
    <div>
      {node.body && (
        <BlockContent blocks={node.body} serializers={Serializers} />
      )}
      {node.reference && node.reference._type == "team" && (
        <TeamTeaser team={node.reference} />
      )}
    </div>
  )
}

export default BlockText
