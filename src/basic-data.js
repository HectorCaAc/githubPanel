import React from 'react'
import style from './css/basic-data.css'

function BasicData(props){
  console.log("This is the basicData")
  var languages =[]
  props.languages.forEach((v,k)=>{
            if(k){
              languages.push(k)}
  })
  console.log("Languages inside of basicData")
  console.log(languages)
  console.log(props.data)
  console.log(props.languages)
  return (
    <div className="container">
        <div className="row justify-content-md-center">
          <div className="col">
              <img id={style.picture} src={props.picture} alt="Picture Not Found" height="175" width="175"/>
          </div>
          <div className={"col "} id={style.bio}>
              <p>
              {props.bio}
              </p>
              {languages.map((entry, id)=>
                <span key={id} className={"btn btn-primary "+style.buttons}>
                {entry}
                </span>
              )
            }
          </div>
        </div>
    </div>
  )
}

export default BasicData;
