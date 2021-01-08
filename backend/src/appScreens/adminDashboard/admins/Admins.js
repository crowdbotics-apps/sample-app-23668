import React, { useEffect, useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "../../userDashboard/Title";
import Axios from "axios";
import {
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Button,
  Tooltip,
} from "@material-ui/core";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@material-ui/icons";
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

export default function Admins({
  admins,
  setAdmins,
  setShowAddAdmin,
  setShowEditAdmin,
  setCurrentAdmin,
  currentAdmin,
}) {
  useEffect(() => {
    loadAdmins();
  }, []);
  const loadAdmins = async () => {
    let data = (await Axios.get("/api/admin")).data;
    setAdmins(data);
  };
  const [open, setOpen] = React.useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const deleteAdmin = async () => {
    try {
      console.log("delete");
      let admin = JSON.parse(localStorage.getItem("admin"));
      if (admin.id == currentAdmin.id || admins.length < 1) {
        setOpen(false);
        return setDeleteError(true);
      } else {
        const response = await Axios({
          method: "get",
          url: "/api/admin/delete",
          responseType: "json",
          params: {
            id: currentAdmin.id,
          },
        });
        response.data && setAdmins(response.data);
      }
      setOpen(false);
    } catch (error) {
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>
        Admins
        <Tooltip title={"Add new admin"}>
          <IconButton onClick={() => setShowAddAdmin(true)}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Title>
      {admins && admins != null ? (
        <div>
          <div className={classes.admins}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align={"center"}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {admins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>{admin.name}</TableCell>
                    <TableCell align={"center"}>
                      <Tooltip title={"Edit"}>
                        <IconButton
                          onClick={() => {
                            setCurrentAdmin(admin);
                            setShowEditAdmin(true);
                          }}
                        >
                          <EditIcon fontSize={"small"} color={"primary"} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={"Delete"}>
                        <IconButton
                          onClick={() => {
                            setCurrentAdmin(admin);
                            setOpen(true);
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
            <DialogTitle id="alert-dialog-title">{"Delete Admin?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete{" "}
                {currentAdmin && currentAdmin.name}?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} style={{ color: "grey" }}>
                Cancel
              </Button>
              <Button style={{ color: "red" }} autoFocus onClick={deleteAdmin}>
                Ok
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={deleteError}
            onClose={() => setDeleteError(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Error!"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You cannot delete your own admin account!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteError(false)}>Ok</Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <Container className={classes.loadingContainer}>
          <CircularProgress />
        </Container>
      )}
    </React.Fragment>
  );
}
