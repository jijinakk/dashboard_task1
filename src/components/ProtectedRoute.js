import React from 'react'
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "./UserContext";
const ProtectedRoute = ({ children,type }) => {
        const { isAuthenticated } = useContext(userContext);
        if (type === "public" && isAuthenticated) {
          return <Navigate to="/" replace />;
        }
        // Handle Protected Route
        if (type === "protected" && !isAuthenticated) {
          return <Navigate to="/login" replace />;
        }
      
        return children;
      };
      


export default ProtectedRoute
