import React from 'react'
import style from './css/basic-data.css'

export function Popularity(){

  var message = "This is going to be a simple dashboard"
  console.log("it is working ");
  return(
    <div className={style.charts}>
      <ol style={{listStyleType:"none"}}>
          <li><i className={"fas fa-user-friends"}></i> Followers</li>
          <li><i className={"fas fa-walking"} ></i> Following</li>
          <li><i className={"fas fa-industry"} ></i> Company</li>
          <li><i className={"fas fa-map-marker-alt"} ></i> Location</li>
          <li><i className={"fas fa-briefcase"} ></i> hireable</li>
          <li><i className={"fab fa-github"} ></i> Public repost</li>
      </ol>
    </div>
  )

}
