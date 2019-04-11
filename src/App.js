import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Router, Route } from 'react-router-dom'
import history from './history'
import Menu from './Menu'
import Login from './Login'
import { Button } from 'antd';


class App extends Component {
  render() {
    return (
      <Router history={history}>
              <Route path="/" exact render={props => (<Menu history={props.history} />)} />
              <Route path="/login" exact render={props => (<Login history={props.history} />)} />
      </Router>
    );
  }
}

export default App;
