import React, { Component } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import {
  CardText,
  CardSubtitle,
  CardTitle,
  Card,
  CardBody,
  Button,
  ButtonGroup
} from "reactstrap";
import { Redirect } from "react-router-dom";

export default class SearchPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: this.props.match.params.query,
      movies: [],
      movieId: "",
      pageNumber: 1,
      totalPages: -1,
      redirect: null
    };
  }

  update = () => {
    this.setState({ redirect: null })
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   return {
  //     selectValue: nextProps.match.params.slug,
  //     redirect: false
  //   }
  // }

  // handleSelectChange(event) {
  //   this.setState({
  //     selectValue: event.target.value,
  //     redirect: true
  //   });
  // }

  nextpage = () => {
    if (this.state.pageNumber === this.state.totalPages) return;

    this.setState({ pageNumber: this.state.pageNumber + 1 });
    console.log(this.state.pageNumber)
    axios
      .get(`http://localhost:4000/movie/search/${this.state.query}?page=${this.state.pageNumber}`)
      .then((response) => {
        this.setState({ movies: response.data.results });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  previouspage = () => {
    if (this.state.pageNumber === 1) return;

    this.setState({ pageNumber: this.state.pageNumber - 1 })
    console.log(this.state.pageNumber)
    axios
      .get(`http://localhost:4000/movie/search/${this.state.query}?page=${this.state.pageNumber}`)
      .then((response) => {
        this.setState({ movies: response.data.results });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    axios
      .get(`http://localhost:4000/movie/search/${this.state.query}?page=${this.state.pageNumber}`)
      .then((response) => {
        if (response.data.total_results === 1) {
          let film = response.data.results[0].id
          this.setState({ redirect: '/movie/details/' + film })
          return
        }
        console.log(response.data.total_results)
        console.log(this.state.pageNumber)
        this.setState({
          movies: response.data.results,
          totalPages: response.data.total_pages
        });

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
      // } else if (this.props.params.match.query != this.state.query) {
      //   this.setState({
      //     query: this.props.params.match.query,
      //     pageNumber: 1
      //   })
      //   this.componentDidMount()
    }
    return (
      <div>
        <tbody>
          <Grid container md={12}>
            {this.state.movies.map((currentMovie, i) => {
              return (
                <Grid xs={12} sm={6} md={4}>
                  <Card>
                    <CardBody>
                      <CardTitle tag="h5">
                        {<td>{currentMovie.title}</td>}
                      </CardTitle>
                      <CardSubtitle className="" tag="h6">
                        {<td>{currentMovie.release_date}</td>}
                      </CardSubtitle>
                    </CardBody>
                    {
                      <img
                        class
                        src={`https://image.tmdb.org/t/p/w200/${currentMovie.poster_path}`}
                        alt="movie poster"
                      />
                    }
                    <CardBody>
                      <CardText>{currentMovie.overview} </CardText>
                      <Button href={`/movie/details/${currentMovie.id}`} >Card Link</Button>
                    </CardBody>
                  </Card>
                </Grid>
              );

            })}
          </Grid>
          <ButtonGroup>
            <Button
              color="primary"
              onClick={this.previouspage}
            >
              Previous Page
            </Button>
            <Button
              color="primary"
              onClick={this.nextpage}
            >
              Next Page
            </Button>
          </ButtonGroup>
        </tbody>
      </div>
    );
  }
}
