import {
  AppBar,
  Badge,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

const useStyles = makeStyles({
  root: { flexGrow: 1 },
  title: { flexGrow: 1 },
});

export function TopBar() {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  const classes = useStyles();

  function onAccountCircleClick() {
    if (currentUser.user) {
      history.push("/userProfile/" + currentUser.user.id);
    } else {
      history.push("/signIn");
    }
  }

  function onHomeClick() {
    history.push("/");
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={onHomeClick}>
            <Badge color="secondary">
              <HomeIcon />
            </Badge>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Twitter
          </Typography>
          <div>
            <IconButton
              color="inherit"
              edge="end"
              onClick={onAccountCircleClick}
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
