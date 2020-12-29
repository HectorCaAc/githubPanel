import React, { useState, useEffect } from 'react'
import ReactModal from 'react-modal';
import GithubBackGround from './images/githubPannel.jpg'
import './css_folder/entry_page.css'


export function Form(props) {

  const [name, setName] = useState("")
  const [loading, setLoading] = useState(true)
  let key = localStorage.getItem("data")
  let previous_request = null
  if (key) {
    previous_request =
      <div className="row">
        <p className="col-lg-5">Would you like to watch again data of the username: </p>
        <div className="col-lg-5">
          <div classname="col-sm-6">
            {key}
          </div>
          <div className="col-sm-6">
            <button style={{ display: "inline-block" }}
              className="btn btn-warning"
              onClick={() => props.callBack(key)}>YES</button>
          </div>
        </div>
      </div>
  }
  const effect = (event) => {
    localStorage.clear()
    if (typeof event !== "undefined") {
      event.preventDefault()
      var data = event.target[0].value
      setLoading(false);
      localStorage.setItem("data", data)
      setTimeout(() => { props.callBack(data) }, 2000)
    }
  }
  var form = null

  if (loading) {

    form =
      <div className="row no-gutters">
        <div className="col-lg-6 ">
          <img className="h-100 col-lg-12 padding-0" src={`${GithubBackGround}`} />
        </div>
        <div className="col-lg-6 padding-0">
          <div className="title">
            <h2>Github User</h2>
          </div>
          <div className="">
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                This Web application allow you to retrieve data from users from github.
                The content will include the languages that the user can use, the most current
                projects and the total number of commits and social data about it
            </div>
            </div>
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <form onSubmit={e => effect(e)}  >
                  <div className="form-group">
                    <label htmlFor="github-user">Github User</label>
                    <input className="form-control" type="submint" id="github-user" />
                  </div>
                  <button className="btn btn-primary">Get Data</button>
                </form>
                <div >
                  {previous_request}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  } else {
    form =
      <div className="row justify-content-center" style={{ marginTop: "10%" }}>
        <div className="col-5">
          <h4>
            DATA IS LOADING ......
                </h4>
        </div>
      </div>
  }

  const REACT_MODAL = {
    overlay: {
      // backgroundColor: "#191919",
      // top: "10%"
    },
    content: {
      // position:"static",
      // padding: "10px"
      // bottom: "-1px"
      padding: "0px",
    }
  }
  return (
    <div>
      <ReactModal isOpen={true} style={REACT_MODAL}>
        {form}
      </ReactModal>
    </div>

  )
}
