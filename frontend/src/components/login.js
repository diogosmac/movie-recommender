import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import axios from "axios"
export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            isLoggedIn: false,
            loginError: ""
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const User = {
            email: this.state.email,
            password: this.state.password
        }

        this.setState({
            name: '',
            email: '',
            password: ''
        });

        axios.post('http://localhost:4000/users/login', User)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                        this.loginError = res.data.errorMessage
                    }
                    else // user successfully registered
                    {
                        console.log("User registered and logged in")

                        localStorage.setItem('name', res.data.name)
                        localStorage.setItem('user_id', res.data._id)
                        localStorage.setItem('country', res.data.country)
                        localStorage.setItem('accessLevel', res.data.accessLevel)
                        localStorage.setItem('token', res.data.tokens.access_token)

                        this.setState({ isLoggedIn: true })
                    }
                }
                else {
                    console.log("Login failed")
                }
            }).catch(err => {
                console.log(err.message)
                this.setState({ loginError: "Login Error : Please Check Email and Password" })
            })

    }

    render() {
        if (localStorage.getItem('token') !== null) {
            return (<Redirect to='/' push={true} />)
        }
        return (
            <div>
                <div class="row justify-content-center align-items-center">
                    <h3>Please Sign In</h3>
                    {this.state.isLoggedIn ? <Redirect push to="/" /> : null}
                    {this.state.loginError &&
                        <h4 class="text-danger">  {this.state.loginError} </h4>}
                </div>
                <form>
                    <div class="mb-3">
                        <label for="InputEmail" class="form-label">Email address</label>
                        <input class="form-control" aria-describedby="emailHelp"
                            type="email"
                            name="email"
                            placeholder="Email"
                            autoComplete="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="InputPassword" class="form-label">Password</label>
                        <input class="form-control" id="InputPassword"
                            type="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="button" class="btn btn-primary" value="submit" onClick={this.handleSubmit}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"></path>
                            <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"></path>
                        </svg>                                   Login
                    </button>
                </form>
            </div>
        )
    }
}