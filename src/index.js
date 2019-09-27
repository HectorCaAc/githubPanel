import React from 'react';
import ReactDOM from 'react-dom';
import Languages from './languages.js';
import BasicData from './basic-data.js';
import {Test, PieChart} from './pie_chart';
import {Commits} from './commits.js';
import {Popularity} from './Popularity';
console.log("I want to see if this message is display at all");
ReactDOM.render(<BasicData image="nothing" />, document.getElementById('basic'))
ReactDOM.render(<PieChart/>, document.getElementById('pie-chart'))
ReactDOM.render(<Commits />, document.getElementById('commits'))
ReactDOM.render(<Popularity />, document.getElementById('popularity'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
