import React from 'react';
import axios from 'axios';// Using it to fetch the movies, then set the state of movies using this.setState
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';


import './main-view.scss';

export class MainView extends React.Component {

    constructor() { //The method that React uses to actually create the component
        super(); // This will call the parent React.Component’s constructor, which will give your class the actual React component’s features. Also, it will initialize the component’s this variable
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            register: false
          };    
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

      setSelectedMovie(movie) {
        this.setState({
      selectedMovie: movie
    });
  }

  //When a user successfully logs in, this function updates the `user` property in state to that *particular user
      onLoggedIn(user) {
        this.setState({
          user
        });
      }
      //When a new user is registered  
      SonRegistration(register) {
        this.setState({
          register
        });
      }

    render() {
        const { movies, selectedMovie, register, user} = this.state;
         // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView

        if (!register) return <RegistrationView SignIn={register => 
          this.SignIn(register)} />; 

      // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView
      if (!user) return <LoginView onLoggedIn={user => 
        this.onLoggedIn(user)} />;  
  
      // Before the movies have been loaded
      if (movies.length === 0) return <div className="main-view" />;
  
      return (
        <div className="main-view">
          {selectedMovie
            ? (
              <Row className="justify-content-md-center">
                <Col md={8}>
                  <MovieView movie={selectedMovie}  onBackClick={newSelectedMovie => 
                    { this.setSelectedMovie(newSelectedMovie); }}/></Col>
              </Row>
            ):             
            movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => 
                { this.setSelectedMovie(newSelectedMovie); }}/>
            ))
          }
        </div>
      );
    }
  
  }


  export default MainView;


  









