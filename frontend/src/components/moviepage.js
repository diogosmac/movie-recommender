import React, {Component} from 'react';
import axios from 'axios';

export default class UsersList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {movies: []}
    }

    componentDidMount() {
        axios.get('http://localhost:4000/movie')
             .then(response => {
                 this.setState({movies: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>title</th>
                            <th>year</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.movies.map((currentMovie, i) => {
                            return (
                                <tr>
                                    <td>{currentMovie.title}</td>
                                    <td>{currentMovie.year}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}