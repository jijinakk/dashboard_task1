import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./components/style.css";
import { BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

import RouteConfig from "./components/RouteConfig";
import axios from "axios";

const userContext = createContext();
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState([]);
  // Check localStorage for authentication status
  const getUserApi = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/users");
      setUsers(res.data.users);
      console.log(res.data.users);
      const authStatus = localStorage.getItem("isAuthenticated");
      const user = JSON.parse(localStorage.getItem("user"));

      console.log("authStatus", authStatus);
      if (authStatus === "true") {
        setIsAuthenticated(true);
        // console.log(isAuthenticated);
        setLoggedInUser(user);
        // console.log(user);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getUserApi();
  }, []);
  // useEffect(() => {
  //   console.log("App isAuthenticated:", isAuthenticated);
  // }, [isAuthenticated]);

  return (
    <div className="app-container">
      <main>
        <userContext.Provider
          value={{
            loggedInUser,
            setLoggedInUser,
            users,
            setIsAuthenticated,
            setUsers,
          }}
        >
          <Router>
            <RouteConfig
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          </Router>
        </userContext.Provider>
      </main>
    </div>
  );
}

export default App;
export { userContext };
