/** @jsx jsx */
import { jsx } from "theme-ui"
import { connectRefinementList } from "react-instantsearch-dom"
import Select from "react-select"

const Consumer = ({ ref, items, refine }) => {

  const handleChange = (data) => {
    if (data[0]) {
      const selectedCounties = []
      data.forEach(element => {
        selectedCounties.push(element.value)
      })
      refine(selectedCounties)
    } else {
      refine([])
    }
  }

  const options = items.map(item => ({
    value: item.label,
    label: item.label + " (" + item.count + ")",
  }))

  return (
    <Select
      ref={ref}
      options={options}
      isSearchable={true}
      isMulti
      onChange={handleChange}
    />
  )
}

const CustomRefinementList = connectRefinementList(Consumer)

export default CustomRefinementList
