import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/Login';
import './components/style.css'
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import Dashboard from './components/Dashboard1';
import { useState,useEffect, createContext} from 'react';
import Home from './components/Home';
import Product from './components/Product';
import Users from './components/Users';
import AddUser from './components/AddUser';

const userContext =createContext();
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState([]);
  // Check localStorage for authentication status
  useEffect(() => {
    fetch('https://dummyjson.com/users').then((res) => res.json()).then(data => setUsers(data.users));
    console.log(users);
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      const user = JSON.parse(localStorage.getItem('user'));
      setLoggedInUser(user);
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <main>
          <userContext.Provider value={{ loggedInUser, setLoggedInUser,users,setIsAuthenticated,setUsers}}>
          <Routes>
          <Route path="/dashboard" element={<Dashboard setIsAuthenticated={setIsAuthenticated}/>}>
          <Route index element={<Home />} />
           <Route  path="home" element={<Home/>} />  {/* Correct relative path */}
           <Route path="product" element={<Product/>} />  {/* Correct relative path */}
            <Route path="users" element={<Users />} />

          </Route>
            <Route
              path="/"
              element={<Login />}
            />
            {/* Add more routes as needed */}
            <Route path='adduser' element={<AddUser/>} />
          </Routes>
          </userContext.Provider>
        </main>
      </div>
    </Router>
  );
};


export default App;
export {userContext}