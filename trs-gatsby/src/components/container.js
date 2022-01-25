/** @jsx jsx */
import { jsx } from "theme-ui"

const Container = ({ children }) => {
  return (
    <div
      sx={{
        maxWidth: ["600px", "1000px", "1440px"],
        padding: ["0px 5%", "0px 5%", "0px 5%"],
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
