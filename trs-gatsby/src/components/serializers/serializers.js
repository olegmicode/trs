import * as React from "react"
import Image from "./image"
import TextOverImage from "./textOverImage"
import Wysiwyg from "./wysiwyg"
import TheBlockContent from "./blockcontent"
import Columns from "./columns"
import Team from "../entity/team/teamTeaser"
import BlockText from "./blockText"
import { Link } from "gatsby"
const Serializers = {
  container: ({ children }) => <React.Fragment>{children}</React.Fragment>,
  types: {
    textOverImage: TextOverImage,
    blockcontent: TheBlockContent,
    columns: Columns,
    team: Team,
    blockText: BlockText,
    wysiwyg: Wysiwyg,
  },

  marks: {
    internalLink: ({ mark, children }) => {
      var href = ""
      console.log(mark)
      if (mark.reference) {
        if (mark.reference._type == "team") {
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
        <Link activeClassName="active" to={href}>
          {children}
        </Link>
      )
    },
  },
}

export default Serializers
