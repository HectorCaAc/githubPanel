import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProfile, getProjectsURL, getLanguagesProjects, getCommitsProjects } from '../api/github'

const constructLanguages = (requestLanguages) => {
    console.log('constructLangauges');
    let languages = {}
    for (let language of requestLanguages) {
        let keys = Object.keys(language)
        if (keys[0] in languages) {
            languages[keys[0]].appear += 1
        } else {
            languages[keys[0]] = {
                appear: 1,
                visible: true
            }
        }
    }
    console.log('--end--');
    return languages
}

const contructCommits = (requestCommits) => {
    let projects = []
    for (let commit of requestCommits) {
        let name = commit.project
        let commits  = commit.length
        let project =  new Object()
        project.name= name
        project.y=commits
        projects.push(project)
    }
    console.log('end---');
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
    }catch (e){
        console.error('There was an error construct the user')
        console.error(e)
    }
    
}

export const ThunkFecth = createAsyncThunk('user/FetchUser', async (userQuery) => {
    try{
        let projectsUrl = await getProjectsURL(userQuery)
        let requestCommits = await getCommitsProjects(projectsUrl, userQuery)
        let requestLanguages = await getLanguagesProjects(projectsUrl, userQuery)
        let requestUser = await getProfile(userQuery)
        let projects = contructCommits(requestCommits)
        let languages = constructLanguages(requestLanguages)
        let user = constructUser(requestUser, userQuery)
        user.languages = languages
        user.projects = projects
        localStorage.setItem("API", JSON.stringify(user))
        return user
    } catch(e){
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