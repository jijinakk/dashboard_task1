import React, { useState, useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import { Button, Modal, Form } from "react-bootstrap";
import { TiPlus } from "react-icons/ti";
import {  useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { userContext } from "../App";
import { IoEye } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
const Users = () => {
  //   useEffect(() => {
  //     console.log(users);
  //   });
  const { users, setUsers } = useContext(userContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    id: "",
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    username: "",
    password: "",
  });
  const handleAddUser = () => {
    navigate("/adduser");
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginationItem = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItem.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  const handleView = (users) => {
    setFormInput({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      company: users.company.name,
      phone: users.phone,
      email: users.email,
      username: users.username,
      password: users.password,
    });
    console.log(formInput);
    setShowViewModal(true);
  };
  const handleEdit = (users) => {
    setFormInput({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      phone: users.phone,
      email: users.email,
      username: users.username,
      password: users.password,
    });
    console.log(formInput);
    setShowEditModal(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({ name }, { value });
    setFormInput({ ...formInput, [name]: value });
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updateduser = users.map((user) =>
      user.id === formInput.id ? formInput : user
    );
    console.log(updateduser);
    setUsers(updateduser);
    setShowEditModal(false);
    toast.info("User Details Updated",{ position: "top-center",autoClose:3000,theme:"colored"})

    // setFormInput((use)=>use.map((users)=>
    //    users.id=formInput.id?formInput:users
    // ))
  };
  const handleDelete = (user) => {
    setSelectedUser(user);
    console.log(user);
    setShowDeleteModal(true);
  };
  const handleDeleteUser = (e) => {
    e.preventDefault();
    const deleteduser = users.filter((users) => users.id !== selectedUser.id);
    console.log(deleteduser);
    setUsers(deleteduser);
    setShowDeleteModal(false);
        toast.warn("User Details Deleted",{ position: "top-center",autoClose:3000,theme:"colored"})
    
  };
  return (
    <div>
      <div className="d-flex justify-content-end">
        <Button
          className="add-user-btn"
          onClick={handleAddUser}
          variant="primary"
        >
          {" "}
          <TiPlus />
          Add User
        </Button>
      </div>
      <Table responsive hover className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user) => (
            <tr>
              <td>{user.id}</td>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
              <IoEye onClick={() => handleView(user)}/>{" "}
                <FaEdit onClick={() => handleEdit(user)} />{" "}
                <MdDelete onClick={() => handleDelete(user)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="justify-content-center">
        {paginationItem}
      </Pagination>
   {/* view Modal */}
   <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           User Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center">
            <Form className="edit-user-form" onSubmit={handleEditSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formInput.firstName}
                  placeholder="Enter First Name" readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formInput.lastName}
                  placeholder="Enter Last Name" readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  name="comapany"
                  value={formInput.company}
                
                  placeholder="Enter Last Name" readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formInput.phone} readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formInput.email}
                  placeholder="Enter email" readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formInput.username}
                  placeholder="Enter username" readOnly
                />
              </Form.Group>
              
            </Form>
          </div>
        </Modal.Body>
      </Modal>
      {/* Edit Modal */}

      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center">
            <Form className="edit-user-form" onSubmit={handleEditSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formInput.firstName}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formInput.lastName}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formInput.phone}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formInput.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formInput.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formInput.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  type="submit"
                  className="add-user-btn"
                >
                  Edit
                </Button>
              </div>
            </Form>
          </div>
        </Modal.Body>
       
      </Modal>
       {/* Delete Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        animation={false}
      >
        <Modal.Body>Do you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
          >No</Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Users;
