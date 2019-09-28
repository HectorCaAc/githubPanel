import React from 'react';
import ReactDOM from 'react-dom';
import Languages from './languages.js';
import BasicData from './basic-data.js';
import {Test, PieChart} from './pie_chart';
import {Commits} from './commits.js';
import {Popularity} from './popularity.js';
import {Form} from './enterName.js';

class Base extends React.Component{

  constructor(props){
    super()

    this.state ={
              component_ready:false
    }

  }

  render(){
    var data ={
          picture:'https://avatars0.githubusercontent.com/u/17506593?v=4',
          bio:"THis is a really long message that will display with all the data that is required to show this data, It will really usefull when it necessary to show some really cool techinuqes that required github",
          languages:['Java','Python','HTML','CSS','Javascript','Mysql'],
          projects_languages:[],
          person:{}


    }
    return(
      <div>
      <BasicData picture={data.picture} bio={data.bio} languages={data.languages}/>
        <div className="charts">
          <div className="row">
            <div className="col">
              <PieChart/>
            </div>
            <div className="col">
              <Commits />
            </div>
            <div className="col">
              <Popularity />
            </div>
          </div>
        </div>
      </div>
    )
  }
}



console.log("I want to see if this message is display at all");
ReactDOM.render(<Base/>, document.getElementById('base'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
