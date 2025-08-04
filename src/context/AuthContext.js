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
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('suza_user'));
      return storedUser ? storedUser : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('suza_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('suza_user');
    }
  }, [user]);

  const login = (userData) => {
    // Hakikisha role inahifadhiwa kama lowercase
    setUser({
      ...userData,
      role: userData.role.toLowerCase()
    });
  };

  const logout = () => {
    setUser(null);
  };

  const register = (formData) => {
    console.log('Registering user:', formData);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
