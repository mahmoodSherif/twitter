import React, { useEffect, useState } from "react";
import axios from "axios";
import Tweet from "../Tweet/Tweet";
import "./tweetList.css";

export default function TweetList() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    (async () => {
      const ret = await axios({
        method: "get",
        url: "http://localhost:3000/feed/",
        headers: {},
      });
      setTweets(ret.data);
    })();
  }, []);
  return (
    <ul>
      {tweets.map((tweet) => (
        <li key={tweet.id}>
          <Tweet tweet={tweet} />
        </li>
      ))}
    </ul>
  );
}
