import React from 'react'
import style from './css/basic-data.css'

function BasicData(props){
  var languages =[]
  props.languages.forEach((v,k)=>{
            if(k){
              languages.push(k)}
  })
  return (
    <div className="container">
        <div className="row justify-content-md-center">
          <div className="col">
              <img id={style.picture} src={props.data.picture} alt="Picture Not Found" height="175" width="175"/>
          </div>
          <div className={"col "} id={style.bio}>
              <p>
              {props.data.bio}
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
