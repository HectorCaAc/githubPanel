import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fakeAPI } from '../api/github'
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

export const ThunkFecth = createAsyncThunk('user/FetchUser', async( user)=>{
    console.log(`User that will get data from ${user}`);
    const response = await fakeAPI()
    return response.use
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
        picture: ''
    },
    reducers: {
        defaultName: state=>{
            state.user = ''
        },
        change: state =>{
            state.user = ''
        },
        clean: state =>{
            state.user  = ''
        },
        newUser: (state, action) =>{
            state.user = action.payload
        },
        fetchData: state =>{
            state.loading = true
        },
        fetchComplete: state =>{
            state.loading = false
        }
    },
    extraReducers: builder =>{
        builder
            .addCase(ThunkFecth.pending, (state, action)=>{
                console.log('WAITING FOR REPONSE');
            })
            .addCase(ThunkFecth.fulfilled, (state, action)=>{
                state.user = action.payload
            })
    }
})

// require to use the tunk
// This is the middleware that I do not need to write
// This is a simple action constructor with the main problem that
// that at the moment of calling this function the programe must know that is a contructor
export const fetchData = async (dispatch, getState)=>{
    console.log('not pure function')
    let data = await fakeAPI()
    dispatch({type: 'user/newUser', payload: data.user})
    // dispatch(userSlice.actions.newUser(data.user))
}

export const ActionFetch = () => async(dispatch, getState)=>{
    console.log('Thunk and action creator');
    let data = await fakeAPI()
    dispatch({type: 'user/newUser', payload: data.user})
}


export const {change, clean, newUser, defaultName, fetchComplete} = userSlice.actions

export const selectUser = state => state.name.value

export default userSlice.reducer