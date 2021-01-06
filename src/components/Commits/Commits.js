import React from 'react'
import {
    VictoryStack, VictoryAxis,
    VictoryChart, VictoryBar, Bar
} from 'victory';

import CommitsDELETELATER from '../Helpers/GetData'


import './Commits.sass'
import '../styles/Card.sass'


function CommitsWrapper() {

    let DataPieDataWrapper = CommitsDELETELATER()
    console.log('data for the commits');
    console.log(DataPieDataWrapper.get('commits_data'));

    return (
        <div className="SmallCard">
            <div className="Header">Commits To Different Projects</div>
            <Commits data={DataPieDataWrapper.get('commits_data')} />
        </div>
    )
}

let ColorKeys = (props) => {
    return (
        <div className="Legend">
            Name of the projects
            <div className="LegendList">
                {props.projects.map((language, key) =>
                    <div key={key} className="LegentItems">
                        <div style={{
                            height: '20px', width: '20px',
                            backgroundColor: language.fill,
                            borderStyle: 'solid',
                            display: 'inline-block'
                        }}> </div>
                        {language.name_project}
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
        entry.fill = getRandomColor()
        entry.x = key + 1
        return entry
    }
    )
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
            <ColorKeys projects={adding_attribute} />
        </div>
    )
}

export default CommitsWrapper
