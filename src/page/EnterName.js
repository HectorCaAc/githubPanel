import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { newUser, defaultName, fetchData, ActionFetch, ThunkFecth } from './userSlice'
import GitHubIcon from '@material-ui/icons/GitHub'

import store from '../store'

import './EnterName.sass'

function EnterName() {

    const currentUser = useSelector(state => state.currentUser)

    const dispatch = useDispatch()
    const changeUser = user => dispatch(newUser(user))

    const status = store.getState()
    console.log('Inside of the EnterName ');
    console.log(status);

    const submitUser = (event) => {
        event.preventDefault()
        dispatch(ThunkFecth('Hector'))
    }
    useEffect(() => {
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
                                placeholder="Only put the Github Username" />
                            <div>
                                <button type="submit">Look For User</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
}

export default EnterName
