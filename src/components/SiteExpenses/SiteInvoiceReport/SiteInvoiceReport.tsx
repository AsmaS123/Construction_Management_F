import styles from './SiteList.module.css';
import React, { FC, useEffect } from "react";
import { styled, createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
import { jsPDF } from 'jspdf';
import html2pdf from 'html2pdf.js';
import Box from "@mui/material/Box";
import html2canvas from "html2canvas";
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
import { float } from 'html2canvas/dist/types/css/property-descriptors/float';

const SiteInvoiceReport  = (props:any) => {
   const [invoiceDetails, setInvoiceDetails] =  useState<any>({})
    const [total, setTotal] = useState({totalAmount : 0, creditTotal:0, debitTotal:0})
    const [isedit, setIsEdit] = useState(false);

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

    useEffect(()=>{
      if(props.invoiceData){
        setInvoiceDetails(props.invoiceData);
        calculateTotal(props.invoiceData)
      }
    },[])

    const downloadInvoice = ()=>{
      const input  :any= document.getElementById("invoice");
      const options:any = {
        margin: 1,
        filename: 'generated-file.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 4 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };
      (html2pdf().from(input).set(options) as any).save();
    };
    
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
                  <Link
                    underline="hover"
                    color="inherit"
                    onClick={() => props.updateVisibility(false)}
                  >
                    Site Expenses
                  </Link>
                  <Typography color="text.primary">Report - <a onClick={downloadInvoice}>download</a></Typography>
                </Breadcrumbs>
              </div>
              {/* <br/> */}

              <div  id="invoice" style={{ backgroundImage: `url('/letter_head.png')`,  height: '130vh',backgroundSize: 'cover',
    backgroundPosition: 'right',zIndex:999}}>
              {/* <Paper
                sx={{display: "flex", flexDirection: "column" }}
              >
                 <header style={{backgroundColor:'#b8ddcb',margin:'0px', padding:'5px 5px 5px 5px', height:'100px',borderBottom:'5px solid gray'}}><div style={{padding:'1% '}}><p style={{fontSize:'12px'}}>Dream House Constrction, <br/>Latur Plaza, <br/>contact no : 1234567890 </p><p  style={{float:'right',marginTop:'-7%'}}><img src="/logo.jpg" alt="Example" width="70"/></p> </div></header>
                </Paper> */}
                <br/> <br/> <br/> <br/> <br/> <br/> <br/>
              <div className='flex-container'
                 
              >
                <div>sdc</div>
                <div>
                <h3>{invoiceDetails && invoiceDetails.site_name} Site Invoice</h3>
         
                    <p><b> Site ID</b> : {invoiceDetails && invoiceDetails.site_id} ,&nbsp; &nbsp;&nbsp; &nbsp;<b> Site Type </b>: {invoiceDetails && invoiceDetails.site_type}, &nbsp; &nbsp; &nbsp; &nbsp;<b> Site Name </b>: {invoiceDetails && invoiceDetails.site_name}, &nbsp; &nbsp;&nbsp; &nbsp;<b> Site Engineer Name </b> : {invoiceDetails && invoiceDetails.site_engineer_name},
                    &nbsp; &nbsp;&nbsp; &nbsp; <b>Client Name </b> : {invoiceDetails && invoiceDetails.client_name}
                    </p>

                    <Table
                      sx={{ minWidth: 650}}
                      aria-label="simple table"
                    >
                      <TableHead style={{backgroundColor:'gray', color:'white'}}>
                        <TableRow >
                          <TableCell>s.no</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Amout</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      <TableRow >
                        <TableCell>1</TableCell>
                        <TableCell>Client Expenses</TableCell>
                        <TableCell>
                        {Number(invoiceDetails.client_expenses) }
                        </TableCell>
                        <TableCell>
                          {invoiceDetails.client_expenses_date}
                        </TableCell>
                        <TableCell>
                        {invoiceDetails.client_expenses_status}
                        </TableCell>
                      </TableRow>
                      {
                        invoiceDetails && invoiceDetails.contractor &&  (invoiceDetails.contractor).map((elm:any, index:any)=>{
                          const sno = index+2
                          return (<><TableRow >
                            <TableCell>{sno}</TableCell>
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
                              </TableRow></>)
                          }) 
                      }
                      </TableBody>
                    </Table>
                  <hr></hr>
                <p>
                <b> Total </b> : {total && total.totalAmount} ,&nbsp; &nbsp; &nbsp; &nbsp;
                  <b> Total Credited </b> : {total && total.creditTotal} ,&nbsp; &nbsp; &nbsp; &nbsp; <b> Total  Debited </b>: {total && total.debitTotal}</p>
                </div>       
              </div>
              {/* <footer style={{backgroundColor:'#b8ddcb',marginTop:'-2%',padding:'5px 5px 5px 5px', height:'50px'}}><p>contact no : </p></footer> */}
              </div>
            </Grid>
          </Grid>
        </Container>
      }</>
    )
};

export default SiteInvoiceReport;


