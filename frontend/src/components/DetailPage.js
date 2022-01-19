import React, { Component } from 'react'
import axios from "axios"
import '../styles/movie.css'
import '../styles/comments.css'

import Comments from './comments/comments';

import { FaRegHeart, FaHeart, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default class DetailPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            movies: [],
            streams: null,
            liked: false,
            likeHovered: false
        };

        this.toggleHover = () => {
            this.setState({ likeHovered: !this.state.likeHovered })
        }

        this.likeMovie = () => {
            axios.post(`http://localhost:4000/movie/like`, this.state.combination)
                .then(() => {
                    this.setState({ liked: true })
                })
        }

        this.unlikeMovie = () => {
            axios.post(`http://localhost:4000/movie/unlike`, this.state.combination)
                .then((response) => {
                    this.setState({ liked: false })
                })
        }
    }

    componentDidMount() {
        const id = this.state.id
        axios.get(`http://localhost:4000/movie/details/${id}`)
            .then((response) => {
                let genres = response.data.genres.map(g => g.name);
                response.data.genres = genres.join(', ')
                this.setState({ movies: response.data });
            })

        axios.get(`http://localhost:4000/movie/details/streaming/${id}`)
            .then((response) => {
                const country = localStorage.getItem('country') || 'PL'
                let results = response.data.results
                if (country in results) {
                    this.setState({ streams: results[country].link })
                }
            })

        const userID = localStorage.getItem('user_id')
        if (userID !== null) {
            axios.get(`http://localhost:4000/users/get/${userID}`).then((response) => {
                const liked_movies = response.data.liked_movies
                this.setState({
                    combination: { user_id: userID, movie_id: id },
                    liked: liked_movies.includes(parseInt(id))
                })
            })
        }
    }

    getGenreString() {
        let genres = [];
        for (let genre of this.state.movies.genres) {
            genres.push_back(genre.name);
        }
        return genres.join(', ')
    }

    outlineHeart() {
        return <FaRegHeart className='movie-fav' onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} onClick={this.unlikeMovie} />
    }

    redHeart() {
        return <FaHeart className='movie-fav' onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} onClick={this.likeMovie} />
    }

    render() {
        return (
            <div>
                <div className='movie-header'>
                    <span className='movie-title'>{this.state.movies.title}</span>
                    <span className='movie-detail genre'><div>{this.state.movies.genres}</div></span>
                    <span className='movie-detail year'>{this.state.movies.release_date}<div></div></span>
                    <span className='movie-detail duration'><div>{`${this.state.movies.runtime} min`}</div></span>
                </div>
                <div className='row movie-page'>
                    <div className='poster-parent'>
                        <img className='movie-poster' src={`https://image.tmdb.org/t/p/w200/${this.state.movies.poster_path}`} alt='Movie Poster' />
                    </div>
                    <div className='col movie-content'>
                        <div>
                            <div className='movie-content-header'>
                                <div className='stretch'>
                                    <span className='synopse-title'>SYNOPSE</span>
                                    <div>
                                        {
                                            (localStorage.getItem('user_id') !== null)
                                                ? <div className='movie-fav'>
                                                    {
                                                        (this.state.liked)
                                                            ? (this.state.likeHovered)
                                                                ? this.outlineHeart()
                                                                : this.redHeart()
                                                            : (this.state.likeHovered)
                                                                ? this.redHeart()
                                                                : this.outlineHeart()
                                                    }
                                                </div>
                                                : <span className='movie-fav-not-logged'><Link to='/signin'>Log in</Link> in order to like this movie</span>
                                        }
                                        <FaStar color='gold' />
                                        <span className='movie-rating'><div>{this.state.movies.vote_average}</div></span>
                                    </div>
                                </div>
                            </div>
                            <div className='movie-synopse'>
                                <div> {this.state.movies.overview} </div>
                            </div>
                        </div>
                        <div className='movie-where-to-watch'>
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
                <div className='movie-comments'>
                    <span className='comments-header'>COMMENTS</span>
                    <Comments
                        commentsUrl="/comments"
                        currentUserId="1"
                    />
                </div>
            </div >
        )
    }
}
