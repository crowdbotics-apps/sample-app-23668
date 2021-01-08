import React, { useState, useEffect } from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import { useRouter } from "next/router";
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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Burden Of Proof
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const classes = useStyles();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {}, [loading]);
  function returnContent() {
    if (loading == true) {
      return <CircularProgress className={classes.loader} />;
    }
    return (
      <Grid>
        <Typography className={classes.header} component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(obj) => {
              setEmail(obj.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(obj) => {
              setPassword(obj.target.value);
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                style={{
                  color: "rgb(32, 46, 223)",
                }}
              />
            }
            label="Remember me"
          />
          <Button
            fullWidth
            color="primary"
            variant="contained"
            className={classes.submit}
            onClick={async () => {
              setLoading(true);
              const response = await axios({
                method: "get",
                url: "/api/login",
                responseType: "json",
                params: {
                  email,
                  password,
                },
              });
              if (response.data.login == true) {
                console.log("Logged In");
                console.log(response.data.admin);
                localStorage.setItem(
                  "admin",
                  JSON.stringify(response.data.admin)
                );
                router.push("/main");
              } else {
                console.log("Not Logged");
                setLoading(false);
              }
            }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs m={2}>
              <Link href="/main" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </Grid>
    );
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar style={{ backgroundColor: "#fff" }}>
          <Image
            src="/houseblue.png"
            alt="Picture of the author"
            width={500}
            height={500}
          />
        </Avatar>
        <Typography component="h1" variant="h5">
          Burden Of Proof
        </Typography>
        {returnContent()}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
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
    backgroundColor: "rgb(32, 46, 223)",
  },
}));
