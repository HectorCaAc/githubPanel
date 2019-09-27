import React from 'react'
import style from './css/basic-data.css'

export function Popularity(){

  var message = "This is going to be a simple dashboard"
  console.log("it is working ");
  return(
    <div className={style.charts}>
      <ol style={{listStyleType:"none"}}>
          <li>Followers</li>
          <li>Following</li>
          <li>Company</li>
          <li><i className={"fas fa-archway"}> hello</i>Location</li>
          <li>hireable</li>
          <li>Public repost</li>
          <li></li>
      </ol>
      <i className="fas fa-archway">HETESTS</i>
    </div>
  )

}
