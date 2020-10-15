import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Tweet from "../Tweet/Tweet";
import "./tweetList.css";
import { AuthContext } from "../../contexts/auth";

export default function TweetList(props) {
  const [tweets, setTweets] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const ret = await axios({
        method: "get",
        url: "http://localhost:3000" + props.url,
        headers: {
          Authorization: "Bearer " + currentUser.token,
        },
      });
      console.log(ret.request);
      setTweets(ret.data);
    })();
  }, [currentUser.token, props.url]);
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
