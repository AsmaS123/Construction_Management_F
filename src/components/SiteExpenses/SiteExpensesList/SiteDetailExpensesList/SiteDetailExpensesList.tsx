import React, { FC } from 'react';
import styles from './SiteDetailExpensesList.module.css';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import apiurl from "../../../../config/url";
import axios from "axios";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import * as Yup from "yup";
import { useFormik } from "formik";
import Cookies from 'js-cookie';
import { useEffect,useState,useMemo,useRef }from 'react';
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import DigitalSignature from '../../../DigitalSignature/DigitalSignature';
import DialogComponent from '../../../DialogComponent/DialogComponent';
import Paper from "@mui/material/Paper";
import { useSearchParams } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../../../Layout/Layout";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import SiteDetailInvoiceReport from '../SiteDetailInvoiceReport/SiteDetailInvoiceReport';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();



interface SiteDetailExpensesListProps {}

const SiteDetailExpensesList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isedit, setIsEdit] = useState(true);
  const [pg, setpg] = useState(0);
  const [rpg, setrpg] = useState(5);
  const [data,setData]:any = useState({});
  const [item, setItem] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [object, setObject] = useState({siteId:'',id:'', key:''});
  // const [isReport, setIsReport] = useState(false);
  const [visible, setVisible] = useState(false);
  const [total, setTotal] = useState({totalAmount : 0, creditTotal:0, debitTotal:0})
  const childRef :any= useRef();

  const handleVisibility = (status:any) => {
    setVisible(status);
  };

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

 
  const filteredItems = useMemo(()=> {
      //  return item.name.toLowerCase().includes(searchTerm)
          debugger
       const result = data && data.expenses && (data.expenses).length>0 && (data.expenses).filter((item: any) => {
        // debugger
         return Object.values(item).some((value) =>
          (value) && (value as any).toString().toLowerCase().includes(searchTerm),
         );
        });
         return result;
    },[data,searchTerm]);
  

    const calculateTotal = (data:any)=>{
      // debugger
      let creditTotal =0;
      let debitTotal = 0;
      let totalAmount = 0;
      //calculate credit total
      debugger
      if(data && data.site.client_expenses_status == 'credited'){
        (data.expenses).map((elm:any)=>{
          if(elm.amount && typeof(elm.amount) == 'string'){
            creditTotal += parseInt(elm.amount)
          }
          else{
            creditTotal += elm.amount
          }
        })
      }
      totalAmount = creditTotal
      setTotal({...total,creditTotal,totalAmount, debitTotal  })
    }

  function fetchData(){
    debugger
    const url = apiurl + "siteexpenses/"+object.id;
    axios.get(url).then((res:any)=>{
      // debugger
      setData(res.data);
      calculateTotal(res.data);
      childRef.current.handleClose(); 
      // setOpen(false);
    })
  }

  useEffect(()=>{
    const siteId :any= searchParams.get("siteId");
    const id :any= searchParams.get("id");
    const key :any= searchParams.get("key");
    if(siteId && id && key){
      setObject({'siteId':siteId,'id':id,'key': key})
    }
  },[]);


  useEffect(()=>{
    if(object.siteId,object.id,object.key){
      fetchData()
    }
   
  },[object.siteId,object.id,object.key])

  const displayImage = (_id: any)=>{
  }

  return(<>
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
              {!visible && <>
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                     <div role="presentation">
                      <Breadcrumbs aria-label="breadcrumb">
                          <Link
                            underline="hover"
                            color="inherit"
                            href="/site"
                          >
                            Site
                          </Link>
                          {/* {!detailexpenses && <Typography color="text.primary">Site Expenses</Typography>} */}
                          {
                          <Link
                            underline="hover"
                            color="inherit"
                            onClick={()=>navigate(`/siteexpenses?siteId=${object.siteId}`)}
                            // navigate(`/siteexpenses?siteId=${id}`);
                          >
                            Site Expenses
                          </Link>
                          }
                          {<Typography color="text.primary">Site Expenses Detail</Typography>} 
                        </Breadcrumbs>
                      </div>
                    <Paper
                      sx={{ p: 2, display: "flex", flexDirection: "column" }}
                    >
                      <h2>Site Expenses List</h2>
                    {/* <br/> */}
                    <p><b> Site ID</b> : {object && object.siteId} ,&nbsp; &nbsp;&nbsp; &nbsp;
                    <b> Site Type </b>: {Object.keys(data).length>0 && data.site.site_type}, &nbsp; &nbsp; &nbsp; &nbsp;<b> Site Name </b>: {Object.keys(data).length>0 && data.site.site_name}, &nbsp; &nbsp;&nbsp; &nbsp;<b> Site Engineer Name </b> : {Object.keys(data).length>0 && data.site.site_engineer_name},
                    &nbsp; &nbsp;&nbsp; &nbsp; <b>Client Name </b> : {Object.keys(data).length>0 && data.site.client_name}
                    </p>
                    <div  id='editexpenses'>
                    {/* <h3 style={{fontStyle:'italic',color:'green'}}>
                      <b>{data && Object.keys(data).length>0 && data.site.client_name}</b>
                    {object.key} expenses
                    </h3> */}
                    
                      </div>
                      <TableContainer component={Paper}>
                          <TextField
                            margin="normal"
                            required
                            id="search"
                            label="Search"
                            name="search"
                            autoComplete="search"
                            autoFocus
                            value={searchTerm}
                            onChange={handleSearchChange}
                          />
                          <Button
                            id='editexpenses'
                              variant="contained"
                              sx={{ mt: 4, mb: 4, width: 4, fontSize:"10px",float:'right'}}
                              color="secondary"
                              onClick={() =>{ handleVisibility(true)}}
                            >
                              Report
                            </Button>
                           
                            <DialogComponent ref={childRef} id={searchParams.get("id")} urlKey={searchParams.get("key")} site_id={searchParams.get("siteId")} getData={fetchData}/>
                            <Table
                              sx={{ minWidth: 650 }}
                              aria-label="simple table"
                            >
                            <TableHead style={{backgroundColor:'gray', color:'white'}}>
                              <TableRow >
                                <TableCell>s.no</TableCell>
                                <TableCell>Payment Mode</TableCell>
                                <TableCell>Amout</TableCell>
                                <TableCell>Expenses Status</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Engineer Signature</TableCell>
                                <TableCell>{object.key} Signature</TableCell>
                                <TableCell>Attachment</TableCell>
                                <TableCell>Action</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                              filteredItems && filteredItems.length>0 && filteredItems.slice(pg * rpg, pg * rpg + rpg).map((elm:any, index:any)=>{
                              const sno = index+2
                              return (<>
                                <TableRow >
                                  <TableCell>{index + rpg * pg + 1}</TableCell>
                                  <TableCell>
                                  {elm.payment_mode}
                                  </TableCell>
                                  <TableCell>
                                    {elm.amount}
                                    </TableCell>
                                    <TableCell>
                                    {Object.keys(data).length>0 && data.site.client_expenses_status}
                                    </TableCell>
                                    <TableCell>
                                    {elm.date}
                                    </TableCell>
                                    <TableCell>
                                    <img src={elm.engineer_signature} alt="Preview" style={{ width: '150px' }} />
                                    </TableCell>
                                    <TableCell>
                                    <img src={elm.client_signature} alt="Preview" style={{ width: '300px' }} />
                                    </TableCell>
                                    <TableCell>
                                    <a onClick={()=>displayImage(elm._id)}>{elm.attachment && elm.attachment.name}</a>
                                    </TableCell>
                                  <TableCell>
                                  <button >
                                      Edit
                                    </button>
                                    <button >
                                      Delete
                                    </button>
                                  </TableCell>
                                </TableRow>
                                </>)})
                                }
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 25]}
                          component="div"
                          count={filteredItems && filteredItems.length}
                          rowsPerPage={rpg}
                          page={pg}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                        <hr></hr>
                          <p>
                          <b> Total </b> : {total && total.totalAmount} ,&nbsp; &nbsp; &nbsp; &nbsp;
                            <b> Total Credited </b> : {total && total.creditTotal} ,&nbsp; &nbsp; &nbsp; &nbsp; <b> Total  Debited </b>: {total && total.debitTotal}</p>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Container>
                  </>}
                  {visible && <><SiteDetailInvoiceReport updateVisibility={handleVisibility} invoiceData={data}/></>}
                </Box>
              </Box>
            </ThemeProvider>
  </>)
};

export default SiteDetailExpensesList;
