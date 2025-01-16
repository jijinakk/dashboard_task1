import React, { Children, useMemo } from 'react'
import { useState, useEffect, createContext } from "react";

const userContext = createContext();

const UserContext = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState("")
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(token ? true : false);
      }, []);
      const [users, setUsers] = useState([]);
      const [loggedInUser, setLoggedInUser] = useState(() => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
      });
      useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token)
        {
          setIsAuthenticated(true);
        }
      },[])
      const contextValue = useMemo(() => ({
        isAuthenticated,
        setIsAuthenticated,
        loggedInUser,
        setLoggedInUser,
        users,
        setUsers,
      }), [isAuthenticated, loggedInUser, users]);
    
      return (
        <userContext.Provider value={contextValue}>
          {children}
        </userContext.Provider>
  )
}

export { UserContext, userContext };
