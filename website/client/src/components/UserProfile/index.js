import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../actions/helper";
import { AuthContext } from "../../contexts/auth";
import TweetForm from "../TweetForm/TweetForm";
import TweetList from "../TweetList/TweetList";
import UserInfo from "../UserInfo/UserInfo";

const useStyles = makeStyles({
  circularProgress: {
    padding: "10px",
  },
});

export default function UserProfile() {
  const { userId } = useParams();
  const [user, fetchUser] = useFetchData();
  const [tweets, fetchTweets] = useFetchData();
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);

  function updateTweets() {
    fetchTweets({ method: "get", url: `/users/${userId}/tweets` });
  }

  useEffect(() => {
    fetchUser({ method: "get", url: `/users/${userId}` });
  }, [fetchUser, userId]);

  useEffect(() => {
    fetchTweets({ method: "get", url: `/users/${userId}/tweets` });
  }, [fetchTweets, userId]);

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
        {user.data && (
          <Grid item>
            <UserInfo
              user={user.data}
              sameUser={userId.toString() === currentUser.user.id.toString()}
              followed={user.data.following}
            />
          </Grid>
        )}
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
