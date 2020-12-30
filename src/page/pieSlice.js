import { createSlice } from '@reduxjs/toolkit'

import pieDataDELETELATER from '../components/Helpers/GetData'

var pieChart = new Map()

let test = pieDataDELETELATER().get('pie_data')
console.log(test)

let initialState = {
    languages: {
        'JavaScript': [ "githubPanel", "PB", "PostApp"],
        'HTML':[ "githubPanel", "HectorCaAc.github.io", "PB"],
        'CSS': ["githubPanel", "PB", "PostApp"],
        'Java': ["Monto", "PB" ],
        'Python':[ "PostApp" ],
    },
    foreal: ['test']
}

export const pieSlice = createSlice({
    name: 'pie',
    initialState,
    reducers: {}
})

export const selectPie = state => state.name.value

export default pieSlice.reducer