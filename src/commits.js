import React from 'react';
import style from './css/basic-data.css'
import {VictoryStack, VictoryAxis,
        VictoryChart, VictoryBar, Bar} from 'victory';

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function Commits(props){
  let chart_style = {
        data:{ fill:getRandomColor()},
        labels:{fontsize:15}
  }
  return(
  <div className={style.charts}>
      <h3>Number of commits per project</h3>
         <VictoryChart height={400} width={600}
           domainPadding={{ x: 50, y: [0, 20] }}
           scale={{ x: "linear" }} >
           <VictoryBar
             style={chart_style}
             data={props.data}
           />
         </VictoryChart>
       </div>
  )

}
