/** @jsx jsx */
import { jsx } from "theme-ui"
import "rheostat/initialize"
import "rheostat/css/rheostat.css"
import PropertyTeaser from "./entity/property/propertyTeaser"
import React, { Component, createRef } from "react"
import withURLSync from "../templates/URLSync"
import PropTypes from "prop-types"
import Rheostat from "rheostat"
import algoliasearch from "algoliasearch/lite"
import Select from "react-select"
import qs from "qs"
import Container from "../components/container"
import scrollTo from "gatsby-plugin-smoothscroll"
import TheSearchBox from "./searchBox"
import {
  InstantSearch,
  Configure,
  connectStats,
  connectRefinementList,
  connectSortBy,
  connectRange,
  connectCurrentRefinements,
  connectInfiniteHits,
} from "react-instantsearch-dom"

const CustomClearRefinements = connectCurrentRefinements(
  ({ refine, items, customClear }) => (
    <button
      onClick={() => {
        refine(items)
        customClear()
      }}
    >
      Clear All
    </button>
  )
)

const InfiniteHits = ({ hits, hasMore, refineNext }) => (
  <div>
    <ul className="ais-InfiniteHits-list">
      {hits.map(hit => (
        <li
          sx={{
            boxSizing: "border-box",
            zIndex: "1",
            position: "relative",
            backgroundColor: "white",
            marginBottom: "40px",
          }}
          key={hit.objectID}
        >
          <HitComponent hit={hit} />
        </li>
      ))}
    </ul>
    <button
      sx={{
        display: hasMore ? "block" : "none",
        backgroundColor: "#c1b098",
        border: "1px solid #887e7e",
        color: "#fff",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "600",
        margin: "0 auto",
        padding: "10px 20px",
      }}
      disabled={!hasMore}
      onClick={refineNext}
    >
      View More Properties
    </button>
  </div>
)

const CustomInfiniteHits = connectInfiniteHits(InfiniteHits)

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
)

const selectInputRef = createRef()
const sortInputRef = createRef()
const searchInputRef = createRef()
const statusRadioRef = createRef()

class SearchResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filtersOpen: false,
      searchState: this.props.searchState,
      searchChange: false,
    }
    this.toggleFilters = this.toggleFilters.bind(this)
  }
  toggleFilters() {
    this.setState(prevState => ({
      filtersOpen: !prevState.filtersOpen,
    }))
  }
  componentWillUpdate() {
    if (!this.state.searchChange) {
      if (this.props.searchState !== this.state.searchState) {
        this.setState({ searchChange: true })
      }
    }
  }

  componentDidUpdate() {
    if (typeof window !== "undefined" && window) {
      var searchState =
        window.location.pathname + "?" + qs.stringify(this.props.searchState)
      localStorage.setItem("searchState", searchState)
    }
  }

  customClear() {
    selectInputRef.current.select.clearValue()
    sortInputRef.current.select.clearValue()
    const sarchInput = searchInputRef.current.childNodes[0]
    sarchInput.value = ""
    statusRadioRef.current.childNodes[0].childNodes[0].click()
  }

  render() {
    const Stats = ({ nbHits }) => <h3>{nbHits} SEARCH RESULTS</h3>
    const CustomStats = connectStats(Stats)

    return (
      <InstantSearch
        searchClient={searchClient}
        indexName="additional_properties"
        searchState={this.props.searchState}
        createURL={this.props.createURL}
        onSearchStateChange={this.props.onSearchStateChange}
        stalledSearchDelay="200"
      >
        <Container>
          <div
            id="filters"
            sx={{
              width: "100%",
              display: "flex",
              padding: "60px 0px",
              zIndex: "10",
              position: "relative",
              flexWrap: "wrap",
              h3: {
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "grayHvy",
                textAlign: "center",
                margin: "0px 0px 15px 0px",
              },
              "> div": {
                width: ["100%", "calc(100% / 2)", "calc(100% / 4)"],
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                "> div": {
                  width: ["100%", "100%", "100%", "100%"],
                  boxSizing: "border-box",
                },
                "&:nth-of-type(1)": {
                  borderRight: ["0px", "thin solid", "thin solid"],
                  borderBottom: ["thin solid", "thin solid", "0px"],
                  paddingBottom: ["30px", "30px", "0px"],
                  marginBottom: ["30px", "0px", "0px"],
                  borderColor: "#887E7E",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  boxSizing: "border-box",
                  paddingRight: ["0px", "30px", "30px", "40px"],
                  ".handleContainer": {
                    left: "0px",
                  },
                  ".DefaultHandle_handle__horizontal": {
                    marginLeft: "-8px",
                  },
                },
                "&:nth-of-type(2)": {
                  borderRight: ["none", "none", "thin solid"],
                  borderBottom: ["thin solid", "thin solid", "0px"],
                  borderColor: "#887E7E",
                  paddingBottom: ["30px", "30px", "0px"],
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  boxSizing: "border-box",
                  paddingRight: ["0px", "0px", "30px", "40px"],
                  paddingLeft: ["0px", "30px", "30px", "40px"],
                },
                "&:nth-of-type(3)": {
                  borderRight: ["none", "thin solid", "thin solid"],
                  paddingTop: ["30px", "30px", "0px"],
                  marginBottom: ["30px", "0px", "0px"],
                  paddingBottom: ["30px", "30px", "0px"],
                  borderColor: "#887E7E",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  boxSizing: "border-box",
                  borderBottom: ["thin solid", "0px", "0px"],
                  paddingRight: ["0px", "30px", "30px", "40px"],
                  paddingLeft: ["0px", "0px", "30px", "40px"],
                },
                "&:nth-child(4)": {
                  paddingLeft: ["0px", "30px", "30px", "40px"],
                  boxSizing: "border-box",
                },
              },
            }}
          >
            <div sx={{}}>
              <div
                sx={{
                  marginBottom: "40px",
                  padding: ["0px 5px", "0px", "0px", "0px"],
                  button: {
                    borderRadius: "100%",
                    backgroundColor: "newTan",
                    width: "16px",
                    height: "16px",
                    padding: "0px",
                    "::before": {
                      display: "none !important",
                    },
                    "::after": {
                      display: "none !important",
                    },
                  },
                  ".DefaultProgressBar_progressBar": {
                    height: "1px",
                    backgroundColor: "newTan",
                    top: "1px",
                    display: "none",
                    border: "0px",
                  },
                  ".DefaultBackground": {
                    height: "1px",
                    backgroundColor: "newTan",
                    top: "1px",
                    border: "0px",
                  },
                  ".rheostat-values": {},
                }}
              >
                <h3>PRICE</h3>
                <ConnectedRange attribute="price" />
              </div>
              <div
                sx={{
                  padding: ["0px 5px", "0px", "0px", "0px"],

                  button: {
                    borderRadius: "100%",
                    backgroundColor: "newTan",
                    width: "16px",
                    height: "16px",
                    padding: "0px",
                    "::before": {
                      display: "none !important",
                    },
                    "::after": {
                      display: "none !important",
                    },
                  },
                  ".DefaultProgressBar_progressBar": {
                    height: "1px",
                    backgroundColor: "newTan",
                    top: "1px",
                    display: "none",
                    border: "0px",
                  },
                  ".DefaultBackground": {
                    height: "1px",
                    backgroundColor: "newTan",
                    top: "1px",
                    border: "0px",
                  },
                  ".rheostat-values": {},
                }}
              >
                <h3>ACREAGE</h3>
                <ConnectedRange attribute="acreage" />
              </div>
            </div>
            <div
              sx={{
                "> div > div > div": {
                  borderRadius: "0px !important",
                  border: "thin solid #887E7E !important",
                  boxShadow: "none !important",

                  "&:nth-of-type(2)": {
                    borderLeft: "0px !important",
                  },
                },
                ".css-1hb7zxy-IndicatorsContainer": {
                  backgroundColor: "newTan",
                  width: "40px !important",
                  path: {
                    color: "#ffffff",
                  },
                  ".css-tlfecz-indicatorContainer": {
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  ".css-1okebmr-indicatorSeparator": {
                    display: "none",
                  },
                },
              }}
            >
              <div
                sx={{
                  marginBottom: "40px",
                  ".css-1wa3eu0-placeholder": {
                    color: "grayHvy",
                    fontSize: "1rem",
                    fontWeight: "600",
                  },
                  ".css-1uccc91-singleValue": {
                    color: "grayHvy",
                    fontSize: "1rem",
                    fontWeight: "600",
                  },
                }}
              >
                <h3>COUNTY</h3>
                <CustomRefinementList attribute="county" operator="or" />
              </div>
              <div
                sx={{
                  "> div": {
                    border: "0px",
                  },
                }}
              >
                <h3>STATUS</h3>
                <CustomRefinementListRadio
                  attribute="status"
                  defaultRefinement="z-sold"
                />
              </div>
            </div>
            <div
              sx={{
                "> div > div > div ": {
                  borderRadius: "0px !important",
                  border: "thin solid #887E7E !important",
                  boxShadow: "none !important",
                },
                ".css-1hb7zxy-IndicatorsContainer": {
                  backgroundColor: "newTan",
                  width: "40px !important",
                  path: {
                    color: "#ffffff",
                  },
                  ".css-tlfecz-indicatorContainer": {
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  ".css-1okebmr-indicatorSeparator": {
                    display: "none",
                  },
                },
              }}
            >
              <div
                sx={{
                  marginBottom: "40px",
                  ".css-1wa3eu0-placeholder": {
                    color: "grayHvy",
                    fontSize: "1rem",
                    fontWeight: "600",
                  },
                  ".css-1uccc91-singleValue": {
                    color: "grayHvy",
                    fontSize: "1rem",
                    fontWeight: "600",
                  },
                }}
              >
                <h3>SORT BY</h3>

                <CustomSort
                  defaultRefinement="additional_properties_price_desc"
                  items={[
                    {
                      value: "additional_properties_price_desc",
                      label: "Price (Descending)",
                    },
                    {
                      value: "additional_properties_price_asc",
                      label: "Price (Ascending)",
                    },
                    {
                      value: "additional_properties_acreage_desc",
                      label: "Acreage (Descending)",
                    },
                    {
                      value: "additional_properties_acreage_asc",
                      label: "Acreage (Ascending)",
                    },
                    {
                      value: "additional_properties_date_desc",
                      label: "Newest to Oldest",
                    },
                    {
                      value: "additional_properties_date_asc",
                      label: "Oldest to Newest",
                    },
                  ]}
                />
              </div>
              <div
                sx={{
                  input: {
                    width: "100%",
                    padding: "10px 5px",
                  },
                }}
              >
                <h3>SEARCH FOR</h3>
                <div ref={searchInputRef}>
                  <TheSearchBox />
                </div>
              </div>
            </div>
            <div sx={{}}>
              <div
                sx={{
                  fontSize: "1rem",
                  color: "grayHvy",
                }}
              >
                View filter results below, or press “Clear All” to clear your
                selections and see all featured ranch properties.
              </div>
              <div
                sx={{
                  marginTop: "40px",
                  " > div": {
                    display: "flex",
                    justifyContent: "center",
                    button: {
                      backgroundColor: "newTan",
                      border: "thin solid #887E7E",
                      width: "100%",
                      color: "#ffffff",
                      padding: "15px",
                      cursor: "pointer",
                      fontSize: "1rem",
                      fontWeight: "600",
                    },
                  },
                }}
              >
                <div>
                  <CustomClearRefinements
                    clearsQuery
                    customClear={this.customClear.bind(this)}
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>

        <div
          id="search-results"
          sx={{
            backgroundColor: "grayHvy",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: [
              "15px 0px 0px 0px",
              "20px 0px 0px 0px",
              "30px 0px 0px 0px",
            ],
            h3: {
              margin: ["0px 0px 0px 0px", "0px 0px 0px 0px", "0px 0px 0px 0px"],
              fontSize: ["2rem", "3rem", "50px"],
              fontFamily: "heading",
              fontWeight: "400",
              lineHeight: "1.2",
            },
          }}
        >
          <Container>
            {this.state.searchChange ? (
              <CustomStats />
            ) : (
              <h3>FEATURED PROPERTIES</h3>
            )}
          </Container>
        </div>
        <div
          sx={{
            backgroundColor: "grayHvy",
            padding: [
              "15px 0px 15px 0px",
              "20px 0px 20px 0px",
              "30px 0px 30px 0px",
            ],
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            position: "sticky",
            top: "0",
            zIndex: "9",
          }}
        >
          <Container>
            <div
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                sx={{
                  width: ["50px", "120px", "150px"],
                  height: "1px",
                  backgroundColor: "#ffffff",
                }}
              ></div>
              <div
                sx={{
                  backgroundColor: "newTan",
                  color: "white",
                  padding: ["15px 25px", "15px 40px", "15px 60px"],
                  cursor: "pointer",
                  display: "inline-block",
                  margin: ["0px 15px", "0px 25px", "0px 35px"],
                }}
                onClick={() => scrollTo("#filters")}
              >
                Change Filter Criteria
              </div>
              <div
                sx={{
                  width: ["50px", "120px", "150px"],
                  height: "1px",
                  backgroundColor: "#ffffff",
                }}
              ></div>
            </div>
          </Container>
        </div>
        <div
          sx={{
            backgroundColor: "grayLight",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Container noMobilePadding={true}>
            <Configure hitsPerPage={9} />
            <CustomInfiniteHits />

            <div
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <div
                sx={{
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
                onClick={() => scrollTo("#filters")}
              >
                Back to top
              </div>
            </div>
          </Container>
        </div>
      </InstantSearch>
    )
  }
}

function HitComponent({ hit }) {
  return (
    <PropertyTeaser property={hit} className="hit" asModal={true}>
      {hit.price}
    </PropertyTeaser>
  )
}
class Switch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: [],
    }
    this.changed = this.changed.bind(this)
  }

  changed(data) {
    if (data) {
      this.setState({ selected: data.value }, () => {
        this.props.refine(this.state.selected)
      })
    } else {
      this.setState({ selected: "additional_properties_price_desc" }, () => {
        this.props.refine(this.state.selected)
      })
    }
  }
  render() {
    const options = this.props.items.map(item => ({
      value: item.value,
      label: item.label,
    }))
    return (
      <Select ref={sortInputRef} options={options} onChange={this.changed} />
    )
  }
}

class Consumer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: [],
    }
    this.changed = this.changed.bind(this)
  }

  changed(data) {
    if (data[0]) {
      var selectedCounties = []
      data.forEach(element => {
        selectedCounties.push(element.value)
        this.setState({ selected: selectedCounties })
        this.props.refine(selectedCounties)
      })
    } else {
      this.setState({ selected: [] }, () => {
        this.props.refine(this.state.selected)
      })
    }
  }
  render() {
    const options = this.props.items.map(item => ({
      value: item.label,
      label: item.label + " (" + item.count + ")",
    }))
    return (
      <Select
        ref={selectInputRef}
        options={options}
        isSearchable={true}
        isMulti
        onChange={this.changed}
      />
    )
  }
}
class ConsumerRadio extends React.Component {
  constructor(props) {
    super(props)
    // this.state = { value: '' };
    this.state = {
      selectedOption: [
        "for-sale",
        "z-sold",
        "just-sold",
        "under-contract",
        "reduced",
        "new",
        "coming-soon",
      ],
      statusChecked: "for-sale",
    }
    this.onValueChange = this.onValueChange.bind(this)
  }

  componentWillMount() {
    this.props.refine(this.state.selectedOption)
  }

  onValueChange(event) {
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
    this.setState({ statusChecked: event.target.value }, () => {})
    this.setState({ selectedOption: statusValue }, () => {
      this.props.refine(this.state.selectedOption)
    })
  }
  render() {
    return (
      <div
        ref={statusRadioRef}
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
          className={this.state.statusChecked === "for-sale" && "active-status"}
        >
          <input
            type="radio"
            value="for-sale"
            checked={this.state.statusChecked === "for-sale"}
            onChange={this.onValueChange}
          />
          <span className={"for-sale " + this.state.statusChecked}>
            For Sale
          </span>
        </div>
        <div
          className={this.state.statusChecked === "z-sold" && "active-status"}
        >
          <input
            type="radio"
            value="z-sold"
            checked={this.state.statusChecked === "z-sold"}
            onChange={this.onValueChange}
          />
          <span className={this.state.statusChecked + " z-sold"}>Sold</span>
        </div>
      </div>
    )
  }
}

const CustomRefinementList = connectRefinementList(Consumer)
const CustomRefinementListRadio = connectRefinementList(ConsumerRadio)
const CustomSort = connectSortBy(Switch)

class Range extends Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    currentRefinement: PropTypes.object,
    refine: PropTypes.func.isRequired,
    canRefine: PropTypes.bool.isRequired,
  }

  state = { currentValues: { min: this.props.min, max: this.props.max } }

  componentDidUpdate(prevProps) {
    if (
      this.props.canRefine &&
      (prevProps.currentRefinement.min !== this.props.currentRefinement.min ||
        prevProps.currentRefinement.max !== this.props.currentRefinement.max)
    ) {
      this.setState({
        currentValues: {
          min: this.props.currentRefinement.min,
          max: this.props.currentRefinement.max,
        },
      })
    }
  }

  onValuesUpdated = sliderState => {
    this.setState({
      currentValues: { min: sliderState.values[0], max: sliderState.values[1] },
    })
  }

  convertToInternationalCurrencySystem(labelValue) {
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

  returnAcres(acres) {
    // Nine Zeroes for Billions
    var acresThousands = acres.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    })
    return acresThousands + " acres"
  }

  onChange = sliderState => {
    if (
      this.props.currentRefinement.min !== sliderState.values[0] ||
      this.props.currentRefinement.max !== sliderState.values[1]
    ) {
      this.props.refine({
        min: sliderState.values[0],
        max: sliderState.values[1],
      })
    }
  }

  render() {
    const { min, max, currentRefinement } = this.props
    const { currentValues } = this.state

    return min !== max ? (
      <div>
        <Rheostat
          min={min}
          max={max}
          values={[currentRefinement.min, currentRefinement.max]}
          onChange={this.onChange}
          onValuesUpdated={this.onValuesUpdated}
        />
        <div className="rheostat-values">
          {this.props.attribute === "price" && (
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
                    this.convertToInternationalCurrencySystem(
                      currentValues.min
                    )}
              </div>
              <div>
                {currentValues.max &&
                  "$" +
                    this.convertToInternationalCurrencySystem(
                      currentValues.max
                    )}
              </div>
            </div>
          )}
          {this.props.attribute === "acreage" && (
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
                {currentValues.min && this.returnAcres(currentValues.min)}
              </div>
              <div>
                {currentValues.max && this.returnAcres(currentValues.max)}
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
          onChange={this.onChange}
          onValuesUpdated={this.onValuesUpdated}
        />
        <div className="rheostat-values">
          {this.props.attribute === "price" && (
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
                    this.convertToInternationalCurrencySystem(
                      currentValues.min
                    )}
              </div>
              <div>
                {currentValues.max &&
                  "$" +
                    this.convertToInternationalCurrencySystem(
                      currentValues.max
                    )}
              </div>
            </div>
          )}
          {this.props.attribute === "acreage" && (
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
                {currentValues.min && this.returnAcres(currentValues.min)}
              </div>
              <div>
                {currentValues.max && this.returnAcres(currentValues.max)}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const ConnectedRange = connectRange(Range)

export default withURLSync(SearchResults)
