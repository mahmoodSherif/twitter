import React from "react";
import { useFeed } from "../../actions/tweets";
import TweetForm from "../TweetForm/TweetForm";
import TweetList from "../TweetList/TweetList";

export default function Feed() {
  const tweets = useFeed();
  return (
    <div>
      <TweetForm />
      {tweets ? <TweetList tweets={tweets} /> : <h1>Loading...</h1>}
    </div>
  );
}
