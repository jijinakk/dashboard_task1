import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function AddUser() {
  const [formInput, setFormInput] = useState({
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    username: "",
    password: "",
  });
  const { users, setUsers } = useContext(userContext);
  const navigate = useNavigate();
  const getFormInput = (e) => {
    console.log(e.target.value);
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const userid = users.length + 1;
    const newInput = { ...formInput, id: userid };
    const newUsers = [...users, newInput];
    console.log(newUsers);
    setUsers(newUsers);
    navigate("/dashboard/users");
  };
  const handleCancel = () => {
    navigate("/dashboard/users");
  };
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Form onSubmit={onSubmit} className="add-user-form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              onChange={getFormInput}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              onChange={getFormInput}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="number"
              name="phone"
              placeholder="Enter your phone number"
              onChange={getFormInput}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={getFormInput}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={getFormInput}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={getFormInput}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button
              type="submit"
              onClick={handleCancel}
              className="cancel-user-btn"
            >
              cancel
            </Button>
            <Button variant="primary" type="submit" className="add-user-btn">
              Add User
            </Button>
          </div>
        </Form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default AddUser;
