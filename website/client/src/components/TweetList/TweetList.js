import React from "react";
import Tweet from "../Tweet/Tweet";
import "./tweetList.css";

export default function TweetList(props) {
  return (
    <ul>
      {props.tweets.map((tweet) => (
        <li key={tweet.id}>
          <Tweet tweet={tweet} />
        </li>
      ))}
    </ul>
  );
}
