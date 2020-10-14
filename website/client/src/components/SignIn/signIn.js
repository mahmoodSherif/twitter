import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/auth";

async function fetch(username, password) {
  const ret = await axios({
    method: "post",
    url: "http://localhost:3000/login/",
    headers: { "Content-Type": "application/json" },
    data: {
      username,
      password,
    },
  });
  switch (ret.status) {
    case 200:
      return ret.data;
    default:
      return false;
  }
}

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  function onUsernameChange(e) {
    setUsername(e.target.value);
  }
  function onPasswordChange(e) {
    setPassword(e.target.value);
  }
  async function onSubmit(e) {
    e.preventDefault();
    const data = await fetch(username, password);
    if (data) {
      setCurrentUser({
        user: data.user,
        token: data.token,
      });
      setPassword("");
      setUsername("");
    }
  }
  return currentUser.user ? (
    <h1>already signed in as {currentUser.user.username}</h1>
  ) : (
    <form onSubmit={onSubmit}>
      <label>
        username
        <input type="text" value={username} onChange={onUsernameChange} />
      </label>
      <label>
        password
        <input type="password" value={password} onChange={onPasswordChange} />
      </label>
      <input type="submit" />
    </form>
  );
}
