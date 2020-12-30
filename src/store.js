import { configureStore } from '@reduxjs/toolkit'
import { change, clean, fetchData } from './page/userSlice'

import userReducer from './page/userSlice'
import pieReducer from './page/pieSlice'

export default configureStore({
    reducer: {
        currentUser: userReducer,
        pie: pieReducer
    }
})