import React, { FC, useEffect } from "react";
// import styles from "./Dashboard.module.css";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import RoleList from "./RoleList/RoleList";
import CreateUpdateRole from "./CreateUpdateRole/CreateUpdateRole";
import { toast } from "react-toastify";
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Roles() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [userData, setUserDat] = useState({});
  useEffect(() => {}, []);

  const handleVisibility = (status: any) => {
    setVisible(status);
  };

  const handleRowData = (row: any) => {
    setUserDat(row);
  };
  return (
    <>
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
              {!visible && (
                <RoleList
                  updateVisibility={handleVisibility}
                  rowData={handleRowData}
                />
              )}
              {visible && (
                <CreateUpdateRole
                  childData={userData}
                  updateVisibility={handleVisibility}
                />
              )}
            </Box>
          </Box>
        </ThemeProvider>
      )}
    </>
  );
}
