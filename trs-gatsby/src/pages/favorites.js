/** @jsx jsx */
import { jsx } from "theme-ui"
import { uniqueId } from "lodash"
import { useState, useEffect } from "react"

import Layout from "../layout"
import PropertyTeaser from "../components/entity/property/propertyTeaser"

import "./404.scss"

const Favorites = () => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    if (typeof window !== "undefined" && window) {
      const favs = JSON.parse(localStorage.getItem("Favorites"))
      setFavorites(favs || [])
    }
  }, [])

  return (
    <Layout>
      <section className="error-page">
        {favorites.length > 0 &&
          favorites.map((fav, index) => (
            <PropertyTeaser key={uniqueId()} property={fav} />
          ))}
        {favorites.length < 1 && <h3>No favorites added yet.</h3>}
      </section>
    </Layout>
  )
}
export default Favorites
