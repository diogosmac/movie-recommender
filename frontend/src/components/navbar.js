import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Logout from './logout';

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = { logged: (localStorage.getItem('token') !== null) }

    this.trigger = this.trigger.bind(this);
    this.auth = this.auth.bind(this);
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
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">TPMDb (Team Project Movie Database)</Link>
        <div className="collapse navbar-collapse">
          {localStorage.getItem('token') !== null ?
            <this.auth />
            :
            <this.unauth />
          }
        </div>
      </nav>
    )
  }

}

// function Unauth() {
//   return (
//     <ul className="navbar-nav mr-auto">
//       <li className="navbar-item">
//         <Link to="/signup" className="nav-link">
//           Register
//         </Link>
//       </li>
//       <li className="navbar-item">
//         <Link to="/signin" className="nav-link">
//           Login
//         </Link>
//       </li>
//     </ul>
//   );
// }

// function trigger() {
//   if (this.state.logged !== (localStorage.getItem('token') !== null))
//     this.setState({ logged: !this.state.logged })
// }

// function Auth() {
//   return (
//     <ul className="navbar-nav mr-auto">
//       <li className="navbar-item">
//         <Link to="/profile" className="nav-link">
//           Profile
//         </Link>
//       </li>
//       <li className="navbar-item">
//         <Logout trigger={trigger()} />
//       </li>
//     </ul>
//   );
// }

// function Navbar() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <Link to="/" className="navbar-brand">TPMDb (Team Project Movie Database)</Link>
//       <div className="collapse navbar-collapse">
//         {localStorage.getItem('token') !== null ?
//           <Auth />
//           :
//           <Unauth />
//         }
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
