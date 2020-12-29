import React from 'react'

import AddBoxIcon from '@material-ui/icons/AddBox'

import './Navbar.sass'

function Navbar() {
    return (
        <div className="Navbar">
            <div className="Navbar_new_user">
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
