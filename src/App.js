import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Router, Route } from 'react-router-dom'
import history from './history'
import Menu from './Menu'
import MenuURL from './MenuURL'
import { Button } from 'antd';
import Panel from './Panel';


class App extends Component {
  render() {
    return (
      <Router history={history}>
              <Route path="/" exact render={props => (<Menu history={props.history} />)}/>
              <Route path="/url" exact render={props => (<MenuURL history={props.history} />)}/>
              <Route path="/panel" exact render={props => (<Panel history={props.history} />)}/>
      </Router>
    );
  }
}

export default App;
