import React from "react"; // Top-level imports
import Login from "./Login";
import Product from "./Product";
import Home from "./Home/Home";
import DashboardNew from "./Navigation/Dashboard";
import AddUser from "./User/AddUser";
import { Routes, Route } from "react-router-dom";
import Users from "./User/Users";
import ProtectedRoute from "./ProtectedRoute";
import PageNotFound from "./PageNotFound";

const RouteConfig = () => {
  return (
    
    <Routes>
      {/* Login Route */}
      <Route
        path="/login"
        element={
          <ProtectedRoute type="public">
            <Login />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute type="private">
            <DashboardNew />
          </ProtectedRoute>
        }
      >
        {/* Child Routes */}
        <Route index element={<Home />} /> {/* Default route */}
        <Route path="home" element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="users" element={<Users />} />
        <Route path="adduser" element={<AddUser />} />
      </Route>
      <Route path="*" element={<PageNotFound/> } />
    </Routes>
  );
};

export default RouteConfig;
