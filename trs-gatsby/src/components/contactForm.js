/** @jsx jsx */
import { jsx } from "theme-ui"
import axios from "axios"
import { useState } from "react"
import { Helmet } from "react-helmet"

const MyForm = () => {
  var team = ""
  var lname = ""
  var address = ""

  if (typeof window !== "undefined") {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    var team = urlParams.get("team")
    var lname = urlParams.get("lname")
    var address = urlParams.get("address")
  }

  const [serverState, setServerState] = useState({
    submitting: false,
    status: null,
    team: team,
    lname: lname,
    address: address,
  })

  const handleServerResponse = (ok, msg, form) => {
    setServerState({
      submitting: false,
      status: { ok, msg },
    })
    if (ok) {
      if (typeof window !== "undefined") {
        window.location.href = "/contact-thank-you"
      }
    }
  }

  const handleOnSubmit = e => {
    e.preventDefault()
    const form = e.target
    setServerState({ submitting: true })
    axios({
      method: "post",
      url: "https://getform.io/f/876d17f4-71ab-4e91-8120-8c442089cd72",
      data: new FormData(form),
    })
      .then(r => {
        handleServerResponse(true, "Thanks!", form)
      })
      .catch(r => {
        handleServerResponse(false, r.response.data.error, form)
      })
  }

  return (
    <div>
      <Helmet>
        <script src="https://www.google.com/recaptcha/api.js?render=6LdT6WkgAAAAAGhyquV5YMeQUtH6vbsj2PqMutSK"></script>
      </Helmet>
      <div>
        {serverState.team && (
          <div>
            You are sending this message to
            <strong> {team + " " + lname} </strong>to inquire about
            <strong> {address}</strong>
          </div>
        )}

        <form
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            select: {
              border: "1px solid #484242",
              color: "#484242",
              backgroundColor: "transparent",
              padding: "8px 20px",
              fontSize: "1rem",
              width: "100%",
              borderRadius: "0px !important",
              boxSizing: "border-box",
              marginTop: "20px",
            },
            input: {
              border: "1px solid #484242",
              color: "#484242",
              backgroundColor: "transparent",
              padding: "8px 20px",
              fontSize: "1rem",
              width: "100%",
              borderRadius: "0px !important",
              boxSizing: "border-box",
              marginTop: "20px",
              "&::placeholder": {
                color: "#484242",
              },
              "&:focus-visible": {
                borderRadius: "0px !important",
                outline: "none !important",
              },
            },
            button: {
              border: "1px solid #484242",
              color: "#484242",
              backgroundColor: "transparent",
              padding: "8px 30px",
              fontSize: "1rem",
              cursor: "pointer",
              display: "inline-block",
              marginTop: "20px",
              marginBottom: "20px",
            },
            ".check-container": {
              display: "flex",
              width: "100%",
              alignItems: "center",
              marginTop: "20px",
              input: {
                width: "20px",
                height: "20px",
                margin: "0px 20px 0px 0px",
              },
              label: {
                width: "calc(100% - 40px)",
              },
            },
          }}
          onSubmit={handleOnSubmit}
        >
          <input placeholder="Name*" type="text" required name="name" />
          <input placeholder="Email*" type="email" required name="email" />
          <input placeholder="Phone" type="phone" name="phone" />
          <select name="time" required>
            <option value="">Best Time to Call*</option>
            <option value="anytime">Anytime</option>
            <option value="am">AM</option>
            <option value="pm">PM</option>
          </select>
          <div className="check-container">
            <input type="checkbox" name="subscribe_to_newsletter" value="1" />
            <label>
              Yes, please sign me up to receive the Texas Ranches For Sale
              monthly e-Newsletter.
            </label>
          </div>
          {serverState.team && (
            <div>
              <div
                sx={{
                  width: "100%",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  marginTop: "20px",
                }}
              >
                Please Select All That Apply Below:
              </div>
              <div className="check-container">
                <input type="checkbox" name="agent_contact" value="1" />
                <label>
                  I would like to know more about this property, please have an
                  agent contact me directly
                </label>
              </div>
              <div className="check-container">
                <input type="checkbox" name="appointment" value="1" />
                <label>
                  I would like to make an appointment to view this property
                </label>
              </div>

              <div className="check-container">
                <input type="checkbox" name="evaluation" value="1" />
                <label>
                  I am interested in a current market evaluation of my property
                </label>
              </div>

              <div className="check-container">
                <input type="checkbox" name="autoalerts" value="1" />
                <label>
                  I would like to receive automatic email alerts when similar
                  properties become available
                </label>
              </div>

              <div className="check-container">
                <input type="checkbox" name="haveagent" value="1" />
                <label>I am currently working with a real estate agent</label>
              </div>
            </div>
          )}
          <div
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              sx={{
                width: "100%",
                fontWeight: "bold",
                fontSize: "1.2rem",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              Comments
            </div>
            <textarea
              sx={{
                height: "150px",
              }}
              required
              name="comments"
            />
          </div>
          <input type="hidden" name="team" value={serverState.team} />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default MyForm
