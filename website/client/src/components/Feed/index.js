import React from "react";
import TweetForm from "../TweetForm/TweetForm";
import TweetList from "../TweetList/TweetList";

export default function Feed() {
  return (
    <div>
      <TweetForm />
      <TweetList url="/feed/" />
    </div>
  );
}
