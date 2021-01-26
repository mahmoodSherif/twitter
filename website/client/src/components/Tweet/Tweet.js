import {
  Avatar,
  Button,
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
import React, { useContext, useEffect, useState } from "react";
import "./tweet.css";
import { useHistory } from "react-router-dom";
import CommentsList from "../Comments/commentList";
import { AuthContext } from "../../contexts/auth";
import { fetch } from "../../actions/helper";

function useLikeStatues(initLikeStatues, tweetId) {
  const [liked, setLiked] = useState(initLikeStatues);
  const [likeChange, setLikeChange] = useState("non");
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    console.log("useEffect");
    const url = `/tweets/${tweetId}/likes`;
    const method = likeChange === "like" ? "post" : "delete";

    const run = async () => {
      if (likeChange !== "non") {
        await fetch({ url, method, token: currentUser.token });
      }
    };
    run();
  }, [currentUser.token, likeChange, tweetId]);

  const toggle = () => {
    setLikeChange(liked ? "disLike" : "like");
    setLiked((prev) => !prev);
  };

  return [liked, toggle];
}

function useComments(tweetId) {
  const [comments, setComments] = useState([]);
  const [loadComments, setLoadComments] = useState(false);
  const [newComment, setNewComment] = useState();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const url = `/tweets/${tweetId}/comments`;
    const run = async () => {
      if (newComment) {
        await fetch({
          url,
          method: "post",
          postData: newComment,
          token: currentUser.token,
        });
      }
      if (loadComments) {
        setComments(
          await fetch({ url, method: "get", token: currentUser.token })
        );
      }
    };
    run();
  }, [currentUser.token, tweetId, newComment, loadComments]);

  function load() {
    setLoadComments(true);
  }
  return [comments, setNewComment, load];
}

export default function Tweet(props) {
  const [expanded, setExpanded] = useState(false);
  const history = useHistory();

  const [liked, toggleLiked] = useLikeStatues(props.liked, props.tweet.id);
  const [comments, addNewComment, loadComments] = useComments(props.tweet.id);
  const [newCommentText, setNewCommentText] = useState("");

  function handleExpandClick() {
    loadComments();
    setExpanded(!expanded);
  }
  function commentOnClick() {
    addNewComment({ text: newCommentText });
    setNewCommentText("");
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
        <IconButton aria-label="comment" onClick={toggleLiked}>
          {liked ? <FavoriteIcon /> : <FavoriteBorder />}
        </IconButton>
        <IconButton onClick={handleExpandClick} aria-label="comment">
          <CommentIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <TextField
            onChange={(e) => setNewCommentText(e.target.value)}
            value={newCommentText}
          />
          <Button variant="contained" onClick={commentOnClick}>
            Comment
          </Button>
          <CommentsList comments={comments} />
        </CardContent>
      </Collapse>
    </Card>
  );
}
