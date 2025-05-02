import styles from './SiteList.module.css';
import React, { FC, useEffect,useMemo } from "react";
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
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import * as Yup from "yup";
import { useFormik } from "formik";
import Cookies from 'js-cookie';
import SiteDetailInvoiceReport from './SiteDetailInvoiceReport/SiteDetailInvoiceReport';
import SiteDetailExpensesList from './SiteDetailExpensesList/SiteDetailExpensesList';

const SiteExpensesList  = (props:any) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [siteDetails, setSiteDetails] = useState<any>({})
    const [total, setTotal] = useState({totalAmount : 0, creditTotal:0, debitTotal:0})
    const [isedit, setIsEdit] = useState(false);
    const [role,setRoles]:any= useState([]);
    const [detailexpenses,setDetailExpenses ] =  useState(false);
    const [expensesId, setExpensesId]:any = useState({id:'',key:'',site_id:''});
    const [data, setData] = useState<any>([]);
    const [pg, setpg] = useState(0);
    const [rpg, setrpg] = useState(5);
    const [item, setItem] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

     const SiteSchema = Yup.object().shape({
        site_id:Yup.string(),
        site_type:Yup.string().required("Site type is required"),
        site_name:Yup.string(),
        site_engineer_name:Yup.string(),
        site_engineer_email:Yup.string(),
        client_name:Yup.string(),
        client_email:Yup.string(),
        client_contact_no: Yup.string(),
        client_expenses: Yup.number(),
        client_expenses_status: Yup.string(),
        client_expenses_date: Yup.string(),
        site_address:Yup.string(),
        site_start_date:Yup.string(),
        site_end_date:Yup.string(),
        contractor: Yup.array().of(
          Yup.object().shape({
          contractor_type: Yup.string(),
          contractor_name: Yup.string(),
          contractor_contact_no: Yup.string(),
          contractor_expenses:Yup.number(),
          contractor_expenses_status: Yup.string(),
          contractor_expenses_date: Yup.string(),
          contractor_email : Yup.string(),
          },
        ))
      });
    
      const formik = useFormik({
        initialValues: {
          _id:'',
          site_id:'',
          site_type:'',
          site_name:'',
          site_engineer_name:'',
          site_engineer_email:'',
          client_name:'',
          client_email:'',
          client_contact_no:'',
          client_expenses: 0,
          client_expenses_status: '',
          client_expenses_date: '',
          site_address:'',
          site_start_date:'',
          site_end_date:'',
          contractor: [
            {
              "_id":'',
              "contractor_type": "",
              "contractor_name": "",
              "contractor_contact_no": "",
              "contractor_email": '',
              "contractor_expenses": 0,
              "contractor_expenses_status": 'debited',
              "contractor_expenses_date": '',
              
            }
          ]
        },
        validationSchema: SiteSchema,
        // Submission handler
        onSubmit: (values:any) => {
          // debugger
          // alert(JSON.stringify(values, null, 2));
        },
      });

    const calculateTotal = (data:any)=>{
      // debugger
      let creditTotal =0;
      let debitTotal = 0;
      let totalAmount = 0;
      //calculate credit total
      if(data && data.client_expenses_status == 'credited'){
        if(data.client_expenses && typeof(data.client_expenses) == 'string'){
          creditTotal += parseInt(data.client_expenses)
        }
        else{
          creditTotal += data.client_expenses
        }
        
      }
      else if (data && data.client_expenses_status == 'debited'){ 
        if(data.client_expenses && typeof(data.client_expenses) == 'string'){
          debitTotal += parseInt(data.client_expenses)
        }
        else{
          debitTotal += data.client_expenses}
        }
      if(data && data.contractor.length>0) 
        {
          data.contractor.forEach((elm:any)=>{
            if(elm.contractor_expenses_status == 'credited'){
              if(data.client_expenses &&  typeof(data.client_expenses) == 'string'){
                creditTotal += parseInt(elm.contractor_expenses)
              }
              else{
                creditTotal += elm.contractor_expenses
              }
              
            }
            else if(elm.contractor_expenses_status == 'debited'){
              if(data.client_expenses &&  typeof(data.client_expenses) == 'string'){
                debitTotal += parseInt(elm.contractor_expenses)
              }
              else{
                debitTotal += elm.contractor_expenses
              }
            }
          })
        }
        totalAmount = creditTotal + -Math.abs(debitTotal)
       const obj:any = {totalAmount, creditTotal,debitTotal}
       setTotal(obj)
      }

    const fetchSiteDetails = ()=>{
      const siteId = searchParams.get("siteId");
      const url = apiurl + "site/expenses/"+siteId;
      axios.get(url).then((res:any)=>{
        res.data.client_expenses_date = todaysDate();
        res.data.contractor.forEach((element: { contractor_expenses_date: string; },i: any):any => {
          res.data.contractor[i].contractor_expenses_date = todaysDate();
        });
        // debugger
        setData(res.data.contractor);
        formik.setValues(res.data)
        calculateTotal(res.data)
          }).catch((err)=>{
            console.log(err)
        })
    }



    function todaysDate(){
      const today = new Date();
      const formatted = today.toISOString().split('T')[0];
      console.log(formatted); // "2025-04-15"
      return formatted;
    }
    
    useEffect(()=>{
      fetchSiteDetails();
       const user :any= Cookies.get('user'); 
        let roles:any;
        if(user && JSON.parse(user).roles){
            roles = JSON.parse(user).roles;
            setRoles(roles)
        }
    },[])

    useEffect(()=>{
      calculateTotal(formik.values)
    },[formik.values])

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
      // debugger
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
            <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
                  <Link
                    underline="hover"
                    color="inherit"
                    href="/site"
                  >
                    Site
                  </Link>
                  {!detailexpenses && <Typography color="text.primary">Site Expenses</Typography>}
                  {detailexpenses && 
                  <Link
                    underline="hover"
                    color="inherit"
                   onClick={()=>navigate(0)}
                    // navigate(`/siteexpenses?siteId=${id}`);
                  >
                    Site Expenses
                  </Link>
                  }
                 {detailexpenses && <><Typography color="text.primary">Site Expenses Detail</Typography></>} 
                </Breadcrumbs>
              </div>
              {/* <br/> */}
              <Paper
                sx={{ p: 2, display: "flex", flexDirection: "column" }}
              >
                <h2>Site Expenses</h2>
                    {/* <br/> */}
                    <p><b> Site ID</b> : {formik.values && formik.values.site_id} ,&nbsp; &nbsp;&nbsp; &nbsp;<b> Site Type </b>: {formik.values && formik.values.site_type}, &nbsp; &nbsp; &nbsp; &nbsp;<b> Site Name </b>: {formik.values && formik.values.site_name}, &nbsp; &nbsp;&nbsp; &nbsp;<b> Site Engineer Name </b> : {formik.values && formik.values.site_engineer_name},
                    &nbsp; &nbsp;&nbsp; &nbsp; <b>Client Name </b> : {formik.values && formik.values.client_name}
                    </p>
                { !detailexpenses && <>
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
                    />
                     <Button
                      variant="contained"
                      sx={{ mt: 4, mb: 4, width: 4, float: "right" , fontSize:"10px"}}
                      onClick={() =>{ props.updateReportData(formik.values);props.updateVisibility(true)}}
                      color="secondary"
                      disabled={isedit}
                    >
                      Report
                    </Button>
                    <Table
                      sx={{ minWidth: 650 }}
                      aria-label="simple table"
                    >
                      <TableHead style={{backgroundColor:'gray', color:'white'}}>
                        <TableRow >
                          <TableCell>s.no</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Total Amout</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {pg==0 && <>
                          <TableRow style={{backgroundColor:"yellow"}}>
                          <TableCell></TableCell>
                          <TableCell>Client Expenses</TableCell>
                          <TableCell>
                          {Number(formik.values.client_expenses) }
                          </TableCell>
                          <TableCell>
                          {formik.values.client_expenses_date}
                          </TableCell>
                          <TableCell>
                          {formik.values.client_expenses_status}
                          </TableCell>
                          <TableCell>
                            <button onClick={()=>  {const key='client'; navigate(`/sitedetailexpenses?siteId=${formik.values.site_id}&key=${key}&id=${formik.values._id}`)}}>expenses</button>
                          </TableCell>
                        </TableRow>
                        </>}
                      {
                        // filteredItems && filteredItems.map((elm:any, index:any)=>{
                          filteredItems && filteredItems.slice(pg * rpg, pg * rpg + rpg).map((elm:any, index:any)=>{
                          const sno = index+2
                          return (<><TableRow >
                            <TableCell>{index + rpg * pg + 1} </TableCell>
                            <TableCell>{elm.contractor_name} ({elm.contractor_type})</TableCell>
                            <TableCell>
                            {Number(elm.contractor_expenses) }
                            </TableCell>
                            <TableCell>
                            {elm.contractor_expenses_date }
                            </TableCell>
                              <TableCell>
                              {elm.contractor_expenses_status}
                                </TableCell>
                                <TableCell>
                                  <button  onClick={()=>{const key='contractor'; navigate(`/sitedetailexpenses?siteId=${formik.values.site_id}&key=${key}&id=${elm._id}`)}}>expenses</button>
                                </TableCell>
                              </TableRow></>)
                          }) 
                      }
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
                      <hr></hr>
                      <p>
                      <b> Total </b> : {total && total.totalAmount} ,&nbsp; &nbsp; &nbsp; &nbsp;
                        <b> Total Credited </b> : {total && total.creditTotal} ,&nbsp; &nbsp; &nbsp; &nbsp; <b> Total  Debited </b>: {total && total.debitTotal}</p>
                </> }
                {/* { detailexpenses && <SiteDetailExpensesList detailId={expensesId}/> } */}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      }</>
    )
};

export default SiteExpensesList;



    // const handleUpdate = ()=>{
    //  const updateData = formik.values;
    // //  console.log(updateData,'updateData')
    //   const url = apiurl + "site/expenses";
    //   axios.put(url, updateData).then((res:any)=>{
    //     alert('site expenses updated successfully')
    //     setIsEdit(false)
    //     fetchSiteDetails();
    //       }).catch((err)=>{
    //         console.log(err)
    //     })
    // }