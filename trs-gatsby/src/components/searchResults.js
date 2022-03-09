/** @jsx jsx */
import { jsx } from "theme-ui"
import "rheostat/initialize"
import "rheostat/css/rheostat.css"
import Layout from "./layout"
import PropertyTeaser from "./entity/property/propertyTeaser"
import React, { Component, useRef, createRef } from "react"
import withURLSync from "../templates/URLSync"
import PropTypes from "prop-types"
import Rheostat from "rheostat"
import algoliasearch from "algoliasearch/lite"
import MultiSelect from "@khanacademy/react-multi-select"
import Select from "react-select"
import makeAnimated from "react-select/animated"
import qs from "qs"
import Container from "../components/container"
import scrollTo from "gatsby-plugin-smoothscroll"
import debounce from "lodash/debounce"
import TheSearchBox from "./searchBox"
import {
  InstantSearch,
  SearchBox,
  Pagination,
  Highlight,
  Configure,
  ClearRefinements,
  connectHits,
  connectNumericMenu,
  connectStats,
  connectRefinementList,
  connectSortBy,
  connectRange,
  connectCurrentRefinements,
  connectSearchBox,
  MenuSelect,
  RefinementList,
  SortBy,
  Stats,
  HitsPerPage,
  InfiniteHits,
} from "react-instantsearch-dom"

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
)

const selectInputRef = createRef()

class SearchResults extends React.Component {
  constructor(props) {
    super(props)
    // this.state = { value: '' };
    this.state = {
      filtersOpen: false,
      searchState: this.props.searchState,
      searchChange: false,
    }
    this.toggleFilters = this.toggleFilters.bind(this)
    // this.customClear = this.customClear.bind(this)
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
    // if (typeof window !== "undefined" && window) {
    //   var searchState = JSON.parse(localStorage.getItem("searchState"))
    //   if(searchState !== this.props.location.search){
    //     localStorage.setItem("searchState", this.props.location.search)
    //   }
    //   if(searchState = this.props)
    //   // this.props.searchState
    //   // this.setState({ fav: true })
    // }

    if (typeof window !== "undefined" && window) {
      var searchState =
        window.location.pathname + "?" + qs.stringify(this.props.searchState)
      localStorage.setItem("searchState", searchState)
    }
  }

  customClear() {
    selectInputRef.current.select.clearValue()
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
                  width: "calc(100% - 60px)",
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
                },
                // "&:nth-child(4)": {
                //   paddingTop: ["30px", "30px", "0px"],
                // },
              },
            }}
          >
            <div sx={{}}>
              <div
                sx={{
                  marginBottom: "40px",

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
                  ".rheostat-values": {
                    display: "none",
                  },
                }}
              >
                <h3>PRICE</h3>
                <ConnectedRange attribute="price" />
              </div>
              <div
                sx={{
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
                  ".rheostat-values": {
                    display: "none",
                  },
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
                <CustomRefinementList attribute="county" />
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
                  defaultRefinement="for-sale"
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
                <TheSearchBox />
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
                  ".ais-ClearRefinements": {
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
                <div onClick={this.customClear.bind(this)}>
                  <ClearRefinements
                    transformItems={items =>
                      items.filter(item => item.attribute !== "status")
                    }
                    translations={{
                      reset: "Clear All",
                    }}
                  />
                </div>
              </div>
            </div>
            {/*<SearchBox
            searchAsYouType={false}
            translations={{
              placeholder: "Search by word or phrase",
            }}
          />
          */}
          </div>
        </Container>
        <div
          sx={{
            backgroundColor: "grayHvy",
            padding: [
              "25px 0px 35px 0px",
              "45px 0px 55px 0px",
              "60px 0px 70px 0px",
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
                h3: {
                  margin: "0px 0px 40px 0px",
                  fontSize: ["3rem", "3rem", "4rem"],
                  fontFamily: "heading",
                  fontWeight: "400",
                  lineHeight: "1.2",
                },
              }}
            >
              {this.state.searchChange ? (
                <CustomStats />
              ) : (
                <h3>FEATURED PROPERTIES</h3>
              )}
            </div>
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
                  padding: "15px 60px",
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
            <Configure hitsPerPage={8} />

            <InfiniteHits
              sx={{
                "> ul > li": {
                  boxSizing: "border-box",
                  zIndex: "1",
                  position: "relative",
                  backgroundColor: "white",
                  marginBottom: "40px",
                  marginRight: ["0px", "20px", "20px"],
                  width: ["100%", "calc(50% - 10px)", "calc(100% / 4 - 20px)"],
                  "&:nth-of-type(4n + 4)": {
                    marginRight: ["0px", "0px", "0px"],
                  },
                  "&:nth-of-type(2n + 2)": {
                    marginRight: ["0px", "0px", "20px"],
                  },
                },
              }}
              hitComponent={HitComponent}
              translations={{
                loadMore: "View More Properties",
              }}
              // Optional parameters
            />
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
const MyHits = connectHits(({ hits }) => {
  const hs = hits.map(hit => <HitComponent key={hit.objectID} hit={hit} />)
  return <div id="hits">{hs}</div>
})

function HitComponent({ hit }) {
  return (
    <PropertyTeaser property={hit} className="hit">
      {hit.price}
    </PropertyTeaser>
  )
}
class Switch extends React.Component {
  constructor(props) {
    super(props)
    // this.state = { value: '' };
    this.state = {
      selected: [],
    }
    this.changed = this.changed.bind(this)
  }

  changed(data) {
    this.setState({ selected: data.value }, () => {
      this.props.refine(this.state.selected)
    })
  }
  render() {
    const options = []
    this.props.items.map(item => {
      options.push({
        value: item.value,
        label: item.label,
      })
    })
    return <Select options={options} onChange={this.changed} />
  }
}

class Consumer extends React.Component {
  constructor(props) {
    super(props)
    // this.state = { value: '' };
    this.state = {
      selected: [],
    }
    this.changed = this.changed.bind(this)
  }

  changed(data) {
    if (data[0]) {
      this.setState({ selected: data[0].value ? data[0].value : "" }, () => {
        this.props.refine(this.state.selected)
      })
    } else {
      this.setState({ selected: [] }, () => {
        this.props.refine(this.state.selected)
      })
    }
  }
  render() {
    const options = []
    this.props.items.map(item => {
      options.push({
        value: item.label,
        label: item.label + " (" + item.count + ")",
      })
    })
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
// const ClearRefinements = ({ items, refine }) => (

//   <button onClick={() => refine(items)} disabled={!items.length}>
//     Clear all
//   </button>
// )
class ConsumerRadio extends React.Component {
  constructor(props) {
    super(props)
    // this.state = { value: '' };
    this.state = {
      selectedOption: "for-sale",
    }
    this.onValueChange = this.onValueChange.bind(this)
  }

  componentWillMount() {
    this.props.refine(this.state.selectedOption)
  }

  onValueChange(event) {
    this.setState({ selectedOption: event.target.value }, () => {
      this.props.refine(this.state.selectedOption)
    })
  }
  render() {
    return (
      <div
        sx={{
          display: "flex",
          // border: "thin solid #887E7E",

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
              color: "#ffffff",
              display: "block",
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              textAlign: "center",
              fontSize: "1rem",
              fontWeight: "600",
              "&.for-sale.sold": {
                color: "grayHvy",
              },
            },
          },
        }}
      >
        <div>
          <input
            type="radio"
            value="for-sale"
            checked={this.state.selectedOption === "for-sale"}
            onChange={this.onValueChange}
          />
          <span className={"for-sale " + this.state.selectedOption}>
            For Sale
          </span>
        </div>
        <div>
          <input
            type="radio"
            value="sold"
            checked={this.state.selectedOption === "sold"}
            onChange={this.onValueChange}
          />
          <span className={"sold " + this.state.selectedOption}>Sold</span>
        </div>
      </div>
      // <div>
      //   <input type="radio" value="Male" name="gender" onSelectedChanged={this.changed} /> Male
      //   <input type="radio" value="Female" name="gender" onSelectedChanged={this.changed} /> Female
      //   <input type="radio" value="Other" name="gender" onSelectedChanged={this.changed} /> Other
      //   <MultiSelect
      //     options={options}
      //     selected={selected}
      //     onSelectedChanged={this.changed}
      //     overrideStrings={{
      //       selectSomeItems: "Select County",
      //       allItemsAreSelected: "All Counties are Selected",
      //       selectAll: "Select All",
      //       search: "Search",
      //     }}
      //   />
      // </div>
    )
  }
}
class RefinementListDis extends Component {
  constructor(props) {
    super(props)
    // this.state = { value: '' };
    this.state = {
      value: "",
      selectedOption: null,
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }
  handleSelectChange(item) {
    this.setState(
      {
        value: item,
      },
      this.props.refine(item.length > 0 ? item[item.length - 1].value : "")
    )
  }

  render() {
    const { selectedOption } = this.state
    return (
      // <Select
      //   options={this.props.items}
      //   value={selectedOption}
      //   isMulti={true}
      //   onChange={this.setSelectedOption}
      // />
      <Select
        isMulti={true}
        value={this.state.value}
        options={this.props.items}
        onChange={this.handleSelectChange}
      />
    )
  }
}
const CustomRefinementList = connectRefinementList(Consumer)
const CustomRefinementListRadio = connectRefinementList(ConsumerRadio)
const CustomSort = connectSortBy(Switch)
// const CustomClearRefinements = connectCurrentRefinements(ClearRefinements)

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
          <div>{currentValues.min}</div>
          <div>{currentValues.max}</div>
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
          <div>{currentValues.min}</div>
          <div>{currentValues.max}</div>
        </div>
      </div>
    )
  }
}

const ConnectedRange = connectRange(Range)

export default withURLSync(SearchResults)
