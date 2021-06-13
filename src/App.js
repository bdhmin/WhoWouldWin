import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
      users: [],
    };
  }
  componentDidMount() {
    axios.get('http://localhost:4000/user')
      .then((response => this.setState({users: response.data})))
      .catch(function(error) {
        console.log('Can\'t fetch:', error.message);
      })
    // fetch('http://localhost:4000/user')
    //   .then(res => res.json())
    //   .then(user => this.setState({user}, () => console.log('Users fetched...', user)));
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

  // componentDidMount() {
  //   axios.get('/user')
  //     .then(response => this.setState({users: response.data}))
  //     .catch(function(error) {
  //       console.log('Can\'t fetch:',  error.message);
  //     })

  //   // fetch('/user')
  //   //   .then(response => response.json()) // converts API to json format
  //   //   .then(users => this.setState({users}, () => console.log('Users fetched:', users)));

  // }

  // render() {

  //   // return (
  //   //   <div>
  //   //     <h2>Users</h2>
  //   //     <div>{this.state.users}</div>
  //   //   </div>
  //   // )

  //   const users = this.state.users;
  //   if (users === null) {
  //     return <div>Loading...</div>;
  //   }
  //   return <div>{users[0]}</div>

  //   // if (this.state.loading || !this.state.data) {
  //   //   return <div>Loading...</div>
  //   // }
  //   // else {
  //   //   return <div>Data loaded!!!</div>
  //   // }

  //   // Access properties inside state in constructor
  //   // var { isLoaded, items } = this.state;

  //   // if (!isLoaded) {
  //   //   return <div>Loading data...</div>;
  //   // }
  //   // else {
  //   //   return (
  //   //     <div className="App">
  //   //       <span>Data has loaded</span>
  
  //   //     </div>
  //   //   )
  //   // }

  // }

}

export default App;
