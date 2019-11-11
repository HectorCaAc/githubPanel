import React from 'react';
import style from './css/basic-data.css'
import {VictoryStack, VictoryAxis,
        VictoryChart, VictoryBar, Bar} from 'victory';

/*
  THINGS TO DO :
    When the number of projects is rellay low and put the data inside of
    indiviaul column, then the data is not display right
*/
let ColorKeys = (props) => {
  return(
    <div style={{backgroundColor: '#d5c7bc',
                marginTop: '5%',
                marginBottom: '5%',
                marginRight: '5%'}}>
      <h3>Name of the projects</h3>
      {props.projects.map((language,key)=>
                        <div key={key}>
                              <div style={{height:'20px', width: '20px',
                                          backgroundColor: language.fill,
                                          borderStyle: 'solid',
                                          display:'inline-block'}}> </div>
                              {language.name_project}
                            </div>)}
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

export function Commits(props){
  let adding_attribute = props.data.map((entry, key)=>{
                                entry.fill = getRandomColor()
                                entry.x = key+1
                                return entry
                              }
                            )
  return(
    <div className={style.charts}>
      <h2 >Projects</h2>
      <div className={"row"}>
          <div className="col">
             <VictoryChart
               domain={{x:[0,10],y:[0,30]}}
               scale={{ x: "linear" }}
               domainPadding={{x:50}}>
               <VictoryBar
                padding={40}
                 style={{
                          data:{
                            fill: data=>data.datum.fill }
                        }}
                 data={adding_attribute}
               />
             </VictoryChart>
         </div>
         <div className="col">
           <ColorKeys projects={adding_attribute} />
         </div>
       </div>
   </div>
  )

}
