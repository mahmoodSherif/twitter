import { Grid } from "@material-ui/core";
import React from "react";
import Comment from "./comment";
export default function CommentsList(props) {
  return (
    <Grid
      item
      container
      spacing={1}
      direction="column"
      justify="center"
      alignItems="stretch"
    >
      {props.comments.map((commentObj) => (
        <Grid item key={commentObj.comment.id}>
          <Comment comment={commentObj.comment} user={commentObj.user} />
        </Grid>
      ))}
    </Grid>
  );
}
