import React, { FC, useEffect } from "react";
import styles from './Site.module.css';
import { styled, createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {  useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import apiurl from "../../config/url";
import axios from "axios";
import Button from "@mui/material/Button";
import { green } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import axiosInstance from "../../const/httpinterceptor";
import { ToastContainer, toast } from "react-toastify";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import SiteList from "./SiteList/SiteList";
import CreateSite from './CreateSite/CreateSite';

interface SiteProps {}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const  Site = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [data, setData] = useState<any>([]);
  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false)


  const handleVisibility = (status:any) => {
    console.log('testing here....')
    setVisible(status);
  };

  const handleEdit  = (key:any)=>{
    setEdit(key)
  }

  if (!data) return <div>Loading...</div>;



    return (
      <>
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
              {/* <CreateSite/> */}
              {!visible &&  <SiteList updateVisibility={handleVisibility} />}
              {visible &&  <CreateSite updateVisibility={handleVisibility} />}
              {/* {visible && (
                <AddUpdateTeacher
                  data={item}
                  back={() => {
                    setVisible(false);
                    fetchData();
                  }}
                />
              )} */}
            </Box>
          </Box>
        </ThemeProvider>
      </>
    );
}


export default Site;




// const Site  = () => (
//   <div className={styles.Site} data-testid="Site">
//     Site Component
//   </div>
// );