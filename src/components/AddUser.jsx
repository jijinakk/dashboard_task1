import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {userContext} from  "./UserContext";

function AddUser() {
  const [formInput, setFormInput] = useState({
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    birthdate:"",
    role: "",
    country:"",
    state:"",
    postalCode:"",
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
    const newInput = { ...formInput,id: userid };
    const newUser =[...users,newInput];
    setUsers(newUser);
    console.log(newUser);
    toast.success("User added successfully");
    navigate("/dashboard/users");

    navigate("/dashboard/users");
  };
  const handleCancel = () => {
    navigate("/dashboard/users");
  };
  return (
    <div>
     <div className="d-flex justify-content-center align-items-center vh-100">
  <Form onSubmit={onSubmit} className="add-user-form">
    <Form.Group className="mb-3" controlId="formfirstname">
      <div className="row">
        <Form.Label className="col-sm-4 col-form-label text-start">First Name</Form.Label>
        <div className="col-sm-8">
          <Form.Control
            type="text"
            name="firstName"
            placeholder="Enter First Name"
            onChange={getFormInput}
            required
          />
        </div>
      </div>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formlastname">
      <div className="row">
        <Form.Label className="col-sm-4 col-form-label text-start">Last Name</Form.Label>
        <div className="col-sm-8">
          <Form.Control
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            onChange={getFormInput}
            required
          />
        </div>
      </div>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formphone">
      <div className="row">
        <Form.Label className="col-sm-4 col-form-label text-start">Phone</Form.Label>
        <div className="col-sm-8">
          <Form.Control
            type="number"
            name="phone"
            placeholder="Enter your phone number"
            onChange={getFormInput}
          />
        </div>
      </div>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <div className="row">
        <Form.Label className="col-sm-4 col-form-label text-start">Email address</Form.Label>
        <div className="col-sm-8">
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={getFormInput}
            required
          />
        </div>
      </div>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formdob">
      <div className="row">
        <Form.Label className="col-sm-4 col-form-label text-start">Date of Birth</Form.Label>
        <div className="col-sm-8">
          <Form.Control
            type="date"
            name="dob"
            placeholder="Enter Date of Birth"
            onChange={getFormInput}
          />
        </div>
      </div>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formRole">
      <div className="row">
        <Form.Label className="col-sm-4 col-form-label text-start">Role</Form.Label>
        <div className="col-sm-8">
          <Form.Control
            type="text"
            name="role"
            placeholder="Enter Role"
            onChange={getFormInput}
          />
        </div>
      </div>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formCountry">
      <div className="row">
        <Form.Label className="col-sm-4 col-form-label text-start">Country</Form.Label>
        <div className="col-sm-8">
          <Form.Control
            type="text"
            name="country"
            placeholder="Enter Country"
            onChange={getFormInput}
          />
        </div>
      </div>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formusername">
      <div className="row">
        <Form.Label className="col-sm-4 col-form-label text-start">Username</Form.Label>
        <div className="col-sm-8">
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            onChange={getFormInput}
            required
          />
        </div>
      </div>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <div className="row">
        <Form.Label className="col-sm-4 col-form-label text-start">Password</Form.Label>
        <div className="col-sm-8">
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={getFormInput}
            required
          />
        </div>
      </div>
    </Form.Group>
    <div className="d-flex justify-content-center">
      <Button
        type="button"
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
</div>
    </div>
  );
}

export default AddUser;
