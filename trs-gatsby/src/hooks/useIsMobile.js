import { useState, useEffect } from "react"

const getIsMobile = () => typeof window !== "undefined" && window.innerWidth <= 768

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(getIsMobile())

  useEffect(() => {
    const onResize = () => {
      setIsMobile(getIsMobile())
    }
    if (window) {
      window.addEventListener("resize", onResize)

      return () => {
        window.removeEventListener("resize", onResize)
      }
    }
  }, [])

  return isMobile
}
