import React, {useState, useEffect} from 'react';
import style from './css/basic-data.css'
import {VictoryPie, VictoryLabel, VictoryTooltip} from 'victory';

export function Test(){

  /*
    TODO:  It will required to add the localStorage functionality
      to store the languages, such in the future the user would not
      have to make all the requests again, ( It could over use the
      languages of the user , the key will be the username, which
      will allow to register user in different parts  )

      Also If I dont add the authentication system that could be used
      for getting many requests, then I should add some logic that
      which if the answer is not enough data then display
      a title with the time required until the system is in use again
  */
  const [list, setList] = useState([0])
  var repositories = 'https://api.github.com/users/HectorCaAc/repos'
  var projects = 'https://api.github.com/repos/HectorCaAc/'
  var links = []
  var data_array = []
    // Outside of the if statement
    console.log(list);
    var languages_object = []
    var languages = []
    var elements = list.map((entry, index) =>{
        return(
            <div  key={index}>
                { entry.language }
            </div>
        )
    })

    return (<div>
            {elements}
          </div>
      )
    }


export function PieChart(props){
  
  var data = [
    {x: "java", y:10},
    {x: "css", y:10},
    {x: "Python", y:15},
    {x: "javascript", y:15},
    {x: "Html", y:50}
  ]
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
