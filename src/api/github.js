
const getProjectsURL = (githubUserName) => {
    var projects = []
    var url = "https://api.github.com/users/" + githubUserName + "/repos"
    return fetch(url)
            .then(data => data.json())
            .then( data =>{
                let projects = new Array(data.length)
                for( let index = 0; index < 10 && index < data.length; index++){
                    projects[index] = data[index].name
                }
                return projects
            })
}

const getLanguagesProjects =  (projectsName, user) => {
    let languagesURL = projectsName.map(project =>({
        name: project,
        url: `https://api.github.com/repos/${user}/${project}/languages`
    }))
    return  Promise.all(languagesURL.map(entry => fetch(entry.url)
        .then(data => data.json())
        .then(project =>{
            project.project = entry.name
            return project
        })
    ))
}

const getCommitsProjects = (projectsName, user) => {
    let commitsURL = projectsName.map(project => ({
        name: project, 
        url: `https://api.github.com/repos/${user}/${project}/commits`
    }))
    return Promise.all(commitsURL.map(entry =>fetch(entry.url)
        .then(entry => entry.json())
        .then(project => {
            project.project = entry.name
            return project
        })
    ))
}

const getProfile =  (github_user_name) => {
    let profile = "https://api.github.com/users/" + github_user_name
    return fetch(profile)
            .then(data=> data.json())
}
export { getProfile, getProjectsURL, getLanguagesProjects, getCommitsProjects } 