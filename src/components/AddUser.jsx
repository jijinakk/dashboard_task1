import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FormGroup } from "react-bootstrap";

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
          <Form.Group className="mb-3" controlId="formfirstname">
            <Form.Label className="left-aligned-label">First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              onChange={getFormInput}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formlastname">
            
            <Form.Label  className="text-start">Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              onChange={getFormInput}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formphone">
            <Form.Label className="text-start">Phone</Form.Label>
            <Form.Control
              type="number"
              name="phone"
              placeholder="Enter your phone number"
              onChange={getFormInput}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-start">Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={getFormInput}
              required
            />
          </Form.Group>
            <Form.Group className="mb-3" controlId="formdob">
            <Form.Label className="text-start">Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              placeholder="Enter Date of Birth"
              onChange={getFormInput}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formRole">
            <Form.Label className="text-start">Role</Form.Label>
            <Form.Control
              type="text"
              name="role"
              placeholder="Enter Role"
              onChange={getFormInput}
            /></Form.Group>
            <Form.Group className="mb-3" controlId="formCountry">
            <Form.Label className="text-start">Country</Form.Label>
            <Form.Control
              type="text"
              name="country"
              placeholder="Enter Country"
              onChange={getFormInput}
            />
          </Form.Group>
         {/* <Form.Group className="mb-3" controlId="formstate">
            <Form.Label className="text-start">State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              placeholder="Enter State"
              onChange={getFormInput}
            /> 
          </Form.Group> */}
          {/* <Form.Group className="mb-3" controlId="formpostal">
            <Form.Label className="text-start">Postal Code</Form.Label>
            <Form.Control
              type="text"
              name="postalCode"
              placeholder="Enter Postal Code"
              onChange={getFormInput}
            />
          </Form.Group> */}
          <Form.Group className="mb-3" controlId="formusername">
            <Form.Label className="text-start">Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={getFormInput}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-start">Password</Form.Label>
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
        <ToastContainer />
      </div>
    </div>
  );
}

export default AddUser;
