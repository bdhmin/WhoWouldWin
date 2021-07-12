import React, { Component } from 'react';

class SearchS extends Component {
  constructor(props) {
    super(props)

    this.state = {
      summonerSearchName: ''
    }
  }

  handleSummonerSearchChange = (event) => {
    this.setState({
      summonerSearchName: event.target.value
    })
    console.log(this.state.summonerSearchName);
  }

  render() {
    return (
      <form>
        <div>
          Search for a summoner:
          <input type="text" value={this.state.summonerSearchName} onChange={this.handleSummonerSearchChange}></input>
        </div>
      </form>
    )
  }
}

export default SearchS;
