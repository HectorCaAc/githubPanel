import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { change } from '../../page/userSlice'

import AddBoxIcon from '@material-ui/icons/AddBox'

import './Navbar.sass'

function Navbar() {

    const dispatch = useDispatch()

    return (
        <div className="Navbar">
            <div className="Navbar_new_user"
                onClick={()=> dispatch(change())}
            >
                <AddBoxIcon fontSize="large"/>
                <div className="description">
                    Enter a new User
                </div>
            </div>
            <div className="Navbar_logo">
                Github.hacasoftware.com
                <div className="Headline createBy">
                    Created by Hector Acosta
                </div>
            </div>
            
        </div>
    )
}

export default Navbar
