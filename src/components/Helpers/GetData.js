const start_set_up = () => {
    let data = JSON.parse(localStorage.getItem("API"))
    let charts = decodeData(data)
    let object = new Map()
    object.set('user_name', 'hector')
    object.set('pie_data', charts[0])
    object.set('commits_data', charts[1])
    return object
}

const decodeData = (data) => {
    var languages = data.filter((entry) => {
        return entry.url.includes("/language")
    })
    var commit = data.filter((entry) => {
        return entry.url.includes("/commits")
    })
    let commits_data = get_commit_per_project(commit)
    let projects_languages = get_projects_per_language(languages)
    return [projects_languages, commits_data]
}
const get_commit_per_project = (project_commits) => {
    let commits = project_commits.map((entry) => {
        let project = entry.url.substring(0, entry.url.lastIndexOf("/"))
        let last_slash = project.lastIndexOf("/") + 1
        project.substring(last_slash)
        let name_project = project.substring(last_slash)
        if (entry.hasOwnProperty("array")) {
            return ({ name_project: name_project, y: entry.array.length })
        }
        return { name_project: name_project, y: 0 }
    })
    return commits
}

const get_projects_per_language = (languages) => {
    var languages_projects = new Map()
    for (var index = 0; index < languages.length; index++) {
        var project_name = languages[index].url.substring(0, languages[index].url.lastIndexOf("/"))
        project_name = project_name.substring(project_name.lastIndexOf("/") + 1)
        var language_name = Object.keys(languages[index]).filter((attribute) => attribute !== "url")
        if (language_name.length > 0) {
            language_name.forEach((language) => {
                if (languages_projects.has(language)) {
                    var new_value = languages_projects.get(language)
                    new_value.push(project_name)
                    languages_projects.set(language, new_value)
                } else {
                    languages_projects.set(language, [project_name])
                }
            })
        }
    }
    return languages_projects
}

export default start_set_up