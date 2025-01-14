import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { userContext } from "../App";
import { useContext } from "react";
const UserProfile = () => {
  const {  loggedInUser } = useContext(userContext);
  return (
    <div>
      <h3 className="my-profile-header">My Profile</h3>
      <div className="user-profile-container">
        <Row className="mb-2">
          <Col md={2}>
            <img src={loggedInUser.image || " Image"} alt="user" />
          </Col>
          <Col md={2}>
            <h5>
              {loggedInUser.firstName} {loggedInUser.lastName}
            </h5>
            <h6>{loggedInUser.role}</h6>
            <h6>
              {loggedInUser?.company?.title || " --"},
              {loggedInUser?.company?.name || " "}
            </h6>
          </Col>
          
        </Row>
      </div>
      <div className="user-profile-container mt-4">
        <Form>
          <Row className="mb-3">
            <Col md={4}>
              <h4>Personal Details</h4>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="formfirstname">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  className="user-profile-input"
                  type="text"
                  name="firstName"
                  value={loggedInUser?.firstName || " --- "}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formlastname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  className="user-profile-input"
                  type="text"
                  name="lastName"
                  value={loggedInUser?.lastName || "--- "}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formdateOfBirth">
                <Form.Label>Date Of Birth</Form.Label>
                <Form.Control
                  className="user-profile-input"
                  type="text"
                  name="dateOfBirth"
                  value={loggedInUser?.birthDate || "--- "}
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
                  value={loggedInUser?.email || " ----"}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  className="user-profile-input"
                  type="text"
                  name="phone"
                  value={loggedInUser?.phone || "---- "}
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
                  value={loggedInUser?.role || " ----"}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>

      <div className="user-profile-container mt-4">
        <Form>
          <Row className="mb-3">
            <Col md={4}>
              <h4>Address</h4>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  className="user-profile-input"
                  type="text"
                  name="country"
                  value={loggedInUser?.address?.country || " ----"}
                  placeholder="Enter Country"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  className="user-profile-input"
                  type="text"
                  name="state"
                  value={loggedInUser?.address?.state || " ----"}
                  placeholder="Enter Your State"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formPostal">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  className="user-profile-input"
                  type="text"
                  name="postal"
                  value={loggedInUser?.address?.postalCode}
                  placeholder="Enter Your Postal Code"
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default UserProfile;
