import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      summonerName: ''
    }
  }

  handleSummonerNameChange = (event) => {
    this.setState({
      summonerName: event.target.value
    })
    console.log(this.state.summonerName);
  }

  render() {
    return (
      <form>
        <div>
          Search for a summoner:
          <input type="text" value={this.state.summonerName} onChange={this.handleSummonerNameChange}></input>
        </div>
      </form>
    )
  }
}

export default Search;
