/** @jsx jsx */
import { jsx } from "theme-ui"
import "rheostat/initialize"
import "rheostat/css/rheostat.css"
import Layout from "./layout"
import PropertyTeaser from "./entity/property/propertyTeaser"
import React, { Component, Fragment } from "react"
import withURLSync from "../templates/URLSync"
import PropTypes from "prop-types"
import Rheostat from "rheostat"
import algoliasearch from "algoliasearch/lite"
import Select, { NonceProvider } from "react-select"
import MultiSelect from "@khanacademy/react-multi-select"
import qs from "qs"
import Container from "../components/container"
import scrollTo from "gatsby-plugin-smoothscroll"
import {
  InstantSearch,
  ClearRefinements,
  SearchBox,
  Pagination,
  Highlight,
  Configure,
  connectHits,
  connectNumericMenu,
  connectStats,
  connectRefinementList,
  connectRange,
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
        console.log(this)
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

  render() {
    console.log(this)

    const Stats = ({ nbHits }) => <h3>{nbHits} SEARCH RESULTS</h3>
    const CustomStats = connectStats(Stats)
    return (
      <InstantSearch
        searchClient={searchClient}
        indexName="additional_properties"
        searchState={this.props.searchState}
        createURL={this.props.createURL}
        onSearchStateChange={this.props.onSearchStateChange}
      >
        <Container>
          <div
            id="filters"
            sx={{
              width: "100%",
              display: "flex",
              padding: "60px 0px",
              h3: {
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "grayHvy",
                textAlign: "center",
                margin: "0px 0px 15px 0px",
              },
            }}
          >
            <div
              sx={{
                width: "calc(100% / 4)",
                paddingRight: "60px",
                marginRight: "60px",
                borderRight: "thin solid",
                borderColor: "#887E7E",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                boxSizing: "border-box",
              }}
            >
              <div
                sx={{
                  marginBottom: "40px",

                  button: {
                    borderRadius: "100%",
                    backgroundColor: "newTan",
                    width: "16px",
                    height: "16px",
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
                width: "calc(100% / 4)",
                paddingRight: "60px",
                marginRight: "60px",
                borderRight: "thin solid",
                borderColor: "#887E7E",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                boxSizing: "border-box",
                ".dropdown-heading": {
                  borderRadius: "0px !important",
                  border: "thin solid #887E7E !important",
                },
                ".dropdown-heading-dropdown-arrow": {
                  backgroundColor: "newTan",
                  width: "40px !important",
                  paddingLeft: "5px",
                  span: {
                    borderColor:
                      "rgb(255, 255, 255) transparent transparent !important",
                    borderWidth: "5px 5px 2.5px !important",
                  },
                },
              }}
            >
              <div
                sx={{
                  marginBottom: "40px",
                }}
              >
                <h3>COUNTY</h3>
                <CustomRefinementList attribute="county" />
              </div>
              <div sx={{}}>
                <h3>STATUS</h3>
                <CustomRefinementListRadio attribute="status" />
              </div>
            </div>
            <div
              sx={{
                width: "calc(100% / 4)",
                paddingRight: "60px",
                marginRight: "60px",
                borderRight: "thin solid",
                borderColor: "#887E7E",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                boxSizing: "border-box",
              }}
            >
              <h3>SORT BY</h3>
              <SortBy
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
              <h3>SEARCH FOR</h3>
              <SearchBox />
            </div>
            <div
              sx={{
                width: "calc(100% / 4)",
              }}
            >
              <div
                sx={{
                  fontSize: "16px",
                }}
              >
                View filter results below, or press “Clear All” to clear your
                selections and see all featured ranch properties.
              </div>
              <ClearRefinements />
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
            backgroundColor: "darkGray",
            padding: "45px 0px",
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
                  margin: "0px 0px 20px 0px",
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
                backgroundColor: "newTan",
                color: "white",
                padding: "10px 20px",
                cursor: "pointer",
              }}
              onClick={() => scrollTo("#filters")}
            >
              CHANGE FILTER CRITERIA
            </div>
          </Container>
        </div>
        <div
          sx={{
            backgroundColor: "offWhite",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Container>
            <Configure hitsPerPage={4} />

            <InfiniteHits
              hitComponent={HitComponent}
              translations={{
                loadMore: "VIEW MORE",
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
                }}
                onClick={() => scrollTo("#filters")}
              >
                BACK TO TOP
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
    this.setState({ selected: data }, () => {
      this.props.refine(this.state.selected)
    })
  }
  render() {
    const { selected } = this.state
    const options = []
    this.props.items.map(item => {
      options.push({
        label: item.label + " (" + item.count + ")",
        value: item.label,
      })
    })

    return (
      <MultiSelect
        options={options}
        selected={selected}
        onSelectedChanged={this.changed}
        overrideStrings={{
          selectSomeItems: "Select County",
          allItemsAreSelected: "All Counties are Selected",
          selectAll: "Select All",
          search: "Search",
        }}
      />
    )
  }
}
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
      <div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="sold"
              checked={this.state.selectedOption === "sold"}
              onChange={this.onValueChange}
            />
            Sold
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="for-sale"
              checked={this.state.selectedOption === "for-sale"}
              onChange={this.onValueChange}
            />
            For Sale
          </label>
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
