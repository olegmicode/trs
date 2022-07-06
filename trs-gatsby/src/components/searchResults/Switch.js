/** @jsx jsx */
import { jsx } from "theme-ui"
import { connectSortBy } from "react-instantsearch-dom"
import Select from "react-select"

const Switch = ({ ref, items, refine }) => {
  const handleChange = data => {
    if (data) {
      refine(data.value)
    } else {
      refine("additional_properties_price_desc")
    }
  }

  const options = items.map(item => ({
    value: item.value,
    label: item.label,
  }))

  return <Select ref={ref} options={options} onChange={handleChange} />
}
const CustomSort = connectSortBy(Switch)

export default CustomSort
