import React, { Children, useMemo } from 'react'
import { useState, useEffect, createContext } from "react";

const userContext = createContext();

const UserContext = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? true : false;
    });
      const [users, setUsers] = useState([]);
      const [loggedInUser, setLoggedInUser] = useState(() => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
      });
      const [showSidebar, setShowSidebar] = useState(true);

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
        showSidebar,
        setShowSidebar
      }), [isAuthenticated, loggedInUser, users, showSidebar]);
    
      return (
        <userContext.Provider value={contextValue}>
          {children}
        </userContext.Provider>
  )
}

export { UserContext, userContext };
