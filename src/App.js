import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/Login';
import './components/style.css'
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import Dashboard from './components/Dashboard1';
import { useState,useEffect} from 'react';
import Home from './components/Home';
import Product from './components/Product';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check localStorage for authentication status
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <main>
          <Routes>
          <Route path="/dashboard" element={<Dashboard setIsAuthenticated={setIsAuthenticated}/>}>
          <Route index element={<Home />} />
           <Route  path="home" element={<Home/>} />  {/* Correct relative path */}
           <Route path="product" element={<Product/>} />  {/* Correct relative path */}

          </Route>
            <Route
              path="/"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            {/* Add more routes as needed */}

          </Routes>
        </main>
      </div>
    </Router>
  );
};


export default App;