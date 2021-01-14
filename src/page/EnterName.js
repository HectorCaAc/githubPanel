import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setUserStorage, defaultName, fetchData, ActionFetch, ThunkFecth } from './userSlice'
import GitHubIcon from '@material-ui/icons/GitHub'

import store from '../store'

import './EnterName.sass'

function EnterName() {

    const currentUser = useSelector(state => state.currentUser)
    const [user, setUser] = useState('')
    const [previousData, setPrevious] = useState('')
    const [buttonPreviousData, setPreviousData] = useState(false)

    const dispatch = useDispatch()
    const changeUser = user => dispatch(newUser(user))

    const status = store.getState()

    const readLocalStorage = () =>{
        let data = localStorage.getItem("API")
        if(data){
            let user = JSON.parse(data)
            return user.user
        }
        return null
    }

    const usePreviousUser = ()=>{
        let user = JSON.parse(localStorage.getItem("API"))
        dispatch(setUserStorage(user))
    }

    const submitUser = (event) => {
        event.preventDefault()
        dispatch(ThunkFecth(user))
    }

    const enterName = (e)=>{
        setUser(e.target.value)
    }

    useEffect(() => {
        let previousQuery = readLocalStorage()
        if(previousQuery){
            setPrevious(previousQuery)
            setPreviousData(true)
        }
    }, [])

    return currentUser.loading ? (
        < div >
            State Loading
        </div >) : (
            <div className="EnterName">
                <div className="EnterName_Form">
                    <GitHubIcon style={{ fontSize: 60 }} />
                    <div className="Instructions">
                        <h3>Enter the Name of the user you want to get data From</h3>
                        <form onSubmit={submitUser}>
                            <input type="text" name="Username" id="Username"
                                onChange={enterName} value={user}
                                placeholder="Only put the Github Username" />
                            <div>
                                <button className="first_button" type="submit">Look For User</button>
                            </div>
                        </form>
                        {buttonPreviousData && <div className="optionUser">
                            <h4>Other user found</h4>
                            <button onClick={usePreviousUser} className="other_button">
                                {previousData}
                            </button>
                        </div> }
                    </div>
                </div>
            </div>
        )
}

export default EnterName
