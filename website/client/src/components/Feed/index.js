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

  function updateTweets() {
    fetch({
      url: `/feed/`,
      method: "get",
    });
  }

  useEffect(() => {
    fetch({
      url: `/feed/`,
      method: "get",
    });
  }, [currentUser.user.id, fetch]);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid
        item
        sm={12}
        md={8}
        lg={6}
        container
        spacing={1}
        direction="column"
        justify="center"
        alignItems="stretch"
      >
        <Grid item>
          <TweetForm update={updateTweets} />
        </Grid>

        {tweets.isLoading && (
          <Grid item container alignItems="center" justify="center">
            <CircularProgress className={classes.circularProgress} />
          </Grid>
        )}
        {tweets.data && (
          <Grid item>
            <TweetList tweets={tweets.data} />
          </Grid>
        )}
        {tweets.error && <h1>ERROR</h1>}
      </Grid>
    </Grid>
  );
}
