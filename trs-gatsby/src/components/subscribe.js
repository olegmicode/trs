/** @jsx jsx */
import { jsx } from "theme-ui"
import { Component } from "react"
class Subscribe extends Component {
  componentDidMount() {
    const script = document.createElement("script")

    script.src =
      "https://js.createsend1.com/javascript/copypastesubscribeformlogic.js"
    script.async = true

    document.body.appendChild(script)
  }

  render() {
    return (
      <form
        id="subForm"
        class="js-cm-form"
        action="https://www.createsend.com/t/subscribeerror?description="
        method="post"
        data-id="5B5E7037DA78A748374AD499497E309ED9AF3758D931254D7E0939B9012B7374FCED9069653148331BE0EF0799D4966D32B261A57C606031D8E2A916412CAE5B"
      >
        <div
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            input: {
              border: "1px solid #E9E7E7",
              color: "white",
              backgroundColor: "transparent",
              padding: "8px 20px",
              fontSize: "1rem",
              width: "100%",
              borderRadius: "0px !important",
              boxSizing: "border-box",
              "&:nth-child(2)": {
                margin: "15px 0px",
              },
              "&::placeholder": {
                color: "white",
              },
              "&:focus-visible": {
                borderRadius: "0px !important",
                outline: "none !important",
              },
            },
            button: {
              border: "1px solid #E9E7E7",
              color: "white",
              backgroundColor: "transparent",
              padding: "8px 30px",
              fontSize: "1rem",
              cursor: "pointer",
            },
          }}
        >
          <input
            placeholder="Enter your name"
            id="fieldName"
            name="cm-name"
            type="text"
          />

          <input
            id="fieldEmail"
            name="cm-hihi-hihi"
            type="text"
            class="js-cm-email-input"
            placeholder="Enter your email address"
            required
          />

          <button class="js-cm-submit-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    )
  }
}

export default Subscribe
