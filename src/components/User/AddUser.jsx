import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {  useContext } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userContext } from "../UserContext";
import useFormInput from "./useFormInput";
import { Link } from "react-router-dom";
import { axiosInstance } from "../axiosInstance";
function AddUser() {
  const { formInput, setFormInput } = useFormInput();
  const { users, setUsers } = useContext(userContext);
  const navigate = useNavigate();
  const getFormInput = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  
  const checkEmailExists = (email) => {
    return users.some((user) => user.email === email);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Check if the email already exists
    if (checkEmailExists(formInput.email)) {
      toast.error("Email already exists. Please use a different email.");
      return;
    }

    try {
      // Generate the new user data
      const userid = users.length + 1;
      const newInput = { ...formInput, id: userid };
      const response = await axiosInstance.post("/users", newInput);
      setUsers([response.data, ...users]);
      toast.success("User added successfully");
      navigate("/users");
    } catch (error) {
      console.error("Error adding user:", error.response ? error.response.data : error.message);
      toast.error("Failed to add user. Please try again.");
    }
  };

  return (
     
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Form onSubmit={onSubmit} className="add-user-form">
          <Form.Group className="mb-3" controlId="formfirstname">
            <div className="row">
              <Form.Label className="col-sm-4 col-form-label text-start">
                 Name *
              </Form.Label>
              <div className="col-sm-8">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter the Name"
                  onChange={getFormInput}
                  required
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
                  <option value="customer">customer</option>
                </Form.Select>
              </div>
            </div>
          </Form.Group>
         
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div className="row">
              <Form.Label className="col-sm-4 col-form-label text-start">
                Email *
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
            <Link to="/users" >
            <Button
              type="button"
             
              className="cancel-user-btn"
            >
              cancel
            </Button></Link>
            <Button variant="primary" type="submit" className="add-user-btn">
              Add User
            </Button>
          </div>
        </Form>
      </div>
  );
}

export default AddUser;
