/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState, useEffect } from "react"
import {
  connectRefinementList,
} from "react-instantsearch-dom"

const ConsumerRadio = ({ refine, ref, ...props }) => {
  const [selectedOptions, setSelectedOptions] = useState([
    "for-sale",
    "z-sold",
    "just-sold",
    "under-contract",
    "reduced",
    "new",
    "coming-soon",
  ])
  const [statusChecked, setStatusChecked] = useState("for-sale")

  useEffect(() => {
    refine(selectedOptions)
  }, [])

  const onValueChange = (event) => {
    let statusValue = []
    if (event.target.value === "for-sale") {
      statusValue = [
        "for-sale",
        "z-sold",
        "just-sold",
        "under-contract",
        "reduced",
        "new",
        "coming-soon",
      ]
    } else {
      statusValue = ["z-sold", "just-sold"]
    }
    setStatusChecked(event.target.value)
    setSelectedOptions(statusValue)
    refine(statusValue)
  }

  return (
    <div
      ref={ref}
      sx={{
        display: "flex",

        div: {
          width: "50%",
          padding: "8px",
          position: "relative",
          label: {
            color: "#ffffff",
          },
          input: {
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "0",
            left: "0",
            appearance: "none",
            padding: "0px",
            margin: "0px",
            cursor: "pointer",
            borderRadius: "0px !important",
            fontSize: "1rem",
            fontWeight: "600",
            ":checked": {
              backgroundColor: "newTan",
            },
          },
          span: {
            position: "relative",
            color: "white",
            display: "block",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            textAlign: "center",
            fontSize: "1rem",
            fontWeight: "600",
            "&.for-sale.z-sold": {
              color: "grayHvy",
            },
          },
        },
      }}
    >
      <div
        className={statusChecked === "for-sale" && "active-status"}
      >
        <input
          type="radio"
          value="for-sale"
          checked={statusChecked === "for-sale"}
          onChange={onValueChange}
        />
        <span className={"for-sale " + statusChecked}>
          For Sale
        </span>
      </div>
      <div
        className={statusChecked === "z-sold" && "active-status"}
      >
        <input
          type="radio"
          value="z-sold"
          checked={statusChecked === "z-sold"}
          onChange={onValueChange}
        />
        <span className={statusChecked + " z-sold"}>Sold</span>
      </div>
    </div>
  )
}

const CustomRefinementListRadio = connectRefinementList(ConsumerRadio)

export default CustomRefinementListRadio
