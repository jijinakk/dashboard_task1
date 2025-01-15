import React, { useContext } from "react";
import Login from "./Login";
import UserProfile from "./UserProfile";
import Product from "./Product";
import Home from "./Home";
import Dashboard from "./Dashboard1";
import {
  Routes,
  Route,
  Navigate,
 
} from "react-router-dom";
import AddUser from "./AddUser";
import Users from "./Users";
import UserContext from "./UserContext";
import {userContext} from  "./UserContext";
const ProtectedRoute = ({ children,}) => {
    const {isAuthenticated} =useContext(userContext);
    console.log(isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/" />;
   
  };
const RouteConfig = ({ isAuthenticated,loggedInUser }) => {
   
  
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} loggedInUser={loggedInUser}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} /> {/* Correct relative path */}
          <Route path="product" element={<Product />} />{" "}
          {/* Correct relative path */}
          <Route path="users" element={<Users />} />
          <Route path="userprofile" element={<UserProfile />} />
          <Route path="adduser" element={<AddUser />} />
        </Route>
        

        {/* Add more routes as needed */}
      </Routes>
  );
};

export default RouteConfig;
