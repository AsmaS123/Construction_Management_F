import styles from './SiteList.module.css';
import React, { FC, useEffect } from "react";
import { styled, createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {  useState,useMemo } from "react";
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
import Cookies from 'js-cookie';

// interface SiteListProps {}

const SiteList  = (props:any) => {
  const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [data, setData] = useState<any>([]);
    const [pg, setpg] = useState(0);
    const [rpg, setrpg] = useState(5);

    const [item, setItem] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(null);
    const [role,setRoles]:any= useState([]);
  
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

    function datafilter(){
        return data.filter((item: any) => {
          return Object.values(item).some((value) =>
            (value as any).toString().toLowerCase().includes(searchTerm),
          );
        });     
    }

    const filteredItems = useMemo(()=> {
      //  return item.name.toLowerCase().includes(searchTerm)
      const result = datafilter();
      return result
    },[data,searchTerm]);
  
    function fetchData() {
    const url = apiurl + "site/list";
    axios.get(url).then((res:any)=>{
      setData(res.data.siteList.reverse());
        }).catch((err)=>{
          console.log(err)
        })
    }
    
    const handleRemove = async (teacherId: any) => {
      // debugger;
      try {
        // debugger;
        const response = await axiosInstance.delete("teachers/" + teacherId);
        if (response) {
          alert(teacherId + " deleted successfully");
          // fetchData();
        }
      } catch (error: any) {
        // debugger;
        setError(error.message);
        toast.error(error.message, {
          position: "top-right",
        });
      }
    };
    
    const handleVisibility = ()=>{
      props.updateVisibility(true)
    }

    const handeSite =(id:any)=>{
      navigate(`/siteexpenses?siteId=${id}`);
      // navigate ("/siteexpenses")
    }

    const handleSiteDetails =(id:any,key?:any)=>{
      if(key){
        navigate(`/sitedetails?siteId=${id}&key=${key}`);
      }
      else{
        navigate(`/sitedetails?siteId=${id}`);
      }
     
    }

    useEffect(()=>{
      fetchData();
       const user :any= Cookies.get('user'); 
        let roles:any;
        if(user && JSON.parse(user).roles){
            roles = JSON.parse(user).roles;
            setRoles(roles)
        }
    },[])
    
    return (
      <>
      {
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
                <h2>Site</h2>

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
                    />{role && role.length>0 && role.includes('admin') && <>
                    <Button
                      variant="contained"
                      sx={{ mt: 4, mb: 4, width: 4, float: "right" , fontSize:"10px"}}
                      onClick={() => handleVisibility()}
                      color="success"
                    >
                      Create Site
                    </Button>
                    </>}
                    <Table
                      sx={{ minWidth: 650 }}
                      aria-label="simple table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell  style={{fontWeight:'bold'}}>S.No</TableCell>
                          <TableCell style={{fontWeight:'bold'}}>Site Id</TableCell>
                          <TableCell style={{fontWeight:'bold'}}>Site Type</TableCell>
                          <TableCell style={{fontWeight:'bold'}}>Site Name</TableCell>
                          <TableCell style={{fontWeight:'bold'}}>Site Engineer Name</TableCell>
                          <TableCell style={{fontWeight:'bold'}}>Site Engineer Email</TableCell>
                          <TableCell style={{fontWeight:'bold'}}>Site Start Date</TableCell>
                          <TableCell style={{fontWeight:'bold'}}>Action</TableCell>
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
                                key={row.site_id}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row" >
                                  {i + rpg * pg + 1}
                                </TableCell>
                                <TableCell component="th" scope="row" >
                                  {row.site_id} 
                                </TableCell>
                                <TableCell align="right">
                                  {row.site_type}
                                </TableCell>
                                <TableCell align="right">
                                  {row.site_name}
                                </TableCell>
                                <TableCell align="right">
                                  {row.site_engineer_name}
                                </TableCell>
                                <TableCell align="right">
                                  {row.site_engineer_email}
                                </TableCell>
                                <TableCell align="right">
                                  {row.site_start_date}
                                </TableCell>
                                <TableCell align="right">
                                <button onClick={()=>handeSite(row.site_id)}>+ expenses</button>
                                <button
                                onClick={() => handleSiteDetails(row.site_id)}
                              >
                                detail
                              </button>
                              {role && role.length>0 && role.includes('admin') && <>
                              <button
                                onClick={() => handleSiteDetails(row.site_id,'update')}
                              >
                                edit
                              </button>
                              <button
                                onClick={() =>
                                  handleRemove(row.teacherId)
                                }
                              >
                                delete
                              </button>
                              </>}
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
      }</>
    )
};

export default SiteList;


