import React, { Component } from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom';
import '../styles/movie.css'
import '../styles/comments.css'

import Comments from './comments/comments';

import { FaRegHeart, FaHeart, FaStar } from 'react-icons/fa';
import { SiNetflix, SiAmazon, SiHbo } from 'react-icons/si';

export default class DetailPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            movies: []
        };

    }

    componentDidMount() {
        var id = this.state.id
        console.log("mert baba" + id)
        axios.get(`http://localhost:4000/movie/${id}`)
            .then((response) => {
                let genres = response.data.genres.map(g => g.name);
                response.data.genres = genres.join(', ')
                console.log(response.data)
                this.setState({ movies: response.data });
                console.log(response.data);
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
                <h2>Movie ID is {this.props.match.params.id}</h2>
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
                            <span>Watch it on:</span>
                            <a class='streaming-link' href='https://www.netflix.com'><SiNetflix /></a>
                            <a class='streaming-link' href='https://www.primevideo.com'><SiAmazon /></a>
                            <a class='streaming-link' href='https://hbogo.pl/'><SiHbo /></a>
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
