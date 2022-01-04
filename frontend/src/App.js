import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

// import UsersList from './components/users-list.component'
// import CreateUser from './components/create-user.component'
import SignUp from './components/register';
import LogIn from './components/login';
import moviepage from "./components/moviepage"
import DetailPage from './components/DetailPage';
import Profile from './components/profile'
import Navbar from './components/navbar';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={LogIn} />
        <Route path="/" exact component={moviepage} />
        <Route path="/profile" exact component={Profile} />
        <Route exact path="/movie/:id" component={DetailPage} />
      </div >
    </Router >
  );
}

export default App;
