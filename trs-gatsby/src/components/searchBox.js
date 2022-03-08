/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import debounce from "lodash/debounce"
import { connectSearchBox } from "react-instantsearch-dom"

export default connectSearchBox(({ refine }) => {
  const debouncedSearch = debounce(e => refine(e.target.value), 1000)

  const onChange = e => {
    e.persist()
    debouncedSearch(e, e.eventTarget)
  }

  return (
    <input
      sx={{
        appearance: "none",
        borderRadius: "0px",
        border: "thin solid #887E7E",
        padding: "12px 5px 10px 10px !important",
        "&::placeholder": {
          color: "grayHvy",
          fontSize: "1rem",
          fontWeight: "600",
        },
      }}
      placeholder="Enter Text"
      type="search"
      onChange={onChange}
    />
  )
})
