import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import store from './store'

import Home from './page/home'
import EnterName from './page/EnterName'


ReactDOM.render(<Provider store={store}><Home /></Provider>, document.getElementById('base'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
