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
  Tooltip,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import CommentIcon from "@material-ui/icons/Comment";
import React, { useState } from "react";
import "./tweet.css";
import { useHistory } from "react-router-dom";
import { useFetchData } from "../../actions/helper";

export default function Tweet(props) {
  const [liked, setLiked] = useState(props.liked | false);
  const [expanded, setExpanded] = useState(false);
  const [likeData, likeFetch, endLikeFetch] = useFetchData();
  const history = useHistory();

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  function handleLikeClick() {
    if (!liked) {
      likeFetch({ url: `/tweets/${props.tweet.id}/likes`, method: "post" });
    } else {
      likeFetch({ url: `/tweets/${props.tweet.id}/likes`, method: "delete" });
    }
  }

  if (likeData.data) {
    setLiked(!liked);
    endLikeFetch();
  }

  return (
    <Card width={1}>
      <CardHeader
        onClick={() => {
          history.push(`/userProfile/${props.user.id}`);
        }}
        avatar={
          <Avatar>
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
