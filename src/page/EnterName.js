import React from 'react'
import { useDispatch } from 'react-redux'

import { newUser, defaultName } from './userSlice'
import GitHubIcon from '@material-ui/icons/GitHub'

import './EnterName.sass'

function EnterName() {

    const dispatch = useDispatch()
    const changeUser = user => dispatch(newUser(user))

    const submitUser = (event)=>{
        event.preventDefault()
        changeUser('test')
    }

    return (
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
