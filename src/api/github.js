
const get_languages = async (githubUserName) => {
    var projects = []
    var links = []
    var commits = []
    var languages = []
    var url = "https://api.github.com/users/" + githubUserName + "/repos"
    await fetch(url)
        .then((data) => data.json())
        .then(data => {
            for (var index = 0; index < 10 && index < data.length; index++) {
                projects.push(data[index].name)
            }
            links = projects.map((entry) =>
                "https://api.github.com/repos/" + githubUserName + "/" + entry)
            commits = links.map((entry) =>
                entry + "/languages")
            languages = links.map((entry) =>
                entry + "/commits")
            return commits.concat(languages)
        }).then(entry => {
            return Promise.all(
                entry.map((entry) =>
                    fetch(entry)
                        .then(data => data.json())
                        .then(data => {
                            if (data.hasOwnProperty("length")) {
                                var complex = {
                                    array: data,
                                    url: entry
                                }
                                return complex
                            } else {
                                data.url = entry
                                return data
                            }
                        })
                )
            )
        }
        ).then(data => localStorage.setItem("API", JSON.stringify(data)))
}

const get_profile=async(github_user_name)=>{
    let profile ="https://api.github.com/users/"+github_user_name
    let data = await fetch(profile)
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
      return [user, other_data]
    })
    return data
  }