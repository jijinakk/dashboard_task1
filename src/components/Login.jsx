import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { userContext } from "./UserContext";
import { toast } from "react-toastify";
import { axiosInstance } from "./axiosInstance";

const Login = () => {
  const { setIsAuthenticated, setLoggedInUser, isAuthenticated } =
    useContext(userContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("Email", email);
    formData.append("password", password);
    try {
      const response = await axiosInstance.post("/auth/login", 
        {
        email: email,
        password: password,
      });
      const { access_token} = response.data;
      console.log("res", response.data);

      localStorage.setItem("token", access_token );
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", isAuthenticated);
      // 
      const userprofile = await axiosInstance.get("/auth/profile");
      const userDetails = userprofile.data;
      localStorage.setItem("user", JSON.stringify(userDetails));
      setLoggedInUser(userDetails);
      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      console.error("Login Failed:", error);
      alert("invalid");
    }
  };
  return (
    <div className="container">
      <h1 className="login_h1">Login</h1>
      <Form onSubmit={handleSubmit} className="form">
        <Form.Group as={Row} className="mb-3 ">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
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
