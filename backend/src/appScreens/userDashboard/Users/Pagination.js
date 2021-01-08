import { Button, Container, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
const Pagination = ({
  users,
  setUsers,
  currentLimit,
  setCurrentLimit,
  endReached,
  setEndReached,
}) => {
  const classes = useStyles();

  const loadUsers = async () => {
    if (endReached) return;
    setUsers(null);

    const response = await Axios({
      method: "get",
      url: "/api/users",
      responseType: "json",
      params: {
        limit: currentLimit + 10,
      },
    });
    let data = response.data;
    if (users && data && users.length == data.length) {
      setEndReached(true);
    }
    setCurrentLimit(currentLimit + 10);
    setUsers(data);
  };
  return (
    <Grid className={classes.buttons}>
      <Grid item>
        <Button
          color={"primary"}
          onClick={() => {
            loadUsers();
          }}
        >
          More
        </Button>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: theme.spacing(1),
  },

  error: {
    color: "red",
  },
  loading: {
    marginLeft: 20,
    marginTop: 20,
  },
}));

export default Pagination;
