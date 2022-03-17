/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../components/serializers/serializers"
import Layout from "../components/layout"
import ContactForm from "../components/contactForm"
const Contact = ({ data }) => {
  return (
    <Layout>
      <ContactForm></ContactForm>
    </Layout>
  )
}
export default Contact

export const contactQuery = graphql`
  query ContactPageBySlug($slug: String!) {
    page: sanityPage(slug: { current: { eq: $slug } }) {
      slug {
        current
      }
      title
      _rawBody(resolveReferences: { maxDepth: 10 })
    }
  }
`
