import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
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
import { useHistory } from "react-router-dom";
import CommentsList from "../Comments/commentList";
import { AuthContext } from "../../contexts/auth";
import { fetch } from "../../actions/helper";
import { Fastfood } from "@material-ui/icons";

function useLikeStatues(initLikeStatues, tweetId, initLikesCount) {
  const [liked, setLiked] = useState(initLikeStatues);
  const [likeChange, setLikeChange] = useState("non");
  const [likesCount, setLikeCount] = useState(initLikesCount);
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
    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setLiked((prev) => !prev);
  };

  return [liked, toggle, likesCount];
}

function useComments(tweetId) {
  const [comments, setComments] = useState([]);
  const [canLoadComments, setCanLoadComments] = useState(false);
  const [newComment, setNewComment] = useState();
  const { currentUser } = useContext(AuthContext);
  const [commentStatus, setCommentStatus] = useState({
    isLoading: false,
    error: false,
  });

  useEffect(() => {
    const url = `/tweets/${tweetId}/comments`;
    const run = async () => {
      if (newComment) {
        setCommentStatus({ error: false, isLoading: true });
        try {
          await fetch({
            url,
            method: "post",
            postData: newComment,
            token: currentUser.token,
          });
          setCommentStatus({ error: false, isLoading: false });
        } catch (err) {
          setCommentStatus({ error: true, isLoading: false });
        }
      }
      if (canLoadComments) {
        setCommentStatus({ error: false, isLoading: true });
        try {
          setComments(
            await fetch({ url, method: "get", token: currentUser.token })
          );
          setCommentStatus({ error: false, isLoading: false });
        } catch (err) {
          setCommentStatus({ error: true, isLoading: false });
        }
      }
    };
    run();
  }, [currentUser.token, tweetId, newComment, canLoadComments]);

  function loadComments() {
    setCanLoadComments(true);
  }
  return { comments, setNewComment, loadComments, commentStatus };
}

const useStyles = makeStyles({
  circularProgress: {
    padding: "10px",
  },
});

export default function Tweet(props) {
  const [expanded, setExpanded] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const [liked, toggleLiked, likesCount] = useLikeStatues(
    props.liked,
    props.tweet.id,
    props.tweet.likes_count
  );
  const { comments, setNewComment, loadComments, commentStatus } = useComments(
    props.tweet.id
  );
  const [newCommentText, setNewCommentText] = useState("");

  function handleExpandClick() {
    loadComments();
    setExpanded(!expanded);
  }
  function commentOnClick() {
    setNewComment({ text: newCommentText });
    setNewCommentText("");
  }
  return (
    <Card width={1} variant="outlined" square>
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
        <IconButton aria-label="like" onClick={toggleLiked}>
          {liked ? <FavoriteIcon /> : <FavoriteBorder />}
        </IconButton>
        {likesCount}
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
          {commentStatus.isLoading && (
            <CircularProgress className={classes.circularProgress} />
          )}
          <CommentsList comments={comments} />
        </CardContent>
      </Collapse>
    </Card>
  );
}
