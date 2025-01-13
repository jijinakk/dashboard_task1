import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import Alert from "react-bootstrap/Alert";
import { userContext } from "../App";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const { setIsAuthenticated, users,loggedInUser,setLoggedInUser } = useContext(userContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    console.log(user);
    if (user) {
      // Authentication successful
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(user)); // Store the user details
      setIsAuthenticated(true); // Update the authentication state
      console.log("Login Successful", user);
      // const getuser = JSON.parse(localStorage.getItem('user'));
      setLoggedInUser(user);
      console.log( loggedInUser);
      toast.success("Login successful", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } else {
      // Authentication failed

      toast.warn("Invalid Credentials", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });

      setUsername("");
      setPassword("");
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
      <ToastContainer />
    </div>
  );
};

export default Login;
