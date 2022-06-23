import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>Sorry, Page Not Found</h1>
    <p>Please <Link to="/">visit our home page</Link>, or <Link to="/contact-us">reach out to us</Link> to chat.</p>
  </Layout>
)

export default NotFoundPage
