import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Navbar from './main/navbar/Navbar';
import Search from './main/search/Search';
import Duel from './main/duel/Duel';

import './App.css';

function App() {
  return (
    <div>
      <Router>
        {/* <Navbar /> */}
        <Switch>
          <Route exact path="/" component={Search}/>
          <Route exact path="/duel/:summonerNames" component={Duel}/>

        </Switch>
      </Router>
    </div>

    
  )
}

export default App;
