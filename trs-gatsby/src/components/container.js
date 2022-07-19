/** @jsx jsx */
import { jsx } from "theme-ui"

const Container = ({ children, fullWidth = false, background = "transparent", noMobilePadding }) => {
  return fullWidth ? (
    <div
      sx={{
        background: background,
        width: '100%',
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
  ) : (
    <div sx={{
      background: background,
      width: '100%'
    }}>
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
    </div>
  )
}

export default Container
