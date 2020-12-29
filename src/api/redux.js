const start_set_up = async(user_name)=>{
    if(!localStorage.getItem("API")){
        await this.get_languages(user_name)
      }
      var data = JSON.parse(localStorage.getItem("API"))
      let personal_info = await this.get_profile(user_name)
      let charts = this.decodeData(data)
      this.setState({
        user_name:user_name,
        pie_data: charts[0],
        commits_data:charts[1],
        data: personal_info[0],
        other_data: personal_info[1],
        component_ready: true
      })
}

const clear_local_store =()=>{
    this.setState({
        component_ready:false
  })
}

const get_projects_per_language = (languages)=>{
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

const get_commit_per_project = (project_commits)=>{
    let commits = project_commits.map((entry)=>{
                                    let project = entry.url.substring(0,entry.url.lastIndexOf("/"))
                                    let last_slash = project.lastIndexOf("/")+1
                                    project.substring(last_slash)
                                    let name_project = project.substring(last_slash)
                                    if (entry.hasOwnProperty("array")){
                                        return ({name_project:name_project , y:entry.array.length})
                                      }
                                    return {name_project:name_project, y:0}
    })
    return commits
  }