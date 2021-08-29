import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="list">
          <a href="https://bryanmin.me/" target="_blank" rel="noreferrer">
            Bryan Min
          </a>
        </div>
      </div>
    )
  }
}

export default Navbar;