import React from 'react'
import style from './css/basic-data.css';

function BasicData(props){
  return (
    <div className="container">
        <div className="row justify-content-md-center">
        <div className="col">
            <span id={style.picture}>
            <img src={props.image} alt="Picture Not Found" height="175" width="175"/>
            </span>
        </div>
        <div className="col">
          <div id="user">

          </div>
        </div>
      </div>
    </div>
  )
}

export default BasicData;
