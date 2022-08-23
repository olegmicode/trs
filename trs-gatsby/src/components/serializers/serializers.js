import * as React from "react"
import TextOverImage from "./textOverImage"
import Wysiwyg from "./wysiwyg"
import ContactForm from "./contactForm"
import TheBlockContent from "./blockcontent"
import Columns from "./columns"
import Team from "../entity/team/teamTeaser"
import ArticlePDFTeaser from "../entity/articlePDF/articlePDFTeaser"
import BlockText from "./blockText"
import ImageCarousel from "./imageCarousel";
import { Link } from "gatsby"
import Subscribe from "../subscribe"
import CustomImage from "./customImage"

const Serializers = {
  container: ({ children }) => <React.Fragment>{children}</React.Fragment>,
  types: {
    textOverImage: TextOverImage,
    blockcontent: TheBlockContent,
    columns: Columns,
    team: Team,
    articlePDF: ArticlePDFTeaser,
    blockText: BlockText,
    customImage: CustomImage,
    imageCarousel: ImageCarousel,
    wysiwyg: Wysiwyg,
    contactForm: ContactForm,
    block: props => {
      switch (props.node.style) {
        case "subscribe-form":
          return <Subscribe />
        case "h1":
          return <h1 className="">{props.children}</h1>

        case "h2":
          return <h2 className="">{props.children}</h2>

        case "h3":
          return <h3 className="">{props.children}</h3>

        case "h4":
          return <h4 className="">{props.children}</h4>
        case "li":
          return <h4 className="">{props.children}</h4>

        case "blockquote":
          return <blockquote className="">{props.children}</blockquote>
        case "normal":
          return <p>{props.children}</p>
        default:
          return <p>{props.children}</p>
      }
    },
  },
  marks: {
    internalLink: ({ mark, children }) => {
      var href = ""
      if (mark.reference) {
        if (mark.reference._type === "team") {
          if (mark.reference.slug) {
            if (mark.reference.slug.current) {
              href = `/our-team/${mark.reference.slug.current}`
            }
          }
        } else {
          href = `/${mark.reference.slug.current}`
        }
      }

      return (
        <Link activeClassName="active" to={href} title="internal link">
          {children}
        </Link>
      )
    },
  },
}

export default Serializers
