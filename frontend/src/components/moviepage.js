import React, { Component } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import {
  Row,
  Col,
  CardLink,
  CardText,
  CardSubtitle,
  CardTitle,
  Card,
  CardBody,
  Container,
  Button
} from "reactstrap";

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      movieId: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/movie")
      .then((response) => {
        this.setState({ movies: response.data });

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
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
                      />
                    }
                    <CardBody>
                      <CardText>{currentMovie.overview} </CardText>
                      <Button href={`/movie/${currentMovie.id}`} >Card Link</Button>
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
