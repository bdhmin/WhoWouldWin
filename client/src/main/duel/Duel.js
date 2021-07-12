import React, { Component } from 'react';
import axios from 'axios';

class Duel extends Component {
  constructor() {
    super();
    this.state = {
      summoner1: undefined,
      summoner2: undefined,
    }
  }

  componentDidMount = () => {
    const summoner1 = decodeURIComponent(this.props.match.params.summonerNames.split('summonerNames=')[1].split('&')[0]);
    const summoner2 = decodeURIComponent(this.props.match.params.summonerNames.split('summonerNames=')[1].split('&')[1]);

    console.log("ComponentDidMount:", summoner1, summoner2);

    if (summoner1 !== undefined || summoner2 !== undefined) {
      axios.get('/api/summoners', {
        params: {
          summonerName1: summoner1, // this.state.summonerSearchName
          summonerName2: summoner2,
        }
      })
      .then((response => this.setState({
        summoner1: response.data[0],
        summoner2: response.data[1],
      }, () => {
        console.log("After setState:", this.state);
      })))
      .catch(function(error) {
        console.log('Can\'t fetch:', error.message);
      })
    }

    console.log("State stuff", this.state.summoner1)
  }

  render() {
    const summonerNames = this.props.match.params.summonerNames.split('summonerNames=')[1].split('&');
    console.log(summonerNames);

    // console.log('summoner1:', this.state.summoner1);
    if (this.state.summoner1 === undefined) {
      return (
        <div>Loading Summoners...</div>
      )
    } else {
      return (
        <div>
          <p>Duel works!</p>
          <p>{ this.state.summoner1.name } vs { this.state.summoner2.name }</p>
          <p>Lv { this.state.summoner1.summonerLevel}, Lv { this.state.summoner2.summonerLevel}</p>
        </div>
      )
    }
  }
}

// Class for summoner data
export class SummonerStats {
  summonerName;
  
}

export default Duel;