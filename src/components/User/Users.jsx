import React, { useState, useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import { Button, Modal, Form,Spinner } from "react-bootstrap";
import { TiPlus } from "react-icons/ti";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { toast } from "react-toastify";
import { Row, Col } from "react-bootstrap";
import { userContext } from "../UserContext";
import useFormInput from "./useFormInput";
import { axiosInstance } from "../axiosInstance";
import CommonTable from "../CommonTable";

const Users = () => {
  const { formInput, setFormInput } = useFormInput();
  const { users, setUsers } = useContext(userContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationItems, setPaginationItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 10;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await   axiosInstance.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
      setCurrentPage(Number(savedPage)); // Set page from localStorage
    } else {
      setCurrentPage(1); // Default to page 1 if no saved page
    }
  }, []);
  

  const handlePageChange = (page) => {
    localStorage.setItem('currentPage', page); // Save current page to localStorage

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
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const handleAction = (user, actionType) => {
    setFormInput({
      id: user.id,
      avatar: user?.avatar,
      name: user.name,
      email: user.email,
      role: user.role,
      password: user.password,
    });

    if (actionType === "view") {
      setShowViewModal(true);
    } else if (actionType === "edit") {
      setShowEditModal(true);
    } else if (actionType === "delete") {
      setSelectedUser(user);
      setShowDeleteModal(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({ name }, { value });
    setFormInput({ ...formInput, [name]: value });
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Make an API call to update user details
      const response = await axiosInstance.put(`/users/${formInput.id}`, formInput);
  
      if (response.status === 200) {
        // Update the local state only if the API call is successful
        const updatedUsers = users.map((user) =>
          user.id === formInput.id ? response.data : user
        );
        setUsers(updatedUsers);
        setShowEditModal(false);
        toast.success("User details updated successfully");
      }
    } catch (error) {
      // Handle any errors from the API call
      console.error("Error updating user:", error);
      toast.error("Failed to update user details. Please try again.");
    }
  };
  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };
  const handleDeleteUser = async (e) => {
    e.preventDefault();
  
    try {
      // Make an API call to delete the user
      const response = await axiosInstance.delete(`/users/${selectedUser.id}`);
  
      if (response.status === 200) {
        // Update the local state by filtering out the deleted user
        const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
        setUsers(updatedUsers);
        setShowDeleteModal(false);
        toast.warn("User details deleted successfully");
      }
    } catch (error) {
      // Handle any errors from the API call
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  const actions = {
    view: (user) => {
      handleAction(user, "view");
    },
    edit: (user) => {
      handleAction(user, "edit");
    },
    delete: (user) => {
      handleAction(user, "delete");
    },
  };
  return (
    <div>
      <div className="d-flex justify-content-end">
        <Link to="/adduser">
        <Button
          className="add-user-btn"
          variant="primary"
        >
          {" "}
          <TiPlus />
          Add User
        </Button>
        </Link>
      </div>

      <div>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <CommonTable
            data={currentItems}
            columns={["ID", "Name", "Email"]}
            actions={actions}
          />
          <Pagination className="justify-content-center">{paginationItems}</Pagination>
        </>
      )}
    </div>
      
      
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
            <div className="user-profile-container">
              <Row className="mb-4">
                <Col md={6}>
                  <img
                    src={formInput.avatar || " Image"}
                    alt="img"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                </Col>
                <Col md={4}>
                  <h5>{formInput.name}</h5>
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
