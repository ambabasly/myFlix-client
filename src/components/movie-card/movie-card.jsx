import React from 'react';
import axios from 'axios';
//import PropTypes from "prop-types";
import { Container, Card, Button } from "react-bootstrap";
import "./movie-card.scss";

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {

  addFavorite() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.post(`https:my-flixdbapp.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        alert(`Added to Favorites List`)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { movie } = this.props;

    return (
      <Container>
      <Card
        style={{ border: 0 }} bg='secondary' text='white'>
        <Link to={`/movies/${movie._id}`}>
          <Card.Img className="image-container" variant="top" src={movie.ImageURL} />
        </Link>

        <Card.Body className="fav-btn" style={{ paddingLeft: 30, margin: 'auto' }}>
          <Button variant='dark' value={movie._id} onClick={(e) => this.addFavorite(e, movie)}>
            Add to Favorites</Button>
        </Card.Body>

      </Card>
      </Container>
    );
  }
}          

/*MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
};*/