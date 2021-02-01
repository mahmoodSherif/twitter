import {
  Button,
  Card,
  Grid,
  LinearProgress,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { useFetchData } from "../../actions/helper";

const useStyles = makeStyles({
  root: {},
  paper: {
    padding: "15px",
    marginTop: "15px",
  },
});

export default function TweetForm(props) {
  const [text, setText] = useState("");
  const [valid, setValid] = useState(true);
  const classes = useStyles();
  const [tweet, fetch] = useFetchData();

  function textChangeHandle(e) {
    setText(e.target.value);
    if (e.target.value.length < 280) {
      setValid(true);
    } else {
      setValid(false);
    }
  }
  function submitHandle(e) {
    e.preventDefault();
    fetch({
      method: "post",
      url: "/tweets/",
      postData: { text },
      callback: props.update,
    });
    setText("");
  }
  return (
    <Card className={classes.paper} width={1} variant="outlined" square>
      {tweet.isLoading && <LinearProgress />}
      <form onSubmit={submitHandle} noValidate>
        <Grid container justify="center" alignItems="center" direction="column">
          <Grid item>
            <TextField
              error={!valid}
              label="new tweet"
              variant="outlined"
              value={text}
              onChange={textChangeHandle}
            />
          </Grid>
          <Button type="submit" variant="contained">
            Tweet
          </Button>
        </Grid>
      </form>
    </Card>
  );
}
