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
  //Function use to transform data into 100%
  // const totals = props.data[0].map((data, i) => {
  //   return props.data((memo, curr) => {
  //     return memo + curr[i].y;
  //   }, 0);
  // });
  // var percentage_list =  props.data.map((data) => {
  //   return data.map((datum, i) => {
  //     return { x: datum.x, y: (datum.y / totals[i]) * 100 };
  //   });
  // });
  //
  // var color = props.data.map(()=>getRandomColor())

  return(
  <div className={style.charts}>
      <h3>Number of commits per project</h3>
         <VictoryChart height={400} width={600}
           domainPadding={{ x: 50, y: [0, 20] }}
           scale={{ x: "linear" }} >
           <VictoryBar
             dataComponent={
               <Bar/>
             }
             data={props.data}
           />
         </VictoryChart>
       </div>
  )

}
