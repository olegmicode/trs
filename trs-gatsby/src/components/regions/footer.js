/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"
import Container from "../container"

const Footer = () => {
  const [colorMode, setColorMode] = useColorMode()
  const nextColorMode = colorMode === "light" ? "dark" : "light"
  return (
    <footer>
      <Container>
        © {new Date().getFullYear()}, Built by
        {` `}
        <a href="https://digett.com">Digett</a>
        <button
          sx={{
            marginLeft: 20,
          }}
          onClick={e => {
            setColorMode(nextColorMode)
          }}
        >
          Change color mode
        </button>
      </Container>
    </footer>
  )
}

export default Footer
