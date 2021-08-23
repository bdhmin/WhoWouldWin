import React, { Component } from 'react';
import './search.css'
import Waves from '../../assets/waves-4.svg'
import axios from 'axios';
import { Link } from 'react-router-dom';

class Search extends Component {
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
    // console.log(this.state.summonerSearchName1);
  }
  
  handleSummonerSearchChange2 = (event) => {
    this.setState({
      summonerSearchName2: event.target.value
    })
    // console.log(this.state.summonerSearchName2);
  }

  keyPressSearch = (event) => {
    if (event.keyCode === 13) {
      // console.log("Entered: ", event.target.value);
      this.searchSummoners();
    }
  }

  searchSummoners = () => {
    // Goal: Api call is made, but routes to player 1v1 page with query params

    // console.log("Compare Button Pressed. Comparing:", this.state.summonerSearchName1, "vs", this.state.summonerSearchName2);
    this.searchRedirect();
    // useHistory().push('/duel/summonerName=' + this.state.summonerSearchName2 + '&' + this.state.summonerSearchName2);
    // this.componentDidMount(this.state.summonerSearchName1,  this.state.summonerSearchName2)
  }

  // searchRedirect = () => {
  //   if (this.state.summonerSearchName2 !== '' && this.state.summonerSearchName2 !== '') {
  //     console.log("Routing", this.state.summonerSearchName1, "and", this.state.summonerSearchName2);
  //     return (
  //       <Redirect
  //         exact from="/"
  //         to={'/duel/summonerName=' + this.state.summonerSearchName1 + '&' + this.state.summonerSearchName2}
  //       />
  //     )
  //   }
  // }

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
      <div className="search">
        <img className="waves" src={Waves} alt="Waves" viewBox="0 0 960 540"/>
        <div className="search-content">
          <div className="title">
            Who Would Win?
          </div>
          <form className="form">
            <div>
              {/* <div className="form-title">
                Search two summoners!
              </div> */}
              <input className="textbox" type="text" value={this.state.summonerSearchName1} onChange={this.handleSummonerSearchChange1}></input>
              <input className="textbox" type="text" value={this.state.summonerSearchName2} onChange={this.handleSummonerSearchChange2}></input>
              {/* <Link to={'/duel/summonerName=${this.state.summonerSearchName1}&${this.state.summonerSearchName2}'}>Duel!</Link> */}
              {/* <button type="button" onClick={this.searchSummoners} >Compare!</button> */}
              {/* <button type="button" onClick={routeSearch()}>Duel!</button> */}
              <Link className="duel-button" to={'/duel/summonerNames=' + encodeURIComponent(this.state.summonerSearchName1) + '&' + encodeURIComponent(this.state.summonerSearchName2)}>Duel!</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;