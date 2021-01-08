import React, { useEffect, useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Title from "../Title";
import Axios from "axios";
import {
  CircularProgress,
  Container,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  colors,
  Grid,
  TextField,
  Tooltip,
} from "@material-ui/core";
import {
  Add as AddIcon,
  Block as BlockIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@material-ui/icons";
import Pagination from "./Pagination";
function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 444,
  },
  minHeight: 200,
  users: {
    height: 400,
    maxHeight: 400,
    minHeight: 400,
    overflow: "scroll",
  },
}));

export default function Users({
  users,
  setUsers,
  setShowAddUser,
  setShowEditUser,
  setCurrentUser,
  currentUser,
}) {
  useEffect(() => {
    loadUsers();
  }, []);
  const loadUsers = async () => {
    let data = (await Axios.get("/api/users")).data;
    setUsers(data);
    setCurrentLimit(10);
    setText("");
    // console.log(users);
  };

  const [open, setOpen] = React.useState(false);

  const [currentLimit, setCurrentLimit] = useState(10);
  const [endReached, setEndReached] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [text, setText] = useState("");
  const [action, setAction] = useState("");
  const classes = useStyles();

  const deleteUser = async () => {
    try {
      console.log("delete");

      const response = await Axios({
        method: "get",
        url: "/api/user/delete",
        responseType: "json",
        params: {
          id: currentUser.id,
        },
      });

      response.data && setUsers(response.data);
      setEndReached(false);
      setOpen(false);
      setText("");
    } catch (error) {
      setOpen(false);
    }
  };

  const blockUser = async (disabled) => {
    try {
      console.log("block");

      const response = await Axios({
        method: "get",
        url: "/api/user/block",
        responseType: "json",
        params: {
          id: currentUser.id,
          disabled: disabled,
        },
      });

      response.data && setUsers(response.data);
      setEndReached(false);
      setOpen(false);
      setText("");
    } catch (error) {
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const search = async (text) => {
    try {
      if (text.length < 1) {
        setAllUsers(null);
        loadUsers();
      } else if (allUsers) {
        setUsers(
          allUsers.filter((u) => {
            let regex = new RegExp(text, "gi");
            if (
              u.name.match(regex) ||
              u.email.match(regex) ||
              u.accNumber.match(regex)
            ) {
              return u;
            }
          })
        );
      } else {
        setUsers(null);
        const response = await Axios({
          method: "get",
          url: "/api/user/list",
          responseType: "json",
        });
        response.data && setAllUsers(response.data);
        if (response.data && response.data.filter) {
          setUsers(
            response.data.filter((u) => {
              let regex = new RegExp(text, "gi");
              if (
                u.name.match(regex) ||
                u.email.match(regex) ||
                u.accNumber.match(regex)
              ) {
                return u;
              }
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <Container
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Title>
          Users
          <Tooltip title={"Add new user"}>
            <IconButton
              aria-label={"delete"}
              onClick={() => setShowAddUser(true)}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Title>
        <Grid item xs={6} lg={3} spacing={3}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Search"
            autoComplete="current-password"
            value={text}
            onChange={(obj) => {
              search(obj.target.value);
              setText(obj.target.value);
            }}
          />
        </Grid>
      </Container>
      {users && users != null ? (
        <div>
          <div className={classes.users}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Acc No</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align={"center"}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.accNumber}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell align={"center"}>
                      <Tooltip title={"Edit"}>
                        <IconButton
                          onClick={() => {
                            setCurrentUser(user);
                            setShowEditUser(true);
                          }}
                        >
                          <EditIcon fontSize={"small"} color={"primary"} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title={
                          user.disabled && user.disabled == "true"
                            ? "Unblock"
                            : "Block"
                        }
                      >
                        <IconButton
                          onClick={() => {
                            setCurrentUser(user);
                            setOpen(true);
                            setAction("block");
                          }}
                        >
                          <BlockIcon
                            fontSize={"small"}
                            style={{
                              color:
                                user.disabled && user.disabled == "true"
                                  ? colors.green[500]
                                  : colors.orange[900],
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={"Delete"}>
                        <IconButton
                          onClick={() => {
                            setCurrentUser(user);
                            setOpen(true);
                            setAction("delete");
                          }}
                        >
                          <DeleteIcon
                            fontSize={"small"}
                            style={{ color: "red" }}
                          />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {action == "delete"
                  ? `Are you sure you want to delete ${currentUser.name}`
                  : `Are you sure you want to ${
                      currentUser.disabled && currentUser.disabled == "true"
                        ? "unblock"
                        : "block"
                    } ${currentUser.name}`}
                ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} style={{ color: "grey" }}>
                Cancel
              </Button>
              <Button
                style={{ color: "red" }}
                autoFocus
                onClick={
                  action == "delete"
                    ? deleteUser
                    : () =>
                        blockUser(
                          currentUser.disabled == "true" ? "false" : "true"
                        )
                }
              >
                Ok
              </Button>
            </DialogActions>
          </Dialog>
          <Pagination
            users={users}
            setUsers={setUsers}
            currentLimit={currentLimit}
            setCurrentLimit={setCurrentLimit}
            endReached={endReached}
            setEndReached={setEndReached}
          />
        </div>
      ) : (
        <Container className={classes.loadingContainer}>
          <CircularProgress />
        </Container>
      )}
    </React.Fragment>
  );
}
