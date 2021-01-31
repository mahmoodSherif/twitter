import Axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SignIn from "../components/SignIn/signIn";

export const AuthContext = createContext({});

export default function AuthProvider(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [currentUser, setCurrentUser] = useState({ user, token });

  useEffect(() => {
    const run = async () => {
      const config = {
        method: "get",
        url: `http://localhost:3000/users/${currentUser?.user?.id}/exist`,
        headers: {
          Authorization: "Bearer " + currentUser.token,
        },
      };
      try {
        if (currentUser?.user) await Axios(config);
      } catch (err) {
        setCurrentUser({});
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    };
    run();
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function CheckSignIn(props) {
  const { currentUser } = useContext(AuthContext);
  return currentUser?.user ? props.children : <SignIn />;
}
