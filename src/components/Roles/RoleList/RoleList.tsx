import styles from './SiteList.module.css';
import React, { FC, useEffect } from "react";
import { styled, createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {  useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import apiurl from "../../../config/url";
import axios from "axios";
import Button from "@mui/material/Button";
import { green } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import axiosInstance from "../../../const/httpinterceptor";
import { ToastContainer, toast } from "react-toastify";
import "../../../../node_modules/react-toastify/dist/ReactToastify.css";
// import RoleList from './RoleList.lazy';

// interface SiteListProps {}

const RoleList  = (props:any) => {
  const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [data, setData] = useState<any>([]);
    const [pg, setpg] = useState(0);
    const [rpg, setrpg] = useState(5);
    // const [visible, setVisible] = useState(false);
    const [item, setItem] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(null);
  
  
    function handleChangePage(event: any, newpage: React.SetStateAction<number>) {
      setpg(newpage);
    }
  
    function handleChangeRowsPerPage(event: { target: { value: string } }) {
      setrpg(parseInt(event.target.value, 10));
      setpg(0);
    }
  
    const handleSearchChange = (event: any) => {
      setSearchTerm(event.target.value.toLowerCase());
    };
  
    const filteredItems = data.filter((item: any) => {
      return Object.values(item).some((value) =>
        (value as any).toString().toLowerCase().includes(searchTerm),
      );
      //  return item.name.toLowerCase().includes(searchTerm)
    });
  
    useEffect(()=>{
      fetchData()
    },[])

   function fetchData() {
    const url = apiurl + "roles";
        axios
          .get(url, { withCredentials: true })
          .then((res: any) => {
            // debugger
            setData(res.data.userList)
          })
          .catch((error) => {
            console.log(error)
          });
      };
  
    const handleRemove = async (email: any) => {
      const url = apiurl + "roles/" + email;
        axios
          .delete(url, { withCredentials: true })
          .then((res: any) => {
            alert('roles deleted successfully');
            fetchData()
          })
          .catch((error) => {
            console.log(error)
          });
    };
    
    return (
      <>
      
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  />
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Paper
                        sx={{ p: 2, display: "flex", flexDirection: "column" }}
                      >
                        <h2>User Roles</h2>
  
                        <>
                          <TableContainer component={Paper}>
                            <TextField
                              margin="normal"
                              required
                              id="search"
                              label="Search"
                              name="search"
                              autoComplete="email"
                              autoFocus
                              value={searchTerm}
                              onChange={handleSearchChange}
                            /><br/>
                            {/* <Button
                              variant="contained"
                              sx={{ mt: 4, mb: 4, width: 4, float: "right" , fontSize:"10px"}}
                              onClick={() => {props.updateVisibility(true)}}
                              color="success"
                            >
                              Create Role
                            </Button> */}
                            <Table
                              sx={{ minWidth: 650 }}
                              aria-label="simple table"
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell>s.no</TableCell>
                                  <TableCell>Name</TableCell>
                                  <TableCell>Email</TableCell>
                                  <TableCell>Status</TableCell>
                                  <TableCell>Roles</TableCell>
                                  <TableCell>Action</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                              {filteredItems &&
                                filteredItems
                                  .slice(pg * rpg, pg * rpg + rpg)
                                  .map((row: any, i: any) => {
                                    // {data && data.map((row:any)=>{
                                    return (
                                      <TableRow
                                        key={row.teacherId}
                                        sx={{
                                          "&:last-child td, &:last-child th": {
                                            border: 0,
                                          },
                                        }}
                                      >
                                        <TableCell component="th" scope="row">
                                          {i + rpg * pg + 1}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                          {row.name}
                                        </TableCell>
                                        <TableCell >
                                          {row.email}
                                        </TableCell>
                                        <TableCell >
                                          {row.status}
                                        </TableCell>
                                        <TableCell >
                                          {row.roles.map((elm:any)=>{
                                           return(<>{elm} ,</>) 
                                          })}
                                        </TableCell>
                                        <TableCell >
                                          <button
                                            onClick={() =>{ props.updateVisibility(true); props.rowData(row)}}
                                          >
                                            Edit
                                          </button>
                                          <button
                                            onClick={() =>
                                              handleRemove(row.email)
                                            }
                                          >
                                            Delete
                                          </button>
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={filteredItems.length}
                            rowsPerPage={rpg}
                            page={pg}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                          />
                        </>
                      </Paper>
                    </Grid>
                  </Grid>
                </Container>
              </>
    )
};

export default RoleList;
