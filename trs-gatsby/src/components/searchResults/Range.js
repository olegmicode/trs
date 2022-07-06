/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState, useEffect } from "react"
import {
  connectRange,
} from "react-instantsearch-dom"
import Rheostat from "rheostat"

import "rheostat/initialize"
import "rheostat/css/rheostat.css"

const Range = ({ min, max, canRefine, currentRefinement, refine, attribute }) => {
  const [currentValues, setCurrentValues] = useState({})

  useEffect(() => {
    setCurrentValues({ min, max })
  }, [min, max])

  useEffect(() => {
    if (canRefine && (currentValues.min !== currentRefinement.min || currentValues.max !== currentRefinement.max)) {
      setCurrentValues({
        min: currentRefinement.min,
        max: currentRefinement.max
      })
    }
  }, [canRefine, currentRefinement])

  const onValuesUpdated = sliderState => {
    setCurrentValues({ min: sliderState.values[0], max: sliderState.values[1] })
  }

  const convertToInternationalCurrencySystem = (labelValue) => {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(1) + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(1) + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(labelValue)) >= 1.0e3
      ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(1) + "K"
      : Math.abs(Number(labelValue))
  }

  const returnAcres = (acres) => {
    // Nine Zeroes for Billions
    var acresThousands = acres.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    })
    return acresThousands + " acres"
  }

  const onChange = sliderState => {
    if (
      currentRefinement.min !== sliderState.values[0] ||
      currentRefinement.max !== sliderState.values[1]
    ) {
      refine({
        min: sliderState.values[0],
        max: sliderState.values[1],
      })
    }
  }

  return min !== max ? (
    <div>
      <Rheostat
        min={min}
        max={max}
        values={[currentRefinement.min, currentRefinement.max]}
        onChange={onChange}
        onValuesUpdated={onValuesUpdated}
      />
      <div className="rheostat-values">
        {attribute === "price" && (
          <div
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontStyle: "italic",
              marginTop: "10px",
              width: "calc(100% + 15px)",
              position: "relative",
              left: "-7px",
            }}
          >
            <div>
              {currentValues.min &&
                "$" +
                  convertToInternationalCurrencySystem(
                    currentValues.min
                  )}
            </div>
            <div>
              {currentValues.max &&
                "$" +
                  convertToInternationalCurrencySystem(
                    currentValues.max
                  )}
            </div>
          </div>
        )}
        {attribute === "acreage" && (
          <div
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontStyle: "italic",
              marginTop: "10px",
              width: "calc(100% + 15px)",
              position: "relative",
              left: "-7px",
            }}
          >
            <div>
              {currentValues.min && returnAcres(currentValues.min)}
            </div>
            <div>
              {currentValues.max && returnAcres(currentValues.max)}
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div
      sx={{
        pointerEvents: "none",
        opacity: "0.5",
      }}
    >
      <Rheostat
        min={min}
        max={max}
        values={[currentRefinement.min, currentRefinement.max]}
        onChange={onChange}
        onValuesUpdated={onValuesUpdated}
      />
      <div className="rheostat-values">
        {attribute === "price" && (
          <div
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontStyle: "italic",
              marginTop: "10px",
              width: "calc(100% + 15px)",
              position: "relative",
              left: "-7px",
            }}
          >
            <div>
              {currentValues.min &&
                "$" +
                  convertToInternationalCurrencySystem(
                    currentValues.min
                  )}
            </div>
            <div>
              {currentValues.max &&
                "$" +
                  convertToInternationalCurrencySystem(
                    currentValues.max
                  )}
            </div>
          </div>
        )}
        {attribute === "acreage" && (
          <div
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontStyle: "italic",
              marginTop: "10px",
              width: "calc(100% + 15px)",
              position: "relative",
              left: "-7px",
            }}
          >
            <div>
              {currentValues.min && returnAcres(currentValues.min)}
            </div>
            <div>
              {currentValues.max && returnAcres(currentValues.max)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const ConnectedRange = connectRange(Range)

export default ConnectedRange
