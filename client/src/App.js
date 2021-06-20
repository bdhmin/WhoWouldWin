import React, { Component } from 'react';
import axios from 'axios';
// import Search from './SearchSummoner';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      summonerSearchName: '',
    };
  }

  handleSummonerSearchChange = (event) => {
    this.setState({
      summonerSearchName: event.target.value
    })
    console.log(this.state.summonerSearchName);
  }

  keyPressSearch = (event) => {
    if (event.keyCode === 13) {
      console.log("Entered: ", event.target.value)
    }
  }

  // Get user data
  // https://www.youtube.com/watch?v=zrVjqvavS5U

  componentDidMount() {
    axios.get('/api/summoner', {
      params: {
        summonerName: "newbro64", // this.state.summonerSearchName
        summonerName2: "s3b0"
      }
    })
      .then((response => this.setState({users: response.data})))
      .catch(function(error) {
        console.log('Can\'t fetch:', error.message);
      })
  }

  render() {
    return (
      <div>
        <form>
          <div>
            Search for a summoner:
            <input type="text" value={this.state.summonerSearchName} onKeyDown={this.keyPressSearch} onChange={this.handleSummonerSearchChange}></input>
          </div>
        </form>

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
