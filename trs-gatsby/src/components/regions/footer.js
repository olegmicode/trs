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
      </Container>
    </footer>
  )
}

export default Footer
