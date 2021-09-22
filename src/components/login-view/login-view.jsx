import React, { useState } from 'react';
//import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import './login-view.scss';

export function LoginView(props) {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => 
  {
    e.preventDefault();
    //Sending a request to the server for authentication, and then call props.onLoggedIn(username) 
    axios.post('https://my-flixdbapp.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };


  return (
    <div>
      <Form className="login justify-content-center">
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" value={username} onChange={e => 
            setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} onChange={e => 
            setPassword(e.target.value)} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Please provide your password</Form.Control.Feedback>
        </Form.Group>

          <span>
            <Button variant="primary" type="submit" onClick={handleSubmit}>Log in</Button>
            {' '}
            <Link to={`/register`}>
              <Button variant="success link">Register</Button>
            </Link>
          </span>
      </Form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (username, password) => dispatch(handleSubmit(username, password))
});

export default connect(null, mapDispatchToProps)(LoginView);

/*LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired
};*/