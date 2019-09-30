import React from 'react';
import style from './css/basic-data.css'
import {VictoryStack, VictoryAxis,
        VictoryChart, VictoryBar} from 'victory';

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


export function Commits(){
  const pushes =[
                //every array is the enty for the whole data
    [ //JAVA
      {x:'day 1',y:2},
      {x:'day 2',y:6},
      {x:'day 3',y:2},
      {x:'day 4',y:6},
      {x:'day 5',y:2},
      {x:'day 6',y:6}
    ],
    [ // PYTHON
      {x:'day 1',y:1},
      {x:'day 2',y:2},
      {x:'day 3',y:3},
      {x:'day 4',y:4},
      {x:'day 5',y:5},
      {x:'day 6',y:6}
    ],
    [ //CSS
      {x:'day 1',y:7},
      {x:'day 2',y:14},
      {x:'day 3',y:18},
      {x:'day 4',y:10},
      {x:'day 5',y:7},
      {x:'day 6',y:12}
    ],
    [ //Javascript
      {x:'day 1',y:20},
      {x:'day 2',y:15},
      {x:'day 3',y:5},
      {x:'day 4',y:0},
      {x:'day 5',y:16},
      {x:'day 6',y:15}
    ],
  ]

  //Function use to transform data into 100%
  const totals = pushes[0].map((data, i) => {
    return pushes.reduce((memo, curr) => {
      return memo + curr[i].y;
    }, 0);
  });
  var percentage_list =  pushes.map((data) => {
    return data.map((datum, i) => {
      return { x: datum.x, y: (datum.y / totals[i]) * 100 };
    });
  });

  // var color=["black","blue","tomato","green"]
  var color = pushes.map(()=>getRandomColor())

  return(
    <div className={style.charts}>
      <h3>Commits Realise by user </h3>
      <VictoryChart height={400} width={400}
        domainPadding={{ x: 30, y: 20 }}>
          <VictoryStack
            colorScale={color}>

            {percentage_list.map((data, i) => {
              return <VictoryBar data={data} key={i}/>;
            })}
          </VictoryStack>
          <VictoryAxis dependentAxis
            tickFormat={(tick) => `${tick}%`}/>
          <VictoryAxis
          tickFormat={["day 1", "day 2", "day 3", "day 4", "day 5"]}/>
      </VictoryChart>
      <h6> Add lables to the bars to know what is what</h6>
    </div>
  )

}
