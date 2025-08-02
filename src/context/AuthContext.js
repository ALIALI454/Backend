// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Function to simulate registration
//   const register = (formData) => {
//     // Hapa unaweza kuweka API call ya register kwenye backend
//     // Kwa sasa tuna simulate, tunahifadhi user local state tu
//     console.log('Registering user:', formData);
//     // Simulate successful registration, user not logged in yet
//   };

//   // Function to simulate login
//   const login = (userData) => {
//     // Hapa unaweza API call login, authenticate user, etc.
//     console.log('Logging in user:', userData);
//     setUser(userData); // Save user data (email, role) as logged in
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login function: normalize role to lowercase safely
  const login = (userData) => {
    const role = userData?.role ? String(userData.role).toLowerCase() : null;
    setUser({ ...userData, role });
    localStorage.setItem("user", JSON.stringify({ ...userData, role }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Load user from localStorage on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
