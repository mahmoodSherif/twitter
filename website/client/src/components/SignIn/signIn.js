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
import { useFetchData } from "../../actions/helper";

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
  const [user, fetchUserData, endUser] = useFetchData();

  const classes = useStyles();

  function onUsernameChange(e) {
    setUsername(e.target.value);
  }
  function onPasswordChange(e) {
    setPassword(e.target.value);
  }
  function onSubmit(e) {
    e.preventDefault();
    fetchUserData({
      postData: { username, password },
      url: "/login/",
      method: "post",
    });
  }

  if (user.data) {
    setCurrentUser({
      user: user.data.user,
      token: user.data.token,
    });
    localStorage.setItem("user", JSON.stringify(user.data.user));
    localStorage.setItem("token", user.data.token);
    setPassword("");
    setUsername("");
    endUser();
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
