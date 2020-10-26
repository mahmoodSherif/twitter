import React from "react";
import { useParams } from "react-router-dom";
import { useTweetsByUser } from "../../actions/tweets";
import { useUserData } from "../../actions/user";
import { useUserFollowed } from "../../actions/user";
import TweetForm from "../TweetForm/TweetForm";
import TweetList from "../TweetList/TweetList";

export default function UserProfile() {
  const { userId } = useParams();
  const user = useUserData(userId);
  // const followed = useUserFollowed(userId);
  const tweets = useTweetsByUser(userId);
  return user && tweets ? (
    <div>
      <div>
        <h3>{user.nickname}</h3>
        <h3>@{user.username}</h3>
        {/* <button>{followed}</button> */}
      </div>
      <TweetForm />
      <TweetList tweets={tweets} />
    </div>
  ) : (
    <h1>loading...</h1>
  );
}
