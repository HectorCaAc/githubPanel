import React from 'react';
import ReactDOM from 'react-dom';
import Languages from './languages.js';
import BasicData from './basic-data.js';
import {Test, PieChart} from './pie_chart';
import {Commits} from './commits.js';
import {Popularity} from './popularity.js';
import {Form} from './enterName.js';

class Base extends React.Component{

  constructor(props){
    super()
    this.state ={
              component_ready:false,
              data: {},
              languages: [],
              pie_data : null,
              commits_data : null,
              user_name: ""
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

  username = (data)=>{
    if(!localStorage.getItem("API")){
      this.get_languages(data)
    }
    var data = JSON.parse(localStorage.getItem("API"))
    this.decodeData(data)
    this.setState({
      component_ready:true,
      user_name:data
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
    console.log("··············")
    console.log(projects_languages)
    console.log(commits_data)
    this.setState({
              pie_data: projects_languages,
              commits_data: commits_data,
              component_ready: true
    })
  }
  get_projects_per_language = (languages)=>{
    var languages_projects = new Map()
    for (var index = 0 ; index < languages.length ; index++){
        var project_name = languages[index].url.substring(0,languages[index].url.lastIndexOf("/"))
        project_name=project_name.substring(project_name.lastIndexOf("/")+1)
        var language_name = Object.keys(languages[index]).filter((attribute)=> attribute!="url")[0]
        if(languages_projects.has(language_name)){
          var new_value = languages_projects.get(language_name)
          new_value.push(project_name)
          languages_projects.set(language_name, new_value)
        }else{
          languages_projects.set(language_name,[project_name])
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
    var data ={
          picture:'https://avatars0.githubusercontent.com/u/17506593?v=4',
          bio:"THis is a really long message that will display with all the data that is required to show this data, It will really usefull when it necessary to show some really cool techinuqes that required github",
          languages:['Java','Python','HTML','CSS','Javascript','Mysql'],
          projects_languages:[],
          person:{}
    }
    return(
      <div>
        {this.state.component_ready &&
        <div>
        <BasicData picture={data.picture} bio={data.bio} languages={data.languages}/>
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
