import React, { Component } from "react"
import qs from "qs"
if (typeof window !== "undefined") {
  const updateAfter = 700
  const searchStateToURL = searchState =>
    searchState
      ? `${qs.stringify(searchState)}`
      : ""

  var withStorageSync = Front =>
    class WithStorageSync extends Component {
      state = {
        searchState: qs.parse((localStorage.getItem('query') || '').slice(1)),
      }

      componentDidMount() {
        window.addEventListener("popstate", this.onPopState)
      }

      componentWillUnmount() {
        clearTimeout(this.debouncedSetState)
        window.removeEventListener("popstate", this.onPopState)
      }

      onPopState = ({ state }) =>
        this.setState({
          searchState: state || {},
        })

      onSearchStateChange = searchState => {
        clearTimeout(this.debouncedSetState)

        this.debouncedSetState = setTimeout(() => {
          localStorage.setItem('query', searchStateToURL(searchState))
        }, updateAfter)

        this.setState({ searchState })
      }

      render() {
        const { searchState } = this.state

        return (
          <Front
            {...this.props}
            searchState={searchState}
            onSearchStateChange={this.onSearchStateChange}
            createURL={searchStateToURL}
          />
        )
      }
    }
} else {
  var withStorageSync = Front =>
    class WithStorageSync extends Component {
      render() {
        return <Front />
      }
    }
}

export default withStorageSync
