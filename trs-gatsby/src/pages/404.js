import * as React from "react"
import { Link } from "gatsby"

import Layout from "../layout"
import Seo from "../components/seo"

import "./404.scss"

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <section className="error-page">
      <h1>4 0 4</h1>
      <h2>Sorry, Page Not Found</h2>
      <p>Please <Link to="/" title="Homepage">visit our home page</Link>, or <Link to="/contact-us" title="Contact Us">reach out to us</Link> to chat.</p>
    </section>
  </Layout>
)

export default NotFoundPage
