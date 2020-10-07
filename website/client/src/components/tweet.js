import React from 'react';

export default function Tweet(props) {
  return (
        <div>
          <img src={props.tweet.user.photoUrl} alt="user" />
          <h3>{props.tweet.user.nickname}</h3>
          <h4>{props.tweet.user.username}</h4>
          <p>{props.tweet.text}</p>
          <p>{props.tweet.likes.length} likes</p>
          <p>{props.tweet.createdAt}</p>
        </div>
  );
}
