import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProfile, getProjectsURL, getLanguagesProjects, getCommitsProjects } from '../api/github'

const constructLanguages = (requestLanguages) => {
    let languagesPerProject = {}
    for (let language of requestLanguages) {
        console.log(language)
        if (language) {
            let keys = Object.keys(language)
            if (keys[0] in languagesPerProject) {
                languagesPerProject[keys[0]].appear += 1
            } else {
                languagesPerProject[keys[0]] = {
                    appear: 1,
                    visible: true
                }
            }
        }
    }
    // convert the object into a list where each item is the language
    let languages = []
    for (const language in languagesPerProject) {
        languages.push({ ...languagesPerProject[language], name: language })
    }
    return languages
}

const contructCommits = (requestCommits) => {
    let projects = []
    console.log(requestCommits)
    for (let commit of requestCommits) {
        if (commit instanceof Array) {
            console.log(commit)
            let name = commit.project
            let commits = commit.length
            let project = new Object()
            console.log(name)
            console.log(commits)
            console.log(project)
            project.name = name
            project.y = commits
            projects.push(project)
        }
    }
    return projects
}

const constructUser = (requestUser, userName) => {
    let user = {}
    try {
        user.user = userName
        user.bio = requestUser.bio || "No bio"
        user.followers = requestUser.followers || 0
        user.following = requestUser.following || 0
        user.company = requestUser.company || 'No Company'
        user.location = requestUser.location || "Some Place"
        user.hireable = requestUser.hireable || "No"
        user.publicRepose = requestUser.public_repos || 0
        user.picture = requestUser.avatar_url
        return user
    } catch (e) {
        console.error('There was an error construct the user')
        console.error(e)
    }

}

export const ThunkFecth = createAsyncThunk('user/FetchUser', async (userQuery) => {
    try {
        let projectsUrl = await getProjectsURL(userQuery)
        console.log('here')
        let requestCommits = await getCommitsProjects(projectsUrl, userQuery)
        console.log('here2')
        let requestLanguages = await getLanguagesProjects(projectsUrl, userQuery)
        let requestUser = await getProfile(userQuery)
        console.log('here3')
        let projects = contructCommits(requestCommits)
        console.log('here4');
        let languages = constructLanguages(requestLanguages)
        let user = constructUser(requestUser, userQuery)
        user.languages = languages
        user.projects = projects
        localStorage.setItem("API", JSON.stringify(user))
        return user
    } catch (e) {
        console.error('Error making the request to Github')
        console.error(e)
    }

})


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: '',
        languages: [],
        bio: '',
        loading: false,
        followers: 0,
        following: 0,
        company: '',
        location: '',
        hireable: false,
        publicRepose: 0,
        picture: '',
        projects: {}
    },
    reducers: {
        defaultName: state => {
            state.user = ''
        },
        change: state => {
            state.user = ''
        },
        clean: state => {
            state.user = ''
        },
        setUserStorage: (state, action) => {
            // state = action.payload
            return action.payload
        },
        fetchData: state => {
            state.loading = true
        },
        fetchComplete: state => {
            state.loading = false
        }
    },
    extraReducers: builder => {
        builder
            .addCase(ThunkFecth.pending, (state, action) => {
                console.log('WAITING FOR REPONSE');
            })
            .addCase(ThunkFecth.fulfilled, (state, action) => {
                return action.payload
            })
    }
})

export const { change, clean, setUserStorage, defaultName, fetchComplete } = userSlice.actions

export const selectUser = state => state.name.value

export default userSlice.reducer