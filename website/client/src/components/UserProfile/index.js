import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../actions/helper";
import TweetForm from "../TweetForm/TweetForm";
import TweetList from "../TweetList/TweetList";

export default function UserProfile() {
  const { userId } = useParams();
  const [user, fetchUser] = useFetchData();
  const [tweets, fetchTweets] = useFetchData();

  useEffect(() => {
    fetchUser({ method: "get", url: `/users/${userId}` });
  }, [fetchUser, userId]);

  useEffect(() => {
    fetchTweets({ method: "get", url: `/users/${userId}/tweets` });
  }, [fetchTweets, userId]);

  return (
    <div>
      {user.data && (
        <div>
          <h3>{user.data.nickname}</h3>
          <h3>@{user.data.username}</h3>
          {/* <button>{followed}</button> */}
        </div>
      )}
      <TweetForm />
      {tweets.data && <TweetList tweets={tweets.data} />}
    </div>
  );
}
