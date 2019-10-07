import React, {useState, useEffect} from 'react'
import ReactModal from 'react-modal';


export function Form(props){

  const [name, setName]= useState("")
  const [loading, setLoading] = useState(true)

  let key = localStorage.getItem("data")

  useEffect((event)=>{
    setName(event)
    // console.log(event);
  })

  if (key){
    console.log("Data was set up!!");
    setTimeout(()=>{props.callBack(key)},2000)
  }

  var effect = (event)=>{

    if(typeof event !== "undefined"){
      event.preventDefault()
      var data = event.target[0].value
      setLoading(false);
      localStorage.setItem("data",data)
      setTimeout(()=>{props.callBack(data)}, 2000)
    }

  }

    var form = null
    if (loading){
          form = (
                <form onSubmit ={e=>effect(e)}>
                  <label>
                    Please enter the Github username to see the staticst
                  </label>
                  <div className="form-group">
                    <input className="form-control col-md-2" type="submint"/>
                  </div>
                  <button onClick={()=> effect(name)} className="btn btn-primary">Look for staticst</button>
                </form>
              )
      }else{
        form =
              <h4>
                DATA IS LOADING ......
              </h4>
      }


  return (
    <div>
      <ReactModal isOpen={true}>
        {form}
      </ReactModal>
    </div>

  )
}
