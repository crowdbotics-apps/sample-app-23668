import React, { useState, useEffect } from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import { Adminouter } from "next/router";
import axios from "axios";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
import Loading from "../../../components/Loading";
function EditAdmin({ setShowEditAdmin, currentAdmin }) {
  const classes = useStyles();
  const [name, setName] = useState(currentAdmin.name);
  const [email, setEmail] = useState(currentAdmin.email);
  const [password, setPassword] = useState(currentAdmin.password);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const editAdmin = async () => {
    try {
      if (name.length < 1) {
        setError("Please enter name");
      } else if (email.length < 1) {
        setError("Please enter email");
      } else if (password.length < 6) {
        setError("Please enter a password atleast 6 chars long");
      } else {
        setLoading(true);
        setError("");
        const response = await axios({
          method: "get",
          url: "/api/admin/edit",
          responseType: "json",
          params: {
            name,
            email,
            password,
            checkEmail: currentAdmin.email != email,
            id: currentAdmin.id,
          },
        });
        setEmail("");
        setPassword("");
        setName("");

        setLoading(false);
        setShowEditAdmin(false);
      }
    } catch (error) {
      setLoading(false);
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      )
        setError(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <Grid spacing={4}>
      <Typography className={classes.header} component="h1" variant="h5">
        Edit Admin
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6} spacing={3}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Name"
              autoFocus
              value={name}
              onChange={(obj) => {
                setName(obj.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} lg={6} spacing={3}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              value={email}
              onChange={(obj) => {
                setEmail(obj.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} lg={6} spacing={3}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              //   type="password"
              autoComplete="current-password"
              value={password}
              onChange={(obj) => {
                setPassword(obj.target.value);
              }}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs m={2}>
            <Typography variant="body2" className={classes.error}>
              {error}
            </Typography>
          </Grid>
        </Grid>
        {loading ? (
          <Container className={classes.loading}>
            <Loading />
          </Container>
        ) : (
          <Grid container spacing={2} className={classes.submit}>
            <Grid item spacing={3}>
              <Button
                color="info"
                variant="contained"
                onClick={async () => setShowEditAdmin(false)}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item spacing={3}>
              <Button color="primary" variant="contained" onClick={editAdmin}>
                Update
              </Button>
            </Grid>
          </Grid>
        )}
      </form>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loader: {
    margin: theme.spacing(5),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "#fff",
  },
  error: {
    color: "red",
  },
  loading: {
    marginLeft: 20,
    marginTop: 20,
  },
}));

export default EditAdmin;
