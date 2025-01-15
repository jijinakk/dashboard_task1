import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useContext,useEffect} from "react";
import {userContext} from  "./UserContext";
import {  toast } from "react-toastify";
import UserContext from "./UserContext";

const Login = () => {
  const { setIsAuthenticated, setUsers } = useContext(userContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('https://dummyjson.com/user/login',{username,password});
      const {accessToken} =response.data;
      console.log("res",response.data);
      localStorage.setItem("token",accessToken);
      const userresponse = await axios.get('https://dummyjson.com/user/me',{
        headers:{
          Authorization:`Bearer ${accessToken}`
        }
      })
      const userDetails =userresponse.data;
      localStorage.setItem("user",JSON.stringify(userDetails));
      setIsAuthenticated(true);
      setUsers([userDetails]);
      toast.success("Login Successful")
      navigate("/dashboard");

    }catch(error)
    {
      console.error("Login Failed:",error);
      alert("invalid");
    }
  };
  return (
    <div className="container">
      <h1 className="login_h1">Login</h1>
      <Form onSubmit={handleSubmit} className="form">
        <Form.Group as={Row} className="mb-3 ">
          <Form.Label column sm={2}>
            Username
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update email state
              required
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3 align-items-center"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            Password
          </Form.Label>
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

        <Button type="submit" className="login_btn">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
