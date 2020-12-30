import React from 'react'

import GroupIcon from "@material-ui/icons/Group"
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk'
import BusinessIcon from '@material-ui/icons/Business'
import PlaceIcon from '@material-ui/icons/Place'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import GitHubIcon from '@material-ui/icons/GitHub'

import './Social.sass'
import '../styles/Card.sass'

const Social = (props) => {
    let data = new Map()
    data.set('Followers', 1)
    data.set('Following', 2)
    data.set('CurrentCompany', 'No Company')
    data.set('Location', 'Lincoln Ne ')
    data.set('Hireable', 'No Hireable')
    data.set('PublicRepost', 8)
    return (
        <div className="SmallCard">
            <div className="Header">Social Information</div>
            <div className="Social">
                <div className="Social_entry"><GroupIcon/>{data.get('Followers')}</div>
                <div className="Social_entry"><DirectionsWalkIcon/>{data.get('Following')}</div>
                <div className="Social_entry"><BusinessIcon/>{data.get('CurrentCompany')}</div>
                <div className="Social_entry"><PlaceIcon/>{data.get('Location')}</div>
                <div className="Social_entry"><BusinessCenterIcon/>{data.get('Hireable')}</div>
                <div className="Social_entry"><GitHubIcon/>{data.get('PublicRepost')}</div>
            </div>
        </div>
    )
}

export default Social