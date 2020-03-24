import React from 'react'
import './css_folder/basic-data.css'

export function Popularity(props){
  return(
    <div className="charts">
      <h3>Social Data</h3>
      <ol style={{listStyleType:"none"}} className="row">
          <li className="col-lg-6"><i className={"fas fa-user-friends"}></i>{props.data.followers} Followers</li>
          <li className="col-lg-6"><i className={"fas fa-walking"} ></i>{props.data.following} Following</li>
          <li className="col-lg-6"><i className={"fas fa-industry"} ></i>{props.data.company} Company</li>
          <li className="col-lg-6"><i className={"fas fa-map-marker-alt"} ></i>{props.data.location} Location</li>
          <li className="col-lg-6"><i className={"fas fa-briefcase"} ></i> {props.data.hireable} hireable</li>
          <li className="col-lg-6"><i className={"fab fa-github"} ></i> {props.data.public_repos} Public repost</li>
      </ol>
    </div>
  )

}
