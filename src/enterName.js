import React, {useState, useEffect} from 'react'
import ReactModal from 'react-modal';


export function Form(){

  const [name, setName]= useState("")

  useEffect((event)=>{
    setName(event)
    console.log(event);
  })

  var effect = (event)=>{

      console.log("This is the value "+event.target.value);
      console.log('TEST:');
      console.log(event.target.value)
      setName(name+event.target.value)

  }

    var form = (
            <ReactModal
              isOpen={true}
                >
              <form >
                <label>
                  Please enter the Github username to see the staticst
                </label>
                <div className="form-group">
                  <input className="form-control col-md-2" type="submint"
                        value={name} onChange={e=>effect(e)}/>
                </div>
                <button onClick={()=> effect(name)} className="btn btn-primary">Look for staticst</button>
              </form>
            </ReactModal>
            )
  return (
    <div>
      {form}
    </div>
  )
}
