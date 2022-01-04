import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"

export default class Logout extends Component {
    constructor() {
        super();
        this.state = { navigate: false }
    }

    logout = () => {
        localStorage.clear('token');
        localStorage.clear('name');
        localStorage.clear('accessLevel');
        this.setState({ navigate: true })
        this.props.triggerNavbar();
    }

    render() {
        const { navigate } = this.state

        if (navigate) {
            return <Redirect to='/' push={true} />
        }

        return <Link onClick={this.logout} className="nav-link">
            Log Out
        </Link>

    }
}
