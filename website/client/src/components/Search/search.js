import { Card, CardHeader, Grid, TextField } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { fetch } from "../../actions/helper";
import { AuthContext } from "../../contexts/auth";

export default function Search() {
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const run = async () => {
      if (text.length > 1) {
        const ret = await fetch({
          url: `/users/search/${text}`,
          method: "get",
          token: currentUser.token,
        });
        setUsers(ret);
      } else {
        setUsers([]);
      }
    };
    run();
  }, [currentUser.token, text]);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid
        item
        sm={12}
        md={8}
        lg={6}
        container
        spacing={1}
        direction="column"
        justify="center"
        alignItems="stretch"
      >
        <Grid item>
          <Card width={1}>
            <TextField
              variant="outlined"
              fullWidth={1}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </Card>
        </Grid>

        {users.map((user) => (
          <Grid item key={user.id}>
            <Card width={1}>
              <CardHeader
                onClick={() => {
                  history.push(`/userProfile/${user.id}`);
                }}
                title={user.nickname}
                subheader={"@" + user.username}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
