import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

export default function AuthProvider(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [currentUser, setCurrentUser] = useState({ user, token });
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}
