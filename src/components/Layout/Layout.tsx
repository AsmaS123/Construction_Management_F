import styles from "./Layout.module.css";
import React, { FC, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
// import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link } from "react-router-dom";
import apiurl from "../../config/url"
import axios from 'axios'
import GetUserRoles from '../CustomHook/GetUserRoles/GetUserRoles';

interface LayoutProps {}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth: number = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Layout = () => {
  const [open, setOpen] = React.useState(false);
  const [role,setRoles]:any= useState([]);
  const navigate = useNavigate();
  // debugger
  // let user:any = useSelector((state) => state );
  // setRoles(user.roles)
  // if(user && !user.email){
  //   debugger
  //   const email :any= Cookies.get('useremail'); 
  //   const temp :any = GetUserRoles(email);
  //   console.log(temp.data,'temp.data');
  //   user = temp.data
  //   setRoles(user.roles)
  // }

  const toggleDrawer = () => {
    setOpen(!open);
  };


  
    useEffect(()=>{
      // debugger
      const user :any= Cookies.get('user'); 
      let roles:any;
      if(user && JSON.parse(user).roles){
         roles = JSON.parse(user).roles;
         setRoles(roles)
      }
    },[]);

      const handleLogout = () => {
        localStorage.removeItem("loginData");
        const url = apiurl + "logout";
        axios.get(url).then((res)=>{
          // debugger
          Cookies.remove('user');
          window.location.href = "/";
        }).catch((errr)=>{
         console.log(errr)
        })
      } 
    
      
  return (
    <>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
          <img src="/chatgpt_icon.jpg" alt="Example" width="25" onClick={()=>navigate('/chatbot')}/>
            </IconButton>
          <IconButton color="inherit">
            <AccountCircle/>
            {/* <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge> */}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        {
          <List component="nav">
            {/* {MainListItems} */}
            <ListItemButton>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <Link to="/dashboard">Dashboard</Link>
                </ListItemButton>
                {role && role.length>0 && (role.includes('admin') || role.includes('superuser')) && 
                <ListItemButton>
                  <ListItemIcon>
                    <ShoppingCartIcon />
                  </ListItemIcon>
                  <Link to="/site">Site</Link>
                </ListItemButton> }
                {role && role.length>0 && role.includes('admin') && 
                <>
                <ListItemButton>
                  <ListItemIcon>
                    <ShoppingCartIcon />
                  </ListItemIcon>
                  <Link to="/office">Office</Link>
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <ShoppingCartIcon />
                  </ListItemIcon>
                  <a
                    onClick={() => {
                      window.location.href = "/roles";
                    }}
                  >
                    Roles
                  </a>
                </ListItemButton>
                </>
                }
              <Divider sx={{ my: 1 }} />
              <ListSubheader component="div" inset>
                Others
              </ListSubheader>
              <ListItemButton>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <a onClick={handleLogout}>Logout</a>
              </ListItemButton>
                    {/* {SecondaryListItems} */}
                  </List>
                }
      </Drawer>
    </>
  );
};

export default Layout;
