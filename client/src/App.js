import React, { Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }
  componentDidMount() {
    axios.get('/api/summoner')
      .then((response => this.setState({users: response.data})))
      .catch(function(error) {
        console.log('Can\'t fetch:', error.message);
      })
  }

  render() {
    return (
      <div>
        <h2>Users</h2>
        <ul>
        {this.state.users.map(user => 
          <li key={user.id}>{user.name}, Level {user.summonerLevel}</li>
        )}
        </ul>
      </div>
    );
  }
}

export default App;
