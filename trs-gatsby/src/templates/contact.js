/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import Layout from "../layout"
import ContactForm from "../components/contactForm"
import Container from "../components/container"
import SEO from "../components/seo"

const Contact = ({ data }) => {
  return (
    <Layout>
      <SEO title="Contact Us" description="Contact us description"></SEO>
      <Container>
        <div
          sx={{
            display: "flex",
            boxSizing: "content-box",
            justifyContent: "space-between",
            flexDirection: ["column", "row", "row"],
          }}
        >
          <div
            sx={{
              width: ["100%", "100%", "280px"],
              position: ["relative", "sticky", "sticky"],
              top: "0px",
              height: "100%",
              paddingBottom: "20px",
              paddingTop: "40px",
              div: {
                marginBottom: "5px",
                fontSize: "1rem",
              },
            }}
          >
            <div>
              <strong>Texas Ranches For Sale</strong>
            </div>
            <div>609 FM 289Comfort, TX 78013</div>
            <div> 830-249-9339 Office 210-579-1900 Fax</div>
          </div>
          <div
            sx={{
              width: ["100%", "100%", "calc(100% - 320px)"],
              padding: "40px 5% 40px 5%",
              color: "grayBlk",
              backgroundColor: "#F7F7F7",
              boxSizing: "border-box",
            }}
          >
            <h1
              sx={{
                marginTop: "0px !important",
              }}
            >
              Contact Us
            </h1>

            <ContactForm></ContactForm>
          </div>
        </div>
      </Container>
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
