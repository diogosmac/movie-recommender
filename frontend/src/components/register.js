import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import { useState } from "react";
import axios from "axios"

import Select from "react-select";
import countryList from "react-select-country-list";
import { genresList } from "../utils/genres";

import "../styles/register-login.css"

export default class register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      country: "",
      genres: new Array(genresList.length).fill(false),
      age: 0,
      liked_genres: [],
      liked_movies: [],
    };

    this.countryOptions = countryList().getData();


    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }

  onChangeGenres = (position) => {
      let newGenres = this.state.genres;
      newGenres[position] = !this.state.genres[position]
    this.setState({genres: newGenres
    })
    console.log(this.state.genres)
    }

  onChangeName(event) {
    this.setState({ name: event.target.value });
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }
  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }
  onChangeAge(event) {
    this.setState({ age: event.target.value });
  }
  onChangeCountry = value => {
    this.setState({ country: value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      country: this.state.country,
      genres: this.state.genres,
      age: this.state.age,
      liked_genres: this.state.liked_genres,
      liked_movies: this.state.liked_movies,
    };

    this.setState({
      name: "",
      email: "",
      password: "",
      country: "",
      genres: new Array(genresList.length).fill(false),
      age: "",
      liked_genres: [],
      liked_movies: [],
    });

    console.log(newUser);
    axios
      .post("http://localhost:4000/users", newUser)
      .then((res) => console.log(res.data));
  }

  render() {
    if (localStorage.getItem("token") !== null) {
      return <Redirect to="/" push={true} />;
    }
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <br></br>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <br></br>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <br></br>
          <div className="form-group">
            <label>Age: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.age}
              onChange={this.onChangeAge}
            />
          </div>
          <br></br>
          <div>
            <label>Country: </label>
            <Select
              options={this.countryOptions}
              value={this.country}
              onChange={this.onChangeCountry}
            />
          </div>
          <div>
            <h3>Select Toppings</h3>
            {genresList.map(({ name }, index) => {
              return (
                <li key={index}>
                  <div className="toppings-list-item">
                    <div className="left-section">
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${index}`}
                        name={name}
                        value={name}
                        checked={this.state.genres[index]}
                        onChange={() => this.onChangeGenres(index)}
                      />
                      <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                    </div>
                  </div>
                </li>
              );
            })}
          </div>
          <br></br>
          <div className="form-group btn-create-user">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
        <h4>
          Do you have Account ? <Link to="/signin">Sign In</Link>
        </h4>
      </div>
    );
  }
}