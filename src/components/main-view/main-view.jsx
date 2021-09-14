import React from 'react';
import axios from 'axios';// Using it to fetch the movies, then set the state of movies using this.setState


import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';



export class MainView extends React.Component {

    constructor() { //The method that React uses to actually create the component
        super(); // This will call the parent React.Component’s constructor, which will give your class the actual React component’s features. Also, it will initialize the component’s this variable
        this.state = {
            movies: [],
            selectedMovie: null
        } 
    }

    componentDidMount(){
      axios.get('https://my-flixdbapp.herokuapp.com/movies')
        .then(response => {
          this.setState({
            movies: response.data
          });
        })
        .catch(error => {
          console.log(error);
        });
    }

      setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

    render() {
        const { movies, selectedMovie } = this.state;

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
      
        return (
          <div className="main-view">
            {selectedMovie
            ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => 
              { this.setSelectedMovie(newSelectedMovie); }}/>
            : movies.map(movie => (
              <MovieCard key={movie._id} movieData={movie} onMovieClick={(newSelectedMovie) => 
                { this.setSelectedMovie(newSelectedMovie) }}/>
            ))
          }
          </div>
        );
    }
}






