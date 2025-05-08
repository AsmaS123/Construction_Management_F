import React, { FC, forwardRef, useEffect,useImperativeHandle, useState } from 'react';
import styles from './DialogComponent.module.css';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import * as Yup from "yup";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
// import Textarea from '@mui/joy/Textarea';
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import DigitalSignature from '../DigitalSignature/DigitalSignature'
import apiurl from "../../config/url";
import axios from 'axios'

interface DialogComponentProps {}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const DialogComponent = forwardRef((props:any, ref:any) => {
  const [open, setOpen] = React.useState(false);
  const [keyVal, setKeyVal] = useState(props.urlKey+'_signature');

  useImperativeHandle(ref, () => ({
    handleClose
  }));

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const clientCxpenses:any ={
    site_id: props.site_id,
    site:props.id,
    expenses:{
    bank_detail:'',
    amount:0,
    date: '',
    client_signature :  '',
    engineer_signature:'',
    payment_mode:'',
    attachment:null 
  }
}

  const contractorExpenses:any ={
    site_id: props.site_id,
    contractor:props.id,
    expenses:{
    bank_detail:'',
    amount:0,
    date: '',
    contractor_signature :  '',
    engineer_signature:'',
    payment_mode:'',
    attachment:null 
  }
}

    const formik = useFormik({
              initialValues :
                (props.urlKey == 'client' && clientCxpenses) || (props.urlKey == 'contractor' && contractorExpenses),
              
            // initialValues: {
            //   site_id: props.site_id,
            //   site:props.id,
              
            //   expenses: (props.urlKey == 'client' && clientCxpenses) || (props.urlKey == 'contractor' && contractorExpenses)
            // },
            // validationSchema: SiteSchema,
            // Submission handler
            onSubmit: (values:any) => {
              // debugger
              // alert(JSON.stringify(values, null, 2));
            },
          });

const formDataObj = (obj: any)=>{
  const formData = new FormData();
  if(props.urlKey == 'client'){
    formData.append('site', obj.site);
    formData.append('expenses[client_signature]', obj.expenses.client_signature);
  }
  else if(props.urlKey == 'contractor'){
    formData.append('contractor', obj.contractor);
    formData.append('expenses[contractor_signature]', obj.expenses.contractor_signature);
  }
  formData.append('site_id', obj.site_id);
  formData.append('expenses[bank_detail]', obj.expenses.bank_detail);
  formData.append('expenses[amount]', obj.expenses.amount);
  formData.append('expenses[date]', obj.expenses.date);
  formData.append('expenses[engineer_signature]', obj.expenses.engineer_signature);
  formData.append('expenses[payment_mode]', obj.expenses.payment_mode);
  formData.append('expenses[attachment]', obj.expenses.attachment);
  return formData
};

const handleSubmit = (e:any)=>{
    e.preventDefault()
    debugger
    const obj = formik.values;
    console.log(obj)
    const formData = formDataObj(obj);

    const url = apiurl + "siteexpenses/create/"+props.urlKey;
    axios.post(url,formData).then((res:any)=>{
      // setOpen(false);
      props.getData();
      
    }).catch((err)=>{
      console.log(err)
    })
  }

  // useEffect(()=>{
  //   debugger;
  //   console.log(props.urlKey)
  //   if(props.urlKey == 'client'){
  //     expensesObj.client_signature = '';
  //   }
  //   else if(props.urlKey == 'contractor'){
  //     expensesObj.contractor_signature = '';
  //   }
  // },[props.urlKey])
return (<>
  {/* <React.Fragment> */}

      <Button 
       variant="contained"
       sx={{ mt: 4, mb: 4, width: 8, fontSize:"10px", float:'right'}}
       color="secondary"
        onClick={handleClickOpen}>
        + expenses
      </Button>
      <BootstrapDialog
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {props.urlKey} Expenses
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          {/* <CloseIcon /> */}
        </IconButton>
        <DialogContent dividers>
     
         {/* return (<> */}
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6} md={6}>
            <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label">Payment Mode *</InputLabel>
              <Select
                labelId="demo-simple-select-label-1"
                id="demo-simple-select-1"
                name={`expenses.payment_mode`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.expenses.payment_mode}
                label="payment_mode *"
                fullWidth
              >
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="online">Online</MenuItem>
              </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12} lg={6} md={6}>
                <TextField
                    id="outlined-name-input"
                    label="amount *"
                    type="text"
                    autoComplete="Amount *"
                    fullWidth
                    name={`expenses.amount`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.expenses.amount}
                    // error={formik.touched.amount && Boolean(formik.errors.amount)}
                    // helperText={formik.touched.site_name && formik.errors.site_name}
                  />
              </Grid>
            </Grid>
            <br/>
            <Grid container spacing={2}>
              {
                (formik.values.expenses.payment_mode) != 'cash' && 
                <Grid item xs={12} lg={12} md={12}>
                  <TextField
                      id="outlined-name-input"
                      multiline
                      rows={3}
                      maxRows={4}
                      label="bank_detail "
                      type="textarea"
                      autoComplete="bank_detail "
                      fullWidth
                      name={`expenses.bank_detail`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.expenses.bank_detail}
                      // error={formik.touched.bank_detail && Boolean(formik.errors.bank_detail)}
                      // helperText={formik.touched.site_name && formik.errors.site_name}
                    />
                </Grid>
              }
            </Grid>
            <br/>
            <Grid container spacing={2}>
            <Grid item xs={12} lg={6} md={6}>
                <TextField
                    id="outlined-name-input"
                    label="date "
                    type="date"
                    autoComplete="date "
                    fullWidth
                    name={`expenses.date`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.expenses.date}
                    // error={formik.touched.date && Boolean(formik.errors.date)}
                    // helperText={formik.touched.site_name && formik.errors.site_name}
                  />
              </Grid>
              <Grid item xs={12} lg={6} md={6}>
                <TextField
                    type="file"
                    label="attachment "
                    id="outlined-name-input"
                    autoComplete="attachment "
                    name={`expenses.attachment`}
                    onChange={(e):any=>{
                      // debugger
                      const target= e.target as HTMLInputElement;
                      const file: File = (target.files as FileList)[0];
                      return(
                        formik.setFieldValue(`expenses.attachment`, file))}}
                  />
              </Grid>
            </Grid>
            <br/>
            <Grid container spacing={2}>
            <Grid item xs={12} lg={6} md={6}>
            Engineer signature 
              <DigitalSignature handleClientSignature={(e:any)=>formik.setFieldValue(`expenses.engineer_signature`, e)}/>
              </Grid>
              <Grid item xs={12} lg={6} md={6}>
                { props.urlKey=='client' && <> client signature
                  <DigitalSignature handleClientSignature={(e:any)=>formik.setFieldValue(`expenses.client_signature`, e)}/></>}
                  { props.urlKey=='contractor' && <> Contractor signature
                    <DigitalSignature handleClientSignature={(e:any)=>formik.setFieldValue(`expenses.contractor_signature`, e)}/></> }
              </Grid>
            </Grid>
            {/* </>) */}
        {/* })} */}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={ handleSubmit}>
            Save 
          </Button>
          <Button autoFocus onClick={handleClose}>
            Cancel 
          </Button>
        </DialogActions>
      </BootstrapDialog>
    {/* </React.Fragment> */}
  </>
);
});

export default DialogComponent;
// function useImperativeHandle(ref: any, arg1: () => { handleClose: () => void; }) {
//   throw new Error('Function not implemented.');
// }

