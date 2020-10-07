import React, { useState } from 'react';
import './tweet.css';

function checkLiked(likes, userId) {
  likes.forEach((user) => {
    if (user.id === userId) {
      return true;
    }
  });
  return false;
}

export default function Tweet(props) {
  const [liked, setLiked] = useState(checkLiked(props.tweet.likes, 'current user id'));
  const [likes, setLikes] = useState(props.tweet.likes.length);
  function likeHandle() {
    setLiked(!liked);
    setLikes(likes + (liked ? -1 : 1));
  }
  return (
        <div className="tweet">
          <img src={props.tweet.user.photoUrl} alt="user" className="avatar"/>
          <div className="naming">
              <p className="nickname">{props.tweet.user.nickname}</p>
            <p className="username">@{props.tweet.user.username}</p>
          </div>
          <p className="date">{(new Date(props.tweet.createdAt)).toDateString()}</p>
          <p>{props.tweet.text}</p>
      <p className={liked ? 'liked' : undefined}>{likes} likes</p>
      <button onClick={likeHandle}>like</button>
        </div>
  );
}
