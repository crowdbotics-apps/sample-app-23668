import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Link,
  CircularProgress,
} from "@material-ui/core";

import AddAdmin from "./AddAdmin";
import Admins from "./Admins";
import EditAdmin from "./editAdmin";
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

export default function AdminsScreen() {
  const classes = useStyles();
  const [, setOpen] = React.useState(true);
  const [admins, setAdmins] = useState(null);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [showEditAdmin, setShowEditAdmin] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState({});
  return (
    <Container maxWidth="lg" className={classes.addAdminContainer}>
      {showAddAdmin ? (
        <Grid container spacing={3}>
          <Grid item xs={1}></Grid>

          <Grid item xs={10}>
            <Paper className={classes.paper}>
              <AddAdmin
                setShowAddAdmin={setShowAddAdmin}
                admins={admins}
                setAdmins={setAdmins}
              />
            </Paper>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      ) : showEditAdmin ? (
        <Grid container spacing={3}>
          <Grid item xs={1}></Grid>

          <Grid item xs={10}>
            <Paper className={classes.paper}>
              <EditAdmin
                setShowEditAdmin={setShowEditAdmin}
                admins={admins}
                setAdmins={setAdmins}
                currentAdmin={currentAdmin}
              />
            </Paper>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Admins
                admins={admins}
                setAdmins={setAdmins}
                setShowAddAdmin={setShowAddAdmin}
                setShowEditAdmin={setShowEditAdmin}
                setCurrentAdmin={setCurrentAdmin}
                currentAdmin={currentAdmin}
              />
            </Paper>
          </Grid>
        </Grid>
      )}

      <Box pt={4}>
        <Copyright />
      </Box>
    </Container>
  );
}

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    backgroundColor: "#f8f8f8",
  },
  addAdminContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  logoutItems: {
    marginRight: theme.spacing(1),
  },
  logoutText: {
    textTransform: "none",
  },
}));
