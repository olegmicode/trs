import React from "react"
import debounce from "lodash/debounce"
import { connectSearchBox } from "react-instantsearch-dom"

export default connectSearchBox(({ refine }) => {
  const debouncedSearch = debounce(e => refine(e.target.value), 1000)

  const onChange = e => {
    e.persist()
    debouncedSearch(e, e.eventTarget)
  }

  return <input placeholder="Enter Text" type="search" onChange={onChange} />
})
