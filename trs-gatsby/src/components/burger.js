/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"

const Burger = ({ open, clickMe }) => {
  return (
    <div
      onClick={clickMe}
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
        zIndex: open ? "1001" : "auto",
        transition: "all 0.3s linear",
        right: [
          open ? "15px" : "10px",
          open ? "15px" : "10px",
          "auto",
        ],
        top: [
          open ? "15px" : "7px",
          open ? "15px" : "7px",
          "auto",
        ],
        position: [
          open ? "fixed" : "absolute",
          open ? "fixed" : "absolute",
          "auto",
        ],
        transformOrigin: "1px",
      }}
    >
      <div
        sx={{
          width: "100%",
          height: "5px",
          background: open ? "#ffffff" : "#887E7E",
          borderRadius: "10px",
          transition: "all 0.3s linear",
          position: "relative",
          transformOrigin: "1px",
          transform: [
            open ? "rotate(45deg)" : "rotate(0)",
            open ? "rotate(45deg)" : "rotate(0)",
            "none",
          ],
        }}
      ></div>
      <div
        sx={{
          width: "100%",
          height: "5px",
          background: open ? "#ffffff" : "#887E7E",
          borderRadius: "10px",
          transition: "all 0.3s linear",
          position: "relative",
          transformOrigin: "1px",
          opacity: [
            open ? "0" : "1",
            open ? "0" : "1",
            "auto",
          ],
          transform: [
            open ? "translateX(20px)" : "translateX(0)",
            open ? "translateX(20px)" : "translateX(0)",
            "none",
          ],
        }}
      ></div>
      <div
        sx={{
          width: "100%",
          height: "5px",
          background: open ? "#ffffff" : "#887E7E",
          borderRadius: "10px",
          transition: "all 0.3s linear",
          position: "relative",
          transformOrigin: "1px",
          transform: [
            open ? "rotate(-45deg)" : "rotate(0)",
            open ? "rotate(-45deg)" : "rotate(0)",
            "none",
          ],
        }}
      ></div>
    </div>
  )
}
export default Burger
