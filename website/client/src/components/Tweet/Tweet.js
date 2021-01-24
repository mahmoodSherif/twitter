import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Collapse,
  Grid,
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
import CommentsList from "../Comments/commentList";

const useStyles = makeStyles({
  circularProgress: {
    padding: "10px",
  },
});

export default function Tweet(props) {
  const [liked, setLiked] = useState(props.liked | false);
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState(null);
  const [newCommentText, setNewCommentText] = useState("");

  const [newLikeFetcher, fetchNewLike, clearLikeFetcher] = useFetchData();
  const [
    commentListFetcher,
    fetchCommentList,
    clearCommentListFetcher,
  ] = useFetchData();
  const [newCommentFetcher, fetchNewComment] = useFetchData();

  const history = useHistory();
  const classes = useStyles();

  function handleExpandClick() {
    setExpanded(!expanded);
    if (!comments) {
      fetchCommentList({
        url: `/tweets/${props.tweet.id}/comments/`,
        method: "get",
      });
    }
  }

  function handleLikeClick() {
    if (!liked) {
      fetchNewLike({ url: `/tweets/${props.tweet.id}/likes`, method: "post" });
    } else {
      fetchNewLike({
        url: `/tweets/${props.tweet.id}/likes`,
        method: "delete",
      });
    }
  }

  function commentTextChangeHandle(e) {
    setNewCommentText(e.target.value);
  }

  function newCommentSubmit() {
    fetchNewComment({
      url: `/tweets/${props.tweet.id}/comments`,
      method: "post",
      postData: { text: newCommentText },
    });
  }

  if (newLikeFetcher.data) {
    setLiked(!liked);
    clearLikeFetcher();
  }

  if (commentListFetcher.data) {
    setComments(commentListFetcher.data);
    clearCommentListFetcher();
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
          <TextField onChange={commentTextChangeHandle} text={newCommentText} />
          <Button
            variant="contained"
            onClick={newCommentSubmit}
            disabled={newCommentFetcher.isLoading}
          >
            Comment
          </Button>
          {commentListFetcher.isLoading && (
            <CircularProgress className={classes.circularProgress} />
          )}
          {comments && <CommentsList comments={comments} />}
        </CardContent>
      </Collapse>
    </Card>
  );
}
