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
import Select from "react-select"
import MultiSelect from "@khanacademy/react-multi-select"
import qs from "qs"
import Container from "../components/container"

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
    }
    this.toggleFilters = this.toggleFilters.bind(this)
  }
  toggleFilters() {
    this.setState(prevState => ({
      filtersOpen: !prevState.filtersOpen,
    }))
  }
  componentDidUpdate() {
    // if (typeof window !== "undefined" && window) {
    //   var searchState = JSON.parse(localStorage.getItem("searchState"))
    //   if(searchState !== this.props.location.search){
    //     localStorage.setItem("searchState", this.props.location.search)
    //   }
    //   if(searchState = this.props)
    //   console.log(this.props)
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
    const Stats = ({ nbHits }) => <p>{nbHits} results</p>
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
            sx={{
              width: "100%",
              display: "flex",
              padding: "60px 0px",
              alignItems: "flex-start",
            }}
          >
            <div
              sx={{
                width: "calc(100% / 4)",
              }}
            >
              <h3>PRICE</h3>
              <ConnectedRange attribute="price" />
              <h3>ACREAGE</h3>
              <ConnectedRange attribute="acreage" />
            </div>
            <div
              sx={{
                width: "calc(100% / 4)",
              }}
            >
              <h3>COUNTY</h3>
              <CustomRefinementList attribute="county" />

              <h3>STATUS</h3>
              <RefinementList
                sx={{
                  textTransform: "capitalize",
                }}
                attribute="status"
              />
            </div>
            <div
              sx={{
                width: "calc(100% / 4)",
              }}
            >
              <h3>SORT BY</h3>
              <SortBy
                defaultRefinement="additional_properties_price_desc"
                items={[
                  {
                    value: "additional_properties_price_desc",
                    label: "Price: High to Low",
                  },
                  {
                    value: "additional_properties_price_asc",
                    label: "Price: Low to High",
                  },
                  {
                    value: "additional_properties_acreage_desc",
                    label: "Acreage: High to Low",
                  },
                  {
                    value: "additional_properties_acreage_asc",
                    label: "Acreage: Low to High",
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
              <h3>CLEAR ALL</h3>
              <ClearRefinements />
            </div>
            <div
              sx={{
                width: "calc(100% / 4)",
              }}
            >
              <h3>APPLY YOUR SELECTIONS</h3>
              <div
                sx={{
                  fontSize: "16px",
                }}
              >
                Click Below To Apply Your Search Criteria. You Can Clear Your
                Selections At Any Time By Clicking The "Clear All" Button.
              </div>
              <div
                sx={{
                  color: "white",
                  backgroundColor: "primary",
                }}
              >
                SEE RESULTS BELOW
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
            backgroundColor: "darkGray",
            padding: "60px 0px",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Container>
            <h3>SEARCH RESULTS</h3>
            <div
              sx={{
                backgroundColor: "primary",
                color: "white",
                padding: "10px 20px",
              }}
            >
              CHANGE SEARCH CRITERIA
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
    console.log(this.props.items)
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
