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
              languages: []
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
      component_ready:true
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

    console.log(languages);
    // create map object, key = Language, value= number of projects that build that language
    var languages_repetions = new Map()
    for (var index = 0 ; index < languages.length ; index++){
        var language_name = Object.keys(languages[index]).filter((attribute)=> attribute!="url")[0]
        if(languages_repetions.has(language_name)){
          var new_value = languages_repetions.get(language_name) +1
          languages_repetions.set(language_name, new_value)
        }else{
          languages_repetions.set(language_name,1)
        }
    }
    // create a list of the previous 10 days,
  }
  //this method has not be used yet it is under construction
  // It will use to format data in the format that commit js requires 
  get_commit=(project_languages, commit)=>{
    var url = commit.url
    var project_name = url.substring(0,url.indexOf("/commit"))
    project_name = url.substring(url.lastIndexOf("/")+1)

    var language_project_array = project_languages.filter(entry => entry.url.includes(project_name))[0]
    var language_project = Object.keys(language_project_array).filter(keys => keys!="url")




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
                <PieChart/>
              </div>
              <div className="col">
                <Commits />
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
      </div>
    )
  }
}
ReactDOM.render(<Base/>, document.getElementById('base'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
