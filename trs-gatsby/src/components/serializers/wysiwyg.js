/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"
import * as React from "react"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../serializers/serializers"
import Container from "../container"
const Wysiwyg = ({ node }) => {
  return (
    <section id={node.sanityId}>
      <Container noMobilePadding={false}>
        {node.title && <h1>{node.title}</h1>}
        <div>
          <BlockContent blocks={node.body} serializers={Serializers} />
        </div>
      </Container>
    </section>
  )
}

export default Wysiwyg
