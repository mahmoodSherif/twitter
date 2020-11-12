import { Grid } from "@material-ui/core";
import React from "react";
import Tweet from "../Tweet/Tweet";
import "./tweetList.css";

export default function TweetList(props) {
  return (
    <Grid
      item
      container
      spacing={1}
      direction="column"
      justify="center"
      alignItems="stretch"
    >
      {props.tweets.map((tweetObj) => (
        <Grid item>
          <Tweet
            tweet={tweetObj.tweet}
            user={tweetObj.user}
            liked={tweetObj.liked}
          />
        </Grid>
      ))}
    </Grid>
  );
}
