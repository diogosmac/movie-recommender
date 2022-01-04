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
  Button,ButtonGroup
} from "reactstrap";

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      movieId: "",
      pageNumber:1
    };
  }

  nextpage = () => {
    this.setState({pageNumber: this.state.pageNumber+1});
    console.log(this.state.pageNumber)
    axios
      .get(`http://localhost:4000/movie/${this.state.pageNumber}`)
      .then((response) => {
       // console.log(this.state.pageNumber)
        this.setState({ movies: response.data });

      })
      .catch(function (error) {
        console.log(error);
      });
  }
  previouspage = () => {
    if(this.state.pageNumber>=1)
    {this.setState({pageNumber: this.state.pageNumber-1});}
    console.log(this.state.pageNumber)
    axios
      .get(`http://localhost:4000/movie/${this.state.pageNumber}`)
      .then((response) => {
       // console.log(this.state.pageNumber)
        this.setState({ movies: response.data });

      })
      .catch(function (error) {
        console.log(error);
      });
  }


  componentDidMount() {
    axios
      .get(`http://localhost:4000/movie/${this.state.pageNumber}`)
      .then((response) => {
        console.log(this.state.pageNumber)
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
