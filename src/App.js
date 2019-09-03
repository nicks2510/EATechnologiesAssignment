import React from 'react';
import './App.css';
import Home from './Components/Home';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import OverView from './Components/OverView'


function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route exact path="/employeeOverview/:ename" component={OverView} />
        </Switch>
    </Router>
  );
}

export default App;
