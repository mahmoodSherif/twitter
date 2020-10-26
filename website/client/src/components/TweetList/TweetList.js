import React from "react";
import Tweet from "../Tweet/Tweet";
import "./tweetList.css";

export default function TweetList(props) {
  return (
    <ul>
      {props.tweets.map((tweetObj) => (
        <li key={tweetObj.tweet.id}>
          <Tweet tweet={tweetObj.tweet} user={tweetObj.user} />
        </li>
      ))}
    </ul>
  );
}
