import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router'
import "bootstrap/dist/css/bootstrap.min.css"

import Logout from './logout';

import '../styles/navbar.css'

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logged: (localStorage.getItem('token') !== null),
      search: '',
      searchGo: false
    }

    this.trigger = this.trigger.bind(this);
    this.auth = this.auth.bind(this);
  }

  updateState = event => {
    this.setState({ search: event.target.value })
  }

  routeChange = () => {
    this.setState({ searchGo: true })
  }

  unauth() {
    return (
      <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
          <Link to="/signup" className="nav-link">
            Register
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/signin" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    )
  }

  trigger() {
    if (this.state.logged !== (localStorage.getItem('token') !== null))
      this.setState({ logged: !this.state.logged })
  }

  auth() {
    return (
      <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </li>
        <li className="navbar-item">
          <Logout triggerNavbar={this.trigger} />
        </li>
      </ul>
    )
  }

  render() {
    if (this.state.searchGo) {
      this.setState({ search: '', searchGo: false })
      return <Redirect to={'/search/' + this.state.search} />;
    }
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse">
          <Link to="/" className="navbar-brand">ASEMDb (ASE Movie Database)</Link>
          {localStorage.getItem('token') !== null ?
            <this.auth />
            :
            <this.unauth />
          }
        </div>
        <div className="search-bar">
          <label htmlFor="header-search">
            <span className="visually-hidden">Search Movie by Name</span>
          </label>
          <input
            value={this.state.search}
            onChange={this.updateState}
            type="text"
            id="header-search"
            placeholder="Search Movie by Name"
            name="s"
          />
          <button onClick={this.routeChange}>&nbsp;Go!&nbsp;</button>
        </div>
      </nav>
    )
  }
}
