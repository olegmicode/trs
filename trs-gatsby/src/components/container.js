/** @jsx jsx */
import { jsx } from "theme-ui"

const Container = ({ children, noMobilePadding }) => {
  return (
    <div
      sx={{
        maxWidth: ["1000px", "1100px", "1200px", "1440px"],
        padding: [
          noMobilePadding ? "0px 0px" : "0px 5%",
          "0px 5%",
          "0px 5%",
          "0px 5%",
        ],
        margin: "0 auto",
        boxSizing: "content-box",
        a: {
          textDecoration: "none",
          color: "text",
        },
      }}
    >
      {children}
    </div>
  )
}

export default Container
