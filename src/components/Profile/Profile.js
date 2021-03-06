import React from 'react'
import { useSelector } from 'react-redux'
// import Crop32Icon from '@material-ui/icons/Crop32'
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import '../styles/Card.sass'
import './profile.sass'

// This will get data from the redux, but for now just get dummy data
export default function Profile() {
    let user = useSelector(data => data.currentUser)
    let languages = user.languages
    let bio = user.bio

    let pills = languages.map((entry, key) =>{
        let language = entry.name
        let icon = language.visible ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>
        return (
            <span key={key}>
                {icon}
                {language}
            </span>
        )
    })

    return (
        <div className="SmallCard">
            <div className="Header">
                {user.user}
                <div className="picture">Picture Holder</div>
            </div>
            Programing Languages
            <div className="Profile_Languages">
                {pills}
            </div>
            <div className="Footer">
                <div className="Headline">Bio</div>
                {bio}
            </div>
        </div>
    )
}
