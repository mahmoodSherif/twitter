import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/auth";
import {
  Button,
  TextField,
  Grid,
  Paper,
  makeStyles,
  Avatar,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

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

const useStyles = makeStyles({
  textField: {
    margin: "10px",
  },
  root: {
    height: "500px",
  },
  button: {},
  logInPaper: {
    padding: "10px",
  },
});

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const classes = useStyles();

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
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Paper className={classes.logInPaper}>
        <form onSubmit={onSubmit}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <TextField
              className={classes.textField}
              required
              label="username"
              type="text"
              value={username}
              variant="outlined"
              onChange={onUsernameChange}
            />
            <TextField
              required
              className={classes.textField}
              label="password"
              type="password"
              value={password}
              variant="outlined"
              onChange={onPasswordChange}
            />
            <Button
              variant="contained"
              type="submit"
              className={classes.button}
            >
              log in
            </Button>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
}
