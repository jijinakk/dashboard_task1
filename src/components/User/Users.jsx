import React, { useState, useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import { Button, Modal, Form } from "react-bootstrap";
import { TiPlus } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { toast } from "react-toastify";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import UserContext from "../UserContext";
import { userContext } from "../UserContext";
import useFormInput from "./useFormInput";


const Users = () => {

  const {formInput,setFormInput}=useFormInput();
  const { users, setUsers } = useContext(userContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationItems, setPaginationItems] = useState([]);

  const itemsPerPage = 10;
  const navigate = useNavigate();

 const fetchUsers = async () => {
    try {
      const res = await axios.get("https://api.escuelajs.co/api/v1/users");
      console.log(res.data);
      setUsers(res.data);
      console.log(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
   
    fetchUsers();
  }, []);
  const handleAddUser = () => {
    console.log("Add User");
    navigate("/adduser");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    const totalPages = Math.ceil(users.length / itemsPerPage);
    const paginationItems = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    setPaginationItems(paginationItems);
  }, [currentPage, users]);

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(users)?users.slice(indexOfFirstItem, indexOfLastItem):[]// Reverse to show the newest users first
;
  const handleAction = (users, actionType) => {
    setFormInput({
      id: users.id,
      avatar: users?.avatar,
      name: users.name,
      email: users.email,
      role: users.role,
      password: users.password,
    });

    console.log(formInput);
    if (actionType === "view") {
      setShowViewModal(true);
    } else if (actionType === "edit") {
      setShowEditModal(true);
    }
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
    toast.info("User Details Updated");

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
    toast.warn("User Details Deleted");
  };
  const test = () => {  
    console.log("test");
  }
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
      <div className="justify-content-center user-table-container">
      <Table responsive hover className="user-table border" striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th> 
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user) => (
            <tr>
              <td>{user.id}</td>
              <td>
                {user.name} 
              </td>
              <td>{user.email}</td>
              <td>
                <IoEye onClick={() => handleAction(user, "view")} />{" "}
                <FaEdit onClick={() => handleAction(user, "edit")} />{" "}
                <MdDelete onClick={() => handleDelete(user)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
      <Pagination className="justify-content-center">
        {paginationItems}
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
          <div>
            <div className="user-profile-container">
              <Row className="mb-4">
                <Col md={6}>
                  <img src={formInput.avatar || " Image"} alt="img"  style={{ width: "200px", height: "200px", objectFit: "cover" }}/>
                </Col>
                <Col md={4}>
                  <h5>
                    {formInput.name} 
                  </h5>
                  <h6>{formInput.role}</h6>
                  
                </Col>
              </Row>
            </div>
            <div className="user-profile-container mt-4">
              <Form>
                <Row className="mb-3">
                  <Col md={4}>
                    <h4>Details</h4>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group controlId="formfirstname">
                      <Form.Label> Name</Form.Label>
                      <Form.Control
                        className="user-profile-input"
                        type="text"
                        name="name"
                        value={formInput?.name || " --- "}
                      />
                    </Form.Group>
                  </Col>
                
                 
                </Row>
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        className="user-profile-input"
                        type="text"
                        name="email"
                        value={formInput?.email || " ----"}
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={4}>
                    <Form.Group controlId="formRole">
                      <Form.Label>Role</Form.Label>
                      <Form.Control
                        className="user-profile-input"
                        type="text"
                        name="role"
                        value={formInput?.role || " ----"}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </div>
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
                <div className="row">
                  <Form.Label className="col-sm-4 col-form-label text-start">
                    Name
                  </Form.Label>
                  <div className="col-sm-8">
                    <Form.Control
                      type="text"
                      name="name"
                      value={formInput.name}
                      onChange={handleChange}
                      placeholder="Enter First Name"
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
                   type="text"
                   name="role"
                   value={formInput.role}
                   onChange={handleChange}
                   placeholder="Enter Role"
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
                    Email
                  </Form.Label>
                  <div className="col-sm-8">
                    <Form.Control
                      type="email"
                      name="email"
                      value={formInput.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                    />
                  </div>
                </div>
              </Form.Group>
              
              
              
             
             
              <Form.Group className="mb-3" controlId="formAvatar">
                <div className="row">
                  <Form.Label className="col-sm-4 col-form-label text-start">
                    Avatar
                  </Form.Label>
                  <div className="col-sm-8">
                    <Form.Control
                      type="text"
                      name="avatar"
                      value={formInput.avatar}
                      onChange={handleChange}
                      placeholder="Enter username"
                    />
                  </div>
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <div className="row">
                  <Form.Label className="col-sm-4 col-form-label text-start">
                    Password
                  </Form.Label>
                  <div className="col-sm-8">
                    <Form.Control
                      type="password"
                      name="password"
                      value={formInput.password}
                      onChange={handleChange}
                      placeholder="Password"
                    />
                  </div>
                </div>
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  type="submit"
                  className="add-user-btn"
                >
                  Update
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
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;
