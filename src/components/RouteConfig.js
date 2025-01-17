import React, { useContext } from "react"; // Top-level imports
import Login from "./Login";
import UserProfile from "./User/UserProfile";
import Product from "./Product";
import Home from "./Home/Home";
import DashboardNew from "./Navigation/Dashboard";
import AddUser from "./User/AddUser";
import Users from "./User/Users";
import { Routes, Route, Navigate } from "react-router-dom";
import { userContext } from "./UserContext"; // Import Context

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(userContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const RouteConfig = () => {
  return (
    <Routes>
      {/* Login Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardNew />
          </ProtectedRoute>
        }
      >
        {/* Child Routes */}
        <Route index element={<Home />} /> {/* Default route */}
        <Route path="home" element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="users" element={<Users />} />
        <Route path="userprofile" element={<UserProfile />} />
        <Route path="adduser" element={<AddUser />} />
      </Route>
    </Routes>
  );
};

export default RouteConfig;
