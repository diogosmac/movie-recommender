import React, { Component } from "react";
import { Redirect } from "react-router-dom"
import axios from "axios";
import { Grid } from "@material-ui/core";
import {
  CardText,
  CardSubtitle,
  CardTitle,
  Card,
  CardBody,
  Button
} from "reactstrap";
import TextTruncate from "react-text-truncate";

export default class Recommendations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      userID: 0
    };
  }

  componentDidMount() {
    const user = localStorage.getItem('user_id')
    this.setState({ userID: user })
    if (user !== null) {
      axios
        .get(`http://localhost:4000/movie/user/${user}`)
        .then((response) => {
          console.log(this.state.pageNumber)
          this.setState({ movies: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  render() {
    if (this.state.userID === null) {
      return <Redirect to={'/'} />;
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
                      <CardText>
                        <TextTruncate
                          line={3}
                          text={currentMovie.overview}
                        />
                      </CardText>
                      <Button href={`/movie/details/${currentMovie.id}`} >Card Link</Button>
                    </CardBody>
                  </Card>
                </Grid>
              );

            })}
          </Grid>
        </tbody>
      </div>
    );
  }
}
