import { configureStore } from '@reduxjs/toolkit'
import { change, clean, fetchData } from './page/userSlice'

import userReducer from './page/userSlice'
import pieReducer from './page/pieSlice'

// It will read data and convert it to the necessary format
// Things that will store The programing languages
/*
Objects store in the store 
{
    currentUser:{
        bio:
        company:
        followers:
        following:
        hireable:
        location:
        picture:
        publicRepose:
        loading:
        user:
    },
    languages:{
        language{
            appear: amount,
            visible: Boolean
        }
    },
    commits: [
        {name_project: y: (commits)}
    ]
}
*/

const readLocalStorage = () => {
    if (localStorage.getItem('API')) {

    }
}

const preloadedState = {
    currentUser: {
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
    // pie: {
    //     projects: {
    //         'JavaScript': [ "githubPanel", "PB", "PostApp"],
    //     },
    // } 
    // commits: [
    //     {name_project: {
    //         y: 10
    //         }
    //     }
    // ]
}


export default configureStore({
    reducer: {
        currentUser: userReducer,
        // pie: pieReducer
    },
    preloadedState
})