import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import SearchIcon from "@material-ui/icons/Search";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { useRouter } from "next/router";

export const NavItems = () => {
  let router = useRouter();
  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText
          primary="Dashboard"
          onClick={() => router.push("/main")}
        />
      </ListItem>
      {/* <ListItem button>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Search" />
      </ListItem> */}
      <ListItem button>
        <ListItemIcon>
          <PeopleAltIcon />
        </ListItemIcon>
        <ListItemText primary="Admins" onClick={() => router.push("/admin")} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PeopleAltIcon />
        </ListItemIcon>
        <ListItemText primary="Users" onClick={() => router.push("/main")} />
      </ListItem>
      {/* <ListItem button>
        <ListItemIcon>
          <ThumbUpIcon />
        </ListItemIcon>
        <ListItemText primary="Approve" />
      </ListItem> */}
    </div>
  );
};

// export const SecondaryListItems = (
//   <div>
//     <ListSubheader inset>Saved reports</ListSubheader>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItem>
//   </div>
// );
