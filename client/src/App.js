import React, { Component } from 'react';
import axios from 'axios';
// import Search from './SearchSummoner';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      summonerSearchName1: '',
      summonerSearchName2: '',
    };
  }

  handleSummonerSearchChange1 = (event) => {
    this.setState({
      summonerSearchName1: event.target.value
    })
    console.log(this.state.summonerSearchName1);
  }
  
  handleSummonerSearchChange2 = (event) => {
    this.setState({
      summonerSearchName2: event.target.value
    })
    console.log(this.state.summonerSearchName2);
  }

  keyPressSearch = (event) => {
    if (event.keyCode === 13) {
      console.log("Entered: ", event.target.value)
    }
  }

  searchSummoners = () => {
    console.log("Compare Button Pressed. Comparing:", this.state.summonerSearchName1, "vs", this.state.summonerSearchName2);
    this.componentDidMount(this.state.summonerSearchName1,  this.state.summonerSearchName2)
  }

  // Get user data
  // https://www.youtube.com/watch?v=zrVjqvavS5U

  componentDidMount = (summoner1,  summoner2) => {
    if (summoner1 !== undefined || summoner2 !== undefined) {
      axios.get('/api/summoner', {
        params: {
          summonerName1: summoner1, // this.state.summonerSearchName
          summonerName2: summoner2
        }
      })
        .then((response => this.setState({users: response.data})))
        .catch(function(error) {
          console.log('Can\'t fetch:', error.message);
        })
    }
  }

  render() {
    return (
      <div>
        <form>
          <div>
            Search for summoners:
            <input type="text" value={this.state.summonerSearchName1} onChange={this.handleSummonerSearchChange1}></input>
            <input type="text" value={this.state.summonerSearchName2} onChange={this.handleSummonerSearchChange2}></input>
            <button type="button" onClick={this.searchSummoners}>Compare!</button>
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
