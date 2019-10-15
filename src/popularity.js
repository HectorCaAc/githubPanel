import React from 'react'
import style from './css/basic-data.css'

export function Popularity(props){
  return(
    <div className={style.charts}>
      <ol style={{listStyleType:"none"}}>
          <li><i className={"fas fa-user-friends"}></i>{props.data.followers} Followers</li>
          <li><i className={"fas fa-walking"} ></i>{props.data.following} Following</li>
          <li><i className={"fas fa-industry"} ></i>{props.data.company} Company</li>
          <li><i className={"fas fa-map-marker-alt"} ></i>{props.data.location} Location</li>
          <li><i className={"fas fa-briefcase"} ></i> {props.data.hireable} hireable</li>
          <li><i className={"fab fa-github"} ></i> {props.data.public_repos} Public repost</li>
      </ol>
    </div>
  )

}
