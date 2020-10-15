import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/auth";

async function fetch(user) {
  const ret = await axios({
    method: "post",
    url: "http://localhost:3000/users/",
    headers: { "Content-Type": "application/json" },
    data: {
      ...user,
    },
  });
  switch (ret.status) {
    case 200:
      return ret.data;
    default:
      return false;
  }
}

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const { currentUser } = useContext(AuthContext);

  function onUsernameChange(e) {
    setUsername(e.target.value);
  }
  function onPasswordChange(e) {
    setPassword(e.target.value);
  }
  function onNicknameChange(e) {
    setNickname(e.target.value);
  }
  function onEmailChange(e) {
    setEmail(e.target.value);
  }
  async function onSubmit(e) {
    e.preventDefault();
    const data = await fetch({
      username,
      password,
      nickname,
      email,
    });
    if (data) {
      setPassword("");
      setUsername("");
      setNickname("");
      setEmail("");
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
      <label>
        nickname
        <input type="text" value={nickname} onChange={onNicknameChange} />
      </label>
      <label>
        email
        <input type="email" value={email} onChange={onEmailChange} />
      </label>
      <input type="submit" />
    </form>
  );
}
