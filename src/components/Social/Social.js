import React from 'react'

import { useSelector } from 'react-redux'

import GroupIcon from "@material-ui/icons/Group"
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk'
import BusinessIcon from '@material-ui/icons/Business'
import PlaceIcon from '@material-ui/icons/Place'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import GitHubIcon from '@material-ui/icons/GitHub'

import './Social.sass'
import '../styles/Card.sass'

const Social = (props) => {

    let user = useSelector(data => data.currentUser)
    
    
    return (
        <div className="SmallCard">
            <div className="Header">Social Information</div>
            <div className="Social">
                <div className="Social_entry"><GroupIcon/>{user.followers}</div>
                <div className="Social_entry"><DirectionsWalkIcon/>{user.following}</div>
                <div className="Social_entry"><BusinessIcon/>{user.company}</div>
                <div className="Social_entry"><PlaceIcon/>{user.location}</div>
                <div className="Social_entry"><BusinessCenterIcon/>{user.hireable}</div>
                <div className="Social_entry"><GitHubIcon/>{user.publicRepose}</div>
            </div>
        </div>
    )
}

export default Social