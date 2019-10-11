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
  const pushes =[
                //every array is the enty for the whole data
    [ //JAVA it will be project
      {x:'project1',y:2},
      {x:'day 2',y:6},
      {x:'day 3',y:2},
      {x:'day 4',y:6},
      {x:'day 5',y:2},
      {x:'day 6',y:6}
    ],
    [ // PYTHON
      {x:'project1',y:1},
      {x:'day 2',y:2},
      {x:'day 3',y:3},
      {x:'day 4',y:4},
      {x:'day 5',y:5},
      {x:'day 6',y:6}
    ],
    [ //CSS
      {x:'project1',y:7},
      {x:'day 2',y:14},
      {x:'day 3',y:18},
      {x:'day 4',y:10},
      {x:'day 5',y:7},
      {x:'day 6',y:12}
    ],
    [ //Javascript
      {x:'project1',y:20},
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

  var color = pushes.map(()=>getRandomColor())

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
