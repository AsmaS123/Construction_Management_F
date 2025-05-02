import React, { FC, useEffect } from "react";
import styles from "./Dashboard.module.css";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Cookies from 'js-cookie';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {  useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import axios from 'axios'
import GetUserRoles from '../CustomHook/GetUserRoles/GetUserRoles';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();
  // debugger
  let user:any = useSelector((state) => state );

  useEffect(() => {
    // debugger
    // if(user && !user.email){
    //   const email :any= Cookies.get('useremail'); 
    //   const temp  = GetUserRoles(email);
    //   console.log(temp.data,'temp.data');
    //   user = temp.data
    // }
  }, []);

  return (
    <>
      {/* { loading  && <Navigate to="/" replace />} */}
      {loading && (
        <ThemeProvider theme={defaultTheme}>
          <Box sx={{ display: "flex" }}>
            <Layout />
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
              }}
            >
              <Toolbar />

              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper
                      sx={{ p: 2, display: "flex", flexDirection: "column" }}
                    >
                      {user.email}
                      {/* <button onClick={fetchProfile}>Click Me!</button> */}
                      {/* <button onClick={getCookie}>get cookie!</button> */}
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
        </ThemeProvider>
      )}
    </>
  );
}


  // const getCookie = ()=>{
  //   // const token = Cookies.get('token'); // 'token' is the cookie name
  //   // console.log(token,'token');
  // }


    // const fetchProfile = async () => {
  //   try {
  //     // debugger
  //     const res = await axios.get('http://localhost:5003/profile', { withCredentials: true });
  //     console.log(res.data.user);
  //   } catch {
  //     console.log(null);
  //   }
  // };
