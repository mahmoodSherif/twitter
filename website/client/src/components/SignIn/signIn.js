import React, { useContext, useState } from "react";
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
import { fetch } from "../../actions/helper";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  if (currentUser?.user) {
    history.push("/");
  }
  const classes = useStyles();

  function onSubmit(e) {
    e.preventDefault();
    fetch({
      url: "/login/",
      method: "post",
      postData: { username, password },
    }).then((data) => {
      const { user, token } = data;
      setCurrentUser({
        user,
        token,
      });
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      setPassword("");
      setUsername("");
    });
  }

  return currentUser?.user ? (
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
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              required
              className={classes.textField}
              label="password"
              type="password"
              value={password}
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
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
