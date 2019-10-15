import React from 'react';
import ReactDOM from 'react-dom';
import Languages from './languages.js';
import BasicData from './basic-data.js';
import {Test, PieChart} from './pie_chart';
import {Commits} from './commits.js';
import {Popularity} from './popularity.js';
import {Form} from './enterName.js';

// still required to find the way to look for the username
// It will be a good idea to read more about react
// to be specific when a product render, and when a product just update the DOM
class Base extends React.Component{

  constructor(props){
    super()
    this.state ={
              component_ready:false,
              data: {},
              other_data : {},
              languages: [],
              pie_data : null,
              commits_data : null,
              user_name: "LOADING DATA",
    }
  }

  get_languages=(githubUserName)=>{
    var projects = []
    var links = []
    var commits = []
    var languages = []
    var url = "https://api.github.com/users/"+githubUserName+"/repos"
    fetch(url)
      .then((data)=>data.json())
      .then(data => {
            for (var index = 0 ; index < 10 && index < data.length ; index++){
              projects.push(data[index].name)
            }
            links = projects.map((entry)=>
                "https://api.github.com/repos/"+githubUserName+"/"+entry)
            commits = links.map((entry)=>
                entry+"/languages")
            languages = links.map((entry)=>
              entry+"/commits")
            return commits.concat(languages)
    }).then(entry=>{
      return Promise.all(
              entry.map((entry)=>
                    fetch(entry)
                    .then(data=>data.json())
                    .then(data=>{
                      console.log("Inside of the promise all ")
                      console.log(data);
                      if(data.hasOwnProperty("length")){
                        var complex = {
                                  array: data,
                                  url:entry
                        }
                        return complex
                      }else{
                        data.url=entry
                        return data
                        }
                      })
                  )
              )
    }
    ).then(data => localStorage.setItem("API",JSON.stringify(data)))
  }

  username = (user_name)=>{
    if(!localStorage.getItem("API")){
      this.get_languages(user_name)
    }
    var data = JSON.parse(localStorage.getItem("API"))
    let personal_info = this.get_profile(user_name).then((data)=>console.log(data))
    let charts = this.decodeData(data)
    // console.log("user_name");
    // console.log(user_name);
    // console.log("charts");
    // console.log(charts);
    console.log("personal_info");
    console.log(personal_info);
    this.setState({
      user_name:user_name,
      pie_data: charts[0],
      commits_data:charts[1],
      data: personal_info[0],
      other_data: personal_info[1],
      component_ready: true
    })
  }
  //Decode required data gather from the api's
  decodeData=(data)=>{
    var languages = data.filter((entry)=>{
                    return entry.url.includes("/language")
    })
    var commit = data.filter((entry)=>{
                    return entry.url.includes("/commits")
    })
    let commits_data = this.get_commit_per_project(commit)
    let projects_languages = this.get_projects_per_language(languages)
    return [projects_languages, commits_data]
  }
  // parse the years and the last update in a better format, I do not like the
  // current one
  get_profile=(github_user_name)=>{
      let profile ="https://api.github.com/users/"+github_user_name
      let data = fetch(profile)
      .then((data)=> data.json())
      .then((data)=>{
        let user = new Object()
        user.picture = data.avatar_url
        user.bio = data.bio? data.bio :"No BIO "
        let other_data = new Object()
        other_data.location= data.location? data.location: "Some place"
        other_data.company = data.company ? data.company : "No company"
        other_data.hireable = data.hireable ? data.hireable: "No"
        other_data.public_repos = data.public_repos? data.public_repos: 0
        other_data.public_gists = data.public_gists ? data.public_gists: 0
        other_data.followers = data.followers ? data.followers: 0
        other_data.following= data.following ? data.following: 0
        other_data.years = data.created_at? data.created_at: "0"
        other_data.last_udpate = data.updated_at? data.updated_at:"0"
        return [user, other_data]
      })
      .catch((error)=>{
        let user = new Object()
        user.picture = "no picture"
        user.bio = "no data"
        let other_data=new Object()
        console.log("requests not sucess");
        return [user, other_data]
      })
      return data
    }

  get_projects_per_language = (languages)=>{
    var languages_projects = new Map()
    for (var index = 0 ; index < languages.length ; index++){
        var project_name = languages[index].url.substring(0,languages[index].url.lastIndexOf("/"))
        project_name=project_name.substring(project_name.lastIndexOf("/")+1)
        var language_name = Object.keys(languages[index]).filter((attribute)=> attribute !=="url")
        if(language_name.length > 0){
          language_name.forEach((language)=>{
            if(languages_projects.has(language)){
              var new_value = languages_projects.get(language)
              new_value.push(project_name)
              languages_projects.set(language, new_value)
            }else{
              languages_projects.set(language,[project_name])
            }
          })
        }
    }
    return languages_projects
  }

  get_commit_per_project = (project_commits)=>{
    let commits = project_commits.map((entry)=>{
                                    let project = entry.url.substring(0,entry.url.lastIndexOf("/"))
                                    project = project.substring(project.lastIndexOf("/")+1)
                                    if (entry.hasOwnProperty("array")){
                                        return ({x:project , y:entry.array.length})
                                      }
                                    return {x:project, y:0}
    })
    return commits
  }

  render(){
    return(
      <div>
        {this.state.component_ready &&
        <div>
        <BasicData data={this.state.data}
                   languages={this.state.pie_data}/>
          <div className="charts">
            <div className="row">
              <div className="col">
                <PieChart data={this.state.pie_data}/>
              </div>
              <div className="col">
                <Commits data={this.state.commits_data} />
              </div>
              <div className="col">
                <Popularity />
              </div>
            </div>
          </div>
        </div>
        }
        {!this.state.component_ready &&
          <Form callBack={this.username}/>
        }
        {!this.state.component_ready && <h4>this.state.user_name</h4>}
      </div>
    )
  }
}
ReactDOM.render(<Base/>, document.getElementById('base'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
