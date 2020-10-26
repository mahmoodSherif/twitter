import React from "react";
import "./tweet.css";

export default function Tweet(props) {
  return (
    <div className="tweet">
      <img src={props.user.photourl} alt="user" className="avatar" />
      <div className="naming">
        <p className="nickname">{props.user.nickname}</p>
        <p className="username">@{props.user.username}</p>
      </div>
      <p className="date">{new Date(props.tweet.createdat).toDateString()}</p>
      <p>{props.tweet.text}</p>
    </div>
  );
}
