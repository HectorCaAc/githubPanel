import { createSlice } from '@reduxjs/toolkit'

// For now it will move the functions from the api helpers to here
import data from "../components/Helpers/GetData";

let getData = data()

// commits component
let commits = getData.get('commits_data')
// pier chart component
let pieChart = getData.get('pie_data')

//Social Component
let social = new Map()
social.set('Followers', 1)
social.set('Following', 2)
social.set('CurrentCompany', 'No Company')
social.set('Location', 'Lincoln Ne ')
social.set('Hireable', 'No Hireable')
social.set('PublicRepost', 8)

export const userSlice = createSlice({
    name: 'user', 
    initialState: {
        user: 'HectorCaAc',
        languages: ['python', 'javascript', 'HTML', 'CSS', 'Shell', 'Java', 'DockerFile'],
        bio: 'No bio'
    },
    reducers: {
        change: state =>{
            state.user = 'New user'
        },
        clean: state =>{
            state.user  = ''
        },
        fetchData: (state, user) =>{
            state.user = user
        }
    }
})

export const {change, clean, fetchData} = userSlice.actions

export const selectUser = state => state.name.value

export default userSlice.reducer