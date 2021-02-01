import { Avatar, Button, Card, CardHeader, CardMedia } from "@material-ui/core";
import React, { useState } from "react";
import { useFetchData } from "../../actions/helper";

export default function UserInfo(props) {
  const [following, setFollowing] = useState(props.followed);
  const [follow, followFetch, endFetch] = useFetchData();

  function followButtonHandle() {
    if (following) {
      followFetch({
        url: `/users/${props.user.id}/followers`,
        method: "delete",
      });
    } else {
      followFetch({
        url: `/users/${props.user.id}/followers`,
        method: "post",
      });
    }
  }

  if (follow.data) {
    setFollowing(!following);
    endFetch();
  }

  return (
    <Card width={1} variant="outlined" square>
      <CardMedia component="img" height="250" image={props.user.bannerurl} />
      <CardHeader
        avatar={<Avatar src={props.user.photourl} />}
        title={props.user.nickname}
        subheader={"@" + props.user.username}
        action={
          !props.sameUser ? (
            <Button
              variant="contained"
              onClick={followButtonHandle}
              disabled={follow.isLoading}
            >
              {following ? "unfollow" : "follow"}
            </Button>
          ) : undefined
        }
      />
    </Card>
  );
}
