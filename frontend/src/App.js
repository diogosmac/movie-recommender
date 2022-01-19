import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

// import UsersList from './components/users-list.component'
// import CreateUser from './components/create-user.component'
import SignUp from './components/register';
import LogIn from './components/login';
import MoviePage from './components/moviepage';
import DetailPage from './components/DetailPage';
import SearchPage from './components/SearchPage';
import Profile from './components/profile'
import Navbar from './components/navbar';
import Recommendations from './components/Recommendations';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={MoviePage} />
        <Route path="/recommendations" exact component={Recommendations} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={LogIn} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/search/:query" exact component={SearchPage} />
        <Route exact path="/movie/details/:id" component={DetailPage} />
      </div >
    </Router >
  );
}

export default App;
