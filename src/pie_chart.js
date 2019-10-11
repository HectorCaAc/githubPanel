import React, {useState, useEffect} from 'react';
import style from './css/basic-data.css'
import {VictoryPie, VictoryLabel, VictoryTooltip} from 'victory';

export function PieChart(props){
  let data =[]
  props.data.forEach((value, key)=>{
                    data.push({x:key,y:value.length})
  })
  return(
    <div className={style.charts}>
      <h3>Languages used by the user </h3>
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
    return (
      <g>
        <VictoryLabel {...this.props}/>
        <VictoryTooltip
          {...this.props}
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


function HectorLabel(props){
  return (
    <g>
      <VictoryLabel {...props}/>
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
