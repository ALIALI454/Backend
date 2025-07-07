import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to simulate registration
  const register = (formData) => {
    // Hapa unaweza kuweka API call ya register kwenye backend
    // Kwa sasa tuna simulate, tunahifadhi user local state tu
    console.log('Registering user:', formData);
    // Simulate successful registration, user not logged in yet
  };

  // Function to simulate login
  const login = (userData) => {
    // Hapa unaweza API call login, authenticate user, etc.
    console.log('Logging in user:', userData);
    setUser(userData); // Save user data (email, role) as logged in
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
