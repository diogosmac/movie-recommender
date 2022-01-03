import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'
import SignUp from './components/register';
import LogIn from './components/login';
import moviepage from "./components/moviepage"


function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">App</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Users</Link>
              </li>
              <li className="navbar-item">
                <Link to="/signup" className="nav-link">Register</Link>
              </li>
              <li className="navbar-item">
                <Link to="/signin" className="nav-link">Login</Link>
              </li>
            </ul>
          </div>
        </nav>

        <br/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/signin" component={LogIn}/>
        <Route path="/" exact component={moviepage}/>
      </div>
    </Router>
  );
}

export default App;
