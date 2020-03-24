import React from 'react';
import './css_folder/basic-data.css'
import {
  VictoryStack, VictoryAxis,
  VictoryChart, VictoryBar, Bar
} from 'victory';

/*
  THINGS TO DO :
    When the number of projects is rellay low and put the data inside of
    indiviaul column, then the data is not display right
*/
let ColorKeys = (props) => {
  return (
    <div className="commits">
      <h3>Name of the projects</h3>
      <div className="row">
        {props.projects.map((language, key) =>
            <div key={key} className="col-lg-6">
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
    <div className="charts">
      <h3>Projects</h3>
      <div className={"row"}>
        <div className="col-lg-6">
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
        </div>
        <div className="col-lg-6">
          <ColorKeys projects={adding_attribute} />
        </div>
      </div>
    </div>
  )

}
