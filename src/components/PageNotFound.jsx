import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { userContext } from "./UserContext";

const PageNotFound = () => {
    const { isAuthenticated } = useContext(userContext);
    const navigate = useNavigate();
      const handleRedirect = () => {
        if (isAuthenticated) {
          navigate("/", { replace: true }); // Redirect to the home page if authenticated
        } else {
          navigate("/login", { replace: true }); // Redirect to the login page if not authenticated
        }
      };

    return (
      <div className="page-not-found">
        <h1 style={{ fontSize: "4rem", color: "#ff6f61" }}>404</h1>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Page Not Found</h2>
        <p style={{ marginBottom: "1.5rem", color: "#6c757d" }}>
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button variant="primary" onClick={handleRedirect}>
          {isAuthenticated ? "Go to Home" : "Go to Login"}
        </Button>
      </div>
    );
  };
  
  export default PageNotFound;