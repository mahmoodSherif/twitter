import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { useFetchData } from "../../actions/helper";
import { AuthContext } from "../../contexts/auth";
import TweetForm from "../TweetForm/TweetForm";
import TweetList from "../TweetList/TweetList";

const useStyles = makeStyles({
  circularProgress: {
    padding: "10px",
  },
});

export default function Feed() {
  const { currentUser } = useContext(AuthContext);
  const [tweets, fetch] = useFetchData();
  const classes = useStyles();

  useEffect(() => {
    fetch({
      url: `/feed/`,
      method: "get",
    });
  }, [currentUser.user.id, fetch]);

  return (
    <div>
      <TweetForm />
      {tweets.isLoading && (
        <Grid container alignItems="center" justify="center">
          <CircularProgress className={classes.circularProgress} />
        </Grid>
      )}
      {tweets.data && <TweetList tweets={tweets.data} />}
      {tweets.error && <h1>ERROR</h1>}
    </div>
  );
}
