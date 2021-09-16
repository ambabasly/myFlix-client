import React, {useState} from "react";
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



import './registration-view.scss';


export function RegistrationView(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthDate);
        props.SignIn(username);
      }

    return (
      <div>
        <h1>Sign In</h1>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => 
                setUsername(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="text" placeholder="Enter password" value={password} onChange={e => 
                setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" value={email} onChange={e => 
                setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="Birth date">
              <Form.Label>Birth Date</Form.Label>
              <Form.Control type="date" value={birthDate} onChange={e => 
                setBirthDate(e.target.value)}></Form.Control>
            </Form.Group>    
            <div className="mb-2">
              <Button variant="primary" size="lg" onClick={handleSubmit}>Submit</Button>
            </div>
        </Form>
      </div>
    );
  }
    RegistrationView.propTypes = {
      register: PropTypes.shape({
          Username: PropTypes.string.isRequired,
          Password: PropTypes.string.isRequired,
          Email: PropTypes.string.isRequired,
          BirthDate: PropTypes.date
      }),
      onRegister: PropTypes.func,
    }
    

  