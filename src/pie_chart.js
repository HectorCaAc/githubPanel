import React, { useState, useEffect } from 'react';
import './css/basic-data.css';
import { VictoryPie, VictoryLabel, VictoryTooltip } from 'victory';

export function PieChart(props) {
  let data = []
  props.data.forEach((value, key) => {
    data.push({ x: key, y: value.length })
  })
  console.log("Inside of the pieChart");
  console.log(data);
  
  return (
    <div className="charts">
      <h3>Languages used by the user</h3>
      <VictoryPie
        style={{ labels: { fill: "white" } }}
        innerRadius={100}
        labelRadius={120}
        labels={({ datum }) => `${datum.x}`}
        labelComponent={<CustomLabel />}
        data={data}
      />
    </div>
  )
}

// IF I wanted to customise the Label to show more data, it will required
// to create a react component that extends from the VictoryLabel, and
// start to play with the output until it gets there
class CustomLabel extends React.Component {

  render() {
    
    let copy = {...this.props}
    let text = copy['text']
    let correct_description = copy['slice']['value'] === 1 ? 'project': 'projects'
    let number_projects = `${copy['slice']['value']} ${correct_description} using ${text}`
    copy['text'] = number_projects
    console.log("inside of the customLable");
    console.log(copy);

    return (
      <g>
        <VictoryLabel {...this.props} />
        <VictoryTooltip
          {...copy}
          x={200} y={250}
          orientation="top"
          pointerLength={0}
          cornerRadius={50}
          flyoutWidth={100}
          flyoutHeight={100}
          flyoutStyle={{ fill: "black" }}
        />
      </g>
    );
  }
}

CustomLabel.defaultEvents = VictoryTooltip.defaultEvents;


function HectorLabel(props) {
  return (
    <g>
      <VictoryLabel {...props} />
      <VictoryTooltip
        {...props}
        x={200} y={250}
        orientation="top"
        pointerLength={0}
        cornerRadius={50}
        flyoutWidth={100}
        flyoutHeight={100}
        flyoutStyle={{ fill: "black" }}
      />
    </g>
  );
}
