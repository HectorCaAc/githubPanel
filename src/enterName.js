import React, { useState, useEffect } from 'react'
import ReactModal from 'react-modal';


export function Form(props) {

  const [name, setName] = useState("")
  const [loading, setLoading] = useState(true)
  let key = localStorage.getItem("data")
  let previous_request = null
  if (key) {
    previous_request = <div>
      <p>Would you like to watch again data of the username {key}</p>
      <button style={{ display: "inline-block" }}
        className="btn btn-warning"
        onClick={() => props.callBack(key)}>YES</button>
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
    form = <div className="row justify-content-center" style={{ marginTop: "10%" }}>
      <div className="col-5" >
        <h3>Github User</h3>
        <form onSubmit={e => effect(e)}  >
          <div className="form-group">
            <input className="form-control" type="submint" />
          </div>
          <button className="btn btn-primary">Get Data</button>
        </form>
        {previous_request}
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
  return (
    <div>
      <ReactModal isOpen={true}>
        {form}
      </ReactModal>
    </div>

  )
}
