/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"

class Burger extends React.Component {
  clickMe = () => {
    this.props.clickMe()
  }
  render() {
    return (
      <div
        onClick={this.clickMe}
        sx={{
          display: ["flex", "none", "none"],
          flexDirection: "column",
          justifyContent: "space-around",
          width: "30px",
          height: "30px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "0",
          zIndex: this.props.open ? "1001" : "auto",
          transition: "all 0.3s linear",
          right: [
            this.props.open ? "15px" : "10px",
            this.props.open ? "15px" : "10px",
            "auto",
          ],
          top: [
            this.props.open ? "15px" : "7px",
            this.props.open ? "15px" : "7px",
            "auto",
          ],
          position: [
            this.props.open ? "fixed" : "absolute",
            this.props.open ? "fixed" : "absolute",
            "auto",
          ],
          transformOrigin: "1px",
        }}
      >
        <div
          sx={{
            width: "100%",
            height: "5px",
            background: this.props.open ? "#ffffff" : "#887E7E",
            borderRadius: "10px",
            transition: "all 0.3s linear",
            position: "relative",
            transformOrigin: "1px",
            transform: [
              this.props.open ? "rotate(45deg)" : "rotate(0)",
              this.props.open ? "rotate(45deg)" : "rotate(0)",
              "none",
            ],
          }}
        ></div>
        <div
          sx={{
            width: "100%",
            height: "5px",
            background: this.props.open ? "#ffffff" : "#887E7E",
            borderRadius: "10px",
            transition: "all 0.3s linear",
            position: "relative",
            transformOrigin: "1px",
            opacity: [
              this.props.open ? "0" : "1",
              this.props.open ? "0" : "1",
              "auto",
            ],
            transform: [
              this.props.open ? "translateX(20px)" : "translateX(0)",
              this.props.open ? "translateX(20px)" : "translateX(0)",
              "none",
            ],
          }}
        ></div>
        <div
          sx={{
            width: "100%",
            height: "5px",
            background: this.props.open ? "#ffffff" : "#887E7E",
            borderRadius: "10px",
            transition: "all 0.3s linear",
            position: "relative",
            transformOrigin: "1px",
            transform: [
              this.props.open ? "rotate(-45deg)" : "rotate(0)",
              this.props.open ? "rotate(-45deg)" : "rotate(0)",
              "none",
            ],
          }}
        ></div>
      </div>
    )
  }
}
export default Burger
