import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userContext } from "./UserContext";
import axios from "axios";
import useFormInput from "./useFormInput";
function AddUser() {
  const { formInput, setFormInput } = useFormInput();
  const { users, setUsers } = useContext(userContext);
  const navigate = useNavigate();
  const getFormInput = (e) => {
    console.log(e.target.value);
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Generate the new user data
      const userid = users.length + 1;
      const newInput = { ...formInput, id: userid };
      console.log("Submitting new user:", newInput);

      const response = await axios.post(
        'https://api.escuelajs.co/api/v1/users',
        newInput
      ); // Replace with your actual API endpoint
      console.log("API response:", response);

      if (response.status === 201 || response.status === 200) {
        const newUser = [response.data, ...users];
        setUsers(newUser);
        console.log("New user added:", newUser);
        toast.success("User added successfully");

        navigate("/dashboard/users");
      } else {
        console.error("Failed to add user. Status code:", response.status);
        toast.error("Failed to add user. Please try again.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      if (error.response && error.response.data) {
        console.error("Validation errors:", error.response.data);
        toast.error(`Failed to add user: ${error.response.data.message}`);
      } else {
        toast.error("Failed to add user. Please try again.");
      }
    }
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
              <Form.Label className="col-sm-4 col-form-label text-start">
                First Name *
              </Form.Label>
              <div className="col-sm-8">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter First Name"
                  onChange={getFormInput}
                  required
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formlastname">
            <div className="row">
              <Form.Label className="col-sm-4 col-form-label text-start">
                Last Name *
              </Form.Label>
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
              <Form.Label className="col-sm-4 col-form-label text-start">
                Phone *
              </Form.Label>
              <div className="col-sm-8">
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  onChange={getFormInput}
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div className="row">
              <Form.Label className="col-sm-4 col-form-label text-start">
                Email address *
              </Form.Label>
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
              <Form.Label className="col-sm-4 col-form-label text-start">
                Date of Birth
              </Form.Label>
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
              <Form.Label className="col-sm-4 col-form-label text-start">
                Role *
              </Form.Label>
              <div className="col-sm-8">
                <Form.Select
                  name="role"
                  onChange={getFormInput}
                  defaultValue=""
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                </Form.Select>
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCountry">
            <div className="row">
              <Form.Label className="col-sm-4 col-form-label text-start">
              avatar *
              </Form.Label>
              <div className="col-sm-8">
                <Form.Control
                  type="text"
                  name="avatar"
                  placeholder="Enter avatar"
                  onChange={getFormInput}
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formusername">
            <div className="row">
              <Form.Label className="col-sm-4 col-form-label text-start">
                Username *
              </Form.Label>
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
              <Form.Label className="col-sm-4 col-form-label text-start">
                Password *
              </Form.Label>
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
