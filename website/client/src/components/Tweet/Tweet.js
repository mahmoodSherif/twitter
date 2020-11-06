import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import CommentIcon from "@material-ui/icons/Comment";
import React, { useState } from "react";
import "./tweet.css";

export default function Tweet(props) {
  const [liked, setLiked] = useState(props.tweet.liked | false);
  const [expanded, setExpanded] = useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  function handleLikeClick() {
    setLiked(!liked);
  }
  return (
    <Card width={1}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <img src={props.user.photourl} alt="user" className="avatar" />
          </Avatar>
        }
        title={props.user.nickname}
        subheader={"@" + props.user.username}
      />
      <CardContent>
        <Typography variant="body2" color="text" component="p">
          {props.tweet.text}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="comment" onClick={handleLikeClick}>
          {liked ? <FavoriteIcon /> : <FavoriteBorder />}
        </IconButton>
        <IconButton onClick={handleExpandClick} aria-label="comment">
          <CommentIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <TextField></TextField>
        </CardContent>
      </Collapse>
    </Card>
  );
}
