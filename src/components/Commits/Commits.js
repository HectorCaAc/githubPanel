import React from 'react'
import { useSelector } from 'react-redux'
import {
    VictoryStack, VictoryAxis,
    VictoryChart, VictoryBar, Bar
} from 'victory';

import CommitsDELETELATER from '../Helpers/GetData'


import './Commits.sass'
import '../styles/Card.sass'


function CommitsWrapper() {

    let user = useSelector(data => data.currentUser)
    let commits = user.projects

    return (
        <div className="SmallCard">
            <div className="Header">Commits To Different Projects</div>
            <Commits data={commits} />
        </div>
    )
}

let ColorKeys = (props) => {
    return (
        <div className="Legend">
            Name of the projects
            <div className="LegendList">
                {props.data.map((language, key) =>
                    <div key={key} className="LegentItems">
                        <div style={{
                            height: '20px', width: '20px',
                            backgroundColor: language.fill,
                            borderStyle: 'solid',
                            display: 'inline-block'
                        }}></div>
                        {language.name} 
                    </div>)}
            </div>
        </div>
    )
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function Commits(props) {

    let adding_attribute = props.data.map((entry, key) => {
        let newEntry = {...entry}
        newEntry.fill = getRandomColor()
        newEntry.x = key + 1
        return newEntry
    })

    return (
        <div className="Commits">
            <VictoryChart
                domain={{ x: [0, 10], y: [0, 30] }}
                scale={{ x: "linear" }}
                domainPadding={{ x: 50 }}>
                <VictoryBar
                    padding={40}
                    style={{
                        data: {
                            fill: data => data.datum.fill
                        }
                    }}
                    data={adding_attribute}
                />
            </VictoryChart>
            <ColorKeys data={adding_attribute} />
        </div>
    )
}

export default CommitsWrapper
