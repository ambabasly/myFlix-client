import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import Badge from 'react-bootstrap/Badge';

import "./movie-view.scss";

export class MovieView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.keypressCallback);
  }

  addFavorite() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    axios
      .post(
        `https://my-flixdbapp.herokuapp.com/users/${username}/movies/${this.props.movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        alert(`Added to Favorites List`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view justify-content-md-center">
        <div className="movie-poster">
          <img src={movie.ImageURL} />
        </div>

        <div className="movie-title">
          <h1>
            <Badge>
              <span className="value">{movie.Title}</span>
            </Badge>
          </h1>
        </div>

        <div className="movie-description">
          <span className="value">{movie.Description}</span>
        </div>

        <div className="movie-genre button-space">
          <Link to={`/genres/${movie.Genre.Name}`}>Genre: </Link>
          <span className="value">{movie.Genre.Name}</span>
        </div>

        <div className="movie-director button-space">
          <Link to={`/directors/${movie.Director.Name}`}>Director: </Link>
          <span className="value">{movie.Director.Name}</span>
        </div>

        <Button
          variant="danger"
          className="fav-button"
          value={movie._id}
          onClick={(e) => this.addFavorite(e, movie)}
        >
          Add to Favorites
        </Button>

        <div className="button-space"></div>
        <Button
          variant="primary"
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </Button>
      </div>
    );
  }
}
