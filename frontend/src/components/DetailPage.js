import React, { Component } from 'react'
import axios from "axios"
import '../styles/movie.css'
import '../styles/comments.css'

import Comments from './comments/comments';

import { FaRegHeart, FaStar } from 'react-icons/fa';
// import FaHeart when likes implemented
// import { SiNetflix, SiAmazon, SiHbo } from 'react-icons/si';
import { Link } from 'react-router-dom';

export default class DetailPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            movies: [],
            streams: null,
            likes: 0
        };

    }

    componentDidMount() {
        var id = this.state.id
        axios.get(`http://localhost:4000/movie/details/${id}`)
            .then((response) => {
                let genres = response.data.genres.map(g => g.name);
                response.data.genres = genres.join(', ')
                console.log(response.data)
                this.setState({ movies: response.data });
                console.log(response.data);
            })

        axios.get(`http://localhost:4000/movie/details/streaming/${id}`)
            .then((response) => {
                let results = response.data.results
                if ('PL' in results) {
                    this.setState({ streams: results.PL.link })
                }
            })

        axios.get(`http://localhost:4000/movie/details/like/${id}`).then((response) => {
            this.setState({ likes: response.data.length })
            console.log(this.likes)
        })
    }

    getGenreString() {
        let genres = [];
        for (let genre of this.state.movies.genres) {
            genres.push_back(genre.name);
        }
        return genres.join(', ')
    }

    render() {
        return (
            <div>
                <div class='movie-header'>
                    <span class='movie-title'>{this.state.movies.title}</span>
                    <span class='movie-detail genre'><div>{this.state.movies.genres}</div></span>
                    <span class='movie-detail year'>{this.state.movies.release_date}<div></div></span>
                    <span class='movie-detail duration'><div>{`${this.state.movies.runtime} min`}</div></span>
                </div>
                <div class='row movie-page'>
                    <div class='poster-parent'>
                        <img class='movie-poster' src={`https://image.tmdb.org/t/p/w200/${this.state.movies.poster_path}`} alt='Movie Poster' />
                    </div>
                    <div class='col movie-content'>
                        <div>
                            <div class='movie-content-header'>
                                <div class='stretch'>
                                    <span class='synopse-title'>SYNOPSE</span>
                                    <div>
                                        <div class='movie-fav'>
                                            {this.state.likes}
                                            <FaRegHeart class='movie-fav' />
                                        </div>
                                        <FaStar color='gold' />
                                        <span class='movie-rating'><div>{this.state.movies.vote_average}</div></span>
                                    </div>
                                </div>
                            </div>
                            <div class='movie-synopse'>
                                <div> {this.state.movies.overview} </div>
                            </div>
                        </div>
                        <div class='movie-where-to-watch'>
                            <Link to={{ pathname: "https://example.zendesk.com/hc/en-us/articles/123456789-Privacy-Policies" }} target="_blank" />
                            {
                                this.state.streams !== null
                                    ? <span>
                                        Check&nbsp;
                                        <Link to={{ pathname: this.state.streams }} target="_blank">here</Link>
                                        &nbsp;where you can watch {this.state.movies.title} right now!
                                    </span>
                                    : <span>
                                        Unfortunately, this movie is not available to stream in Poland :(
                                    </span>
                            }
                        </div>
                    </div>
                </div>
                <div class='movie-comments'>
                    <span class='comments-header'>COMMENTS</span>
                    <Comments
                        commentsUrl="/comments"
                        currentUserId="1"
                    />
                </div>
            </div>
        )
    }
}
