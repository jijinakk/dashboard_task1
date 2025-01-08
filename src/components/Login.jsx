import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState} from 'react';


const Login = ({setIsAuthenticated}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate =useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent form default behavior
  
      const users = [
        { username: 'example', password: 'eg123' },
        { username: 'janeexamplecom', password: 'mypassword456' },
        { username: 'admin@example.com', password: 'admin123' },
      ];
    
    //   try {
    //     const response = await axios.post('https://json-placeholder.mock.beeceptor.com/login', {
    //       email,
    //       password,
    //     });
    const user = users.find(
        (user) => user.username === username && user.password === password
      );
         console.log(user)
      if (user) {
        // Authentication successful
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(user)); // Store the user details
        setIsAuthenticated(true); // Update the authentication state
        console.log('Login Successful');
        setMessage('Login Successful');
        navigate('/dashboard');
        
      } else {
        // Authentication failed
        setMessage('Invalid credentials');
      }
    //     if (response.data.success) {
    //         localStorage.setItem('token', response.data.token); // Save the token
    //         localStorage.setItem('isAuthenticated', 'true'); // Set auth status to true
    //         setIsAuthenticated(true); // Update auth state in App          
    //       // You can redirect or show authenticated content here
    //       console.log('Login Successful');
    //     }
    //   } catch (err) {
    //     setError('Invalid credentials or network error');
    //     console.error(err);
    //   }
    };
  
    return (
      <div className='login_main'>
        <h1 className='login_h1'>Login</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3 align-items-center" >
            <Form.Label column sm={2}>Username</Form.Label>
            <Col sm={5}>
              <Form.Control
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Update email state
                required
              />
            </Col>
          </Form.Group>
  
          <Form.Group as={Row} className="mb-3 align-items-center" controlId="formHorizontalPassword">
            <Form.Label column sm={2}>Password</Form.Label>
            <Col sm={5}>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
                required
              />
            </Col>
          </Form.Group>
  
          <Button  type="submit" className="login_btn">
            Login
          </Button>
        </Form>
  
        {message && <p style={{ color: 'red' }}>{message}</p>} {/* Display error message if authentication fails */}
      </div>
    );
  }
  
  export default Login;