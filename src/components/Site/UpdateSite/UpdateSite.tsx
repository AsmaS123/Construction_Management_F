import  {  useState } from 'react';
import styles from './DoctorCreateUpdate.module.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useFormik } from "formik";
import * as Yup from "yup";
// import { axiosInstance } from "../../../../const/httpinterceptor";
import { useNavigate } from "react-router-dom";
import Container from '@mui/material/Container/Container';
import "../../../../node_modules/react-toastify/dist/ReactToastify.css";
import apiurl from "../../../config/url";
import React, { FC, useEffect } from "react";
import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../../Layout/Layout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";
import { green } from "@mui/material/colors";
import FormControlLabel from "@mui/material/FormControlLabel";
import axiosInstance from "../../../const/httpinterceptor";
import { ToastContainer, toast } from "react-toastify";
import "../../../../node_modules/react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "react-router-dom";

interface SiteProps {}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const UpdateSite = (props:any) => {

  const [isUpdate, setIsUpdate] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleChange = (val:any) =>{
    props.updateVisibility(val)
  }

  const digitsOnly = (value: string) => /^\d+$/.test(value)

  const SiteSchema = Yup.object().shape({
    site_id:Yup.string(),
    site_type:Yup.string().required("Site type is required"),
    site_name:Yup.string().required("site name is required"),
    site_engineer_name:Yup.string().required("site engineer name is required"),
    site_engineer_email:Yup.string().required("site_engineer email is required"),
    client_name:Yup.string().required("site engineer name is required"),
    client_email:Yup.string().required("site_engineer email is required"),
    client_contact_no: Yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
    .required('Mobile number is required'),
    client_expenses: Yup.number(),
    client_expenses_status: Yup.string(),
    client_expenses_date: Yup.string(),
    site_address:Yup.string().required("site address is required"),
    site_start_date:Yup.string().required("site start date is required"),
    site_end_date:Yup.string(),
    contractor: Yup.array().of(
      Yup.object().shape({
      contractor_type: Yup.string().required("contractor type is required"),
      contractor_name: Yup.string().min(2, "too short!").max(50, "too long!").required("contractor name is required"),
      contractor_contact_no: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
      .required('Mobile number is required'),
      contractor_expenses:Yup.number(),
      contractor_expenses_status: Yup.string(),
      contractor_expenses_date: Yup.string(),
      contractor_email : Yup.string().required("contractor email is required"),
      },
    ))
  });

  const formik = useFormik({
    initialValues: {
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
          "contractor_type": "",
          "contractor_name": "",
          "contractor_contact_no": "",
          "contractor_email": '',
          "contractor_expenses": 0,
          "contractor_expenses_status": '',
          "contractor_expenses_date": '',
          
        }
      ]
    },
    validationSchema: SiteSchema,
    // Submission handler
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
    },
  });


  const handleSubmit = (e:any)=>{
    e.preventDefault()
    // alert(formik.values);
    const obj = formik.values
    // const flatObj = flattenObject(formik.values);
    // console.log(obj);
    const url = apiurl + "site/update";
    axios.put(url,obj).then((res:any)=>{
      alert('site updated successfully')
      fetchSiteDetails()
    }).catch((err)=>{
      console.log(err)
    })
  }


  function flattenObject(obj:any, prefix = "") {
    let flatObject:any = {};
    for (let key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        const nestedFlat = flattenObject(obj[key], `${key}.`);
        Object.assign(flatObject, nestedFlat);
      } else {
        flatObject[`${key}`] = obj[key];
      }
    }
    return flatObject;
  }

  const handleAdd  = ()=>{
    // alert("add contractor")
    formik.setFieldValue("contractor", [
      ...formik.values.contractor,
      {
        contractor_type: "",
        contractor_name: "",
        contractor_contact_no: "",
        contractor_email: "",
        contractor_expenses:0,
        contractor_expenses_status:"",
        contractor_expenses_date:""
      }
    ]);
  }
  
  const handleRemove = (event:any,index: number)=>{
    // event.preventdefault()
    // console.log(index);
    const filterval = formik.values.contractor.filter((elm,i)=>{
      if(i !== index){
        return elm
      }
    })
    formik.setFieldValue("contractor", filterval);
  }

  const fetchSiteDetails = ()=>{
    // debugger
    const siteId = searchParams.get("siteId");
    if(searchParams.get("key") && searchParams.get("key")=='update'){
      setIsUpdate(true)
    };
    const url = apiurl + "site/"+siteId;
    axios.get(url).then((res:any)=>{
      formik.setValues(res.data)
        }).catch((err)=>{
          console.log(err)
      })
  }


   useEffect(()=>{
    fetchSiteDetails();
    // console.log('create  component rendered')
   },[])

  return(
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
              <div data-testid="DoctorCreateUpdate">
              <div role="presentation">
                  <Breadcrumbs aria-label="breadcrumb">
                    {/* <Link underline="hover" color="inherit" href="/">
                      Doctor
                    </Link> */}
                    <Link
                      underline="hover"
                      color="inherit"
                      href="/site"
                    >
                      Site
                    </Link>
                    <Typography color="text.primary">{isUpdate? 'Update':'Details'}</Typography>
                  </Breadcrumbs>
                </div>
                      <br/>
                      <Paper
                        sx={{ p: 2, display: "flex", flexDirection: "column" }}
                      >
              <Box >
              Site Details
              <form >
              <Box  component="form" noValidate  
              autoComplete="off" sx={{ flexGrow: 1,  borderRadius: 1,border: '2px solid rgb(234, 238, 240)',padding:'12px 12px 12px 12px' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={3} md={3}>
                  <TextField
                      id="outlined-name-input"
                      label="Site Id *"
                      type="text"
                      autoComplete="Site Id *"
                      fullWidth
                      name={`site_id`}
                      disabled
                      value={formik.values.site_id}
                    />
                </Grid>
                <Grid item xs={12} lg={3} md={3}>
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Site_type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name={`site_type`}
                      label="Site Type *"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.site_type}
                      fullWidth
                      disabled={!isUpdate}
                      // error={formik.touched.gender && Boolean(formik.errors.gender)}
                      // helperText={formik.touched.gender && formik.errors.gender}
                    >
                      <MenuItem value="with_material_site">With Material Site </MenuItem>
                      <MenuItem value="supervision_site">Supervision Site</MenuItem>
                    </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} lg={3} md={3}>
                    <TextField
                        id="outlined-name-input"
                        label="Site Name *"
                        type="text"
                        autoComplete="Site Name *"
                        fullWidth
                        name={`site_name`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.site_name}
                        error={formik.touched.site_name && Boolean(formik.errors.site_name)}
                        helperText={formik.touched.site_name && formik.errors.site_name}
                        disabled={!isUpdate}
                      />
                  </Grid>
                  <Grid item xs={12} lg={3} md={3}>
                  <TextField 
                      id="outlined-salary-input"
                      label="Site Engineer Name *"
                      type="text"
                      autoComplete="Site Engineer Name"
                      name={`site_engineer_name`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.site_engineer_name}
                      fullWidth
                      disabled={!isUpdate}
                      error={formik.touched.site_engineer_name && Boolean(formik.errors.site_engineer_name)}
                      helperText={formik.touched.site_engineer_name && formik.errors.site_engineer_name}
                    />
                  </Grid>
                
              
                </Grid>  
                <br/>
                <Grid container spacing={2}>
                <Grid item xs={12} lg={3} md={3}>
                  <TextField
                      id="outlined-password-input"
                      label="Site Engineer Email *"
                      type="text"
                      autoComplete="site_engineer_email"
                      name={`site_engineer_email`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.site_engineer_email}
                      fullWidth
                      disabled={!isUpdate}
                      error={formik.touched.site_engineer_email && Boolean(formik.errors.site_engineer_email)}
                      helperText={formik.touched.site_engineer_email && formik.errors.site_engineer_email}
                    />
                  </Grid>
                  <Grid item xs={12} lg={3} md={3}>
                    <TextField
                        id="outlined-Address-input"
                        label="Site Address *"
                        type="text"
                        autoComplete="Site Address"
                        name={`site_address`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.site_address}
                        fullWidth
                        disabled={!isUpdate}
                        error={formik.touched.site_address && Boolean(formik.errors.site_address)}
                        helperText={formik.touched.site_address && formik.errors.site_address}
                      />
                  </Grid>
                  <Grid item xs={12} lg={3} md={3}>
                    <TextField
                        id="outlined-Address-input"
                        label="Client Name *"
                        type="text"
                        autoComplete="Client Name"
                        name={`client_name`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.client_name}
                        fullWidth
                        disabled={!isUpdate}
                        error={formik.touched.client_name && Boolean(formik.errors.client_name)}
                        helperText={formik.touched.client_name && formik.errors.client_name}
                      />
                  </Grid>
                <Grid item xs={12} lg={3} md={3}>
                  <TextField
                      id="outlined-password-input"
                      label="Client Email *"
                      type="text"
                      autoComplete="Client Email"
                      name={`client_email`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.client_email}
                      fullWidth
                      disabled={!isUpdate}
                      error={formik.touched.client_email && Boolean(formik.errors.client_email)}
                      helperText={formik.touched.client_email && formik.errors.client_email}
                    />
                  </Grid>
                 
                  
                </Grid>
                <br/>
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={3} md={3}>
                    <TextField
                        id="outlined-State-input"
                        label="Client Contact No *"
                        type="text"
                        autoComplete="client_contact_no"
                        name={`client_contact_no`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.client_contact_no }
                        fullWidth
                        disabled={!isUpdate}
                        error={formik.touched.client_contact_no && Boolean(formik.errors.client_contact_no)}
                        helperText={formik.touched.client_contact_no && formik.errors.client_contact_no}
                      />
                  </Grid>
                  <Grid item xs={12} lg={3} md={3}>
                    <TextField
                        id="outlined-State-input"
                        label="Site Start Date *"
                        type="date"
                        autoComplete="site_start_date"
                        name={`site_start_date`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.site_start_date }
                        fullWidth
                        disabled={!isUpdate}
                        error={formik.touched.site_start_date && Boolean(formik.errors.site_start_date)}
                        helperText={formik.touched.site_start_date && formik.errors.site_start_date}
                      />
                  </Grid>
                  <Grid item xs={12} lg={3} md={3}>
                    <TextField
                        id="outlined-City-input"
                        label="Site End Date"
                        type="date"
                        autoComplete="site_end_date"
                        name={`site_end_date`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.site_end_date}
                        fullWidth
                        disabled={!isUpdate}
                        error={formik.touched.site_end_date && Boolean(formik.errors.site_end_date)}
                        helperText={formik.touched.site_end_date && formik.errors.site_end_date}
                      />
                  </Grid>
                </Grid>
              </Box>
              <br/>
              <Grid container spacing={2}>
              <Grid item xs={12} lg={11} md={11}> Contractor Details</Grid>
              {/* {!isUpdate &&  <Grid item xs={12} lg={1} md={1}> &nbsp;</Grid> } */}
              {isUpdate &&<Grid item xs={12} lg={1} md={1}> 
               <Button
                variant="contained"
                sx={{ mt: 4, mb: 4, width: 4, marginTop:"-4px",fontSize:"10px"}}
                color="secondary"
                onClick={handleAdd}
              >
                +
              </Button>
              </Grid>}
              </Grid>
              {!isUpdate &&  <br/>}
              <Box  component="form" noValidate  
              autoComplete="off" sx={{ flexGrow: 1,  borderRadius: 1,border: '2px solid rgb(234, 238, 240)',padding:'12px 12px 12px 12px' ,marginTop:"-12px"}}>
                <Grid container spacing={2}>
                  {formik.values.contractor && formik.values.contractor.length>0 && formik.values.contractor.map((elm,index)=>{
                    const i = index+1;
                    return (<>
                          <Grid item xs={12} lg={3} md={3}>
                          {isUpdate && 
                          <Button
                    
                            sx={{ mt: 0, mb: 0, width: 0,fontSize:"8px"}}
                            color="secondary"
                            onClick={(e)=>handleRemove(e,index)}
                          >
                            x
                          </Button> }
                          <b>{index+1}</b>  
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Contractor Type</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              name={`contractor[${index}].contractor_type`}
                              label="Contractor Type *"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={elm.contractor_type}
                              fullWidth
                              disabled={!isUpdate}
                              // error={formik.contractor[${index}].touched..contractor_type && Boolean(formik.errors.site_address)}
                              // helperText={formik.touched.gender && formik.errors.gender}
                            >
                              <MenuItem value="rcc_contractor">RCC Contractor</MenuItem>
                              <MenuItem value="bbm_plaster_contractor">BBM & Plaster Contractor</MenuItem>
                              <MenuItem value="tiles_contractor">Tiles Contractor</MenuItem>
                              <MenuItem value="plumbing_contractor">Plumbing Contractor</MenuItem>
                              <MenuItem value="electric_contractor">Electric Contractor</MenuItem>
                              <MenuItem value="color_contractor">Color Contractor</MenuItem>
                              <MenuItem value="steel_grill_contractor">Steel Grill Contractor</MenuItem>
                              <MenuItem value="window_contractor">Window Contractor</MenuItem>
                              <MenuItem value="door_Contractor">Door Contractor</MenuItem>
                              <MenuItem value="others">Others</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={3} md={3}>
                          <TextField
                              id="outlined-name-input"
                              label="Contractor Name"
                              type="text"
                              autoComplete="Contractor Name"
                              fullWidth
                              name={`contractor[${index}].contractor_name`}
                              value={elm.contractor_name}
                              onChange={formik.handleChange}
                              disabled={!isUpdate}
                              // error={formik.touched.contractor?.[index]?.contractor_type && Boolean(formik.errors.contractor?.[index].contractor_type)}
                              // helperText={formik.touched.contractor?.[index]?.contractor_type && Boolean(formik.errors.contractor?.[index])}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3} md={3}>
                          <TextField
                              id="outlined-name-input"
                              label="Contractor Contact No"
                              type="text"
                              autoComplete="contractor_contact_no"
                              fullWidth
                              name={`contractor[${index}].contractor_contact_no`}
                              value={elm.contractor_contact_no}
                              onChange={formik.handleChange}
                              disabled={!isUpdate}
                              // error={formik.touched.contractor?.[index]?.contractor_contact_no && Boolean(formik.errors.contractor?.[index]?.contractor_contact_no)}
                              // helperText={formik.touched.contractor?.[index]?.contractor_contact_no && Boolean(formik.errors.contractor?.[index].contractor_contact_no)}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3} md={3}>
                          <TextField
                              id="outlined-name-input"
                              label="Contractor Email"
                              type="text"
                              autoComplete="contractor_email"
                              fullWidth
                              name={`contractor[${index}].contractor_email`}
                              value={elm.contractor_email}
                              onChange={formik.handleChange}
                              disabled={!isUpdate}
                              // error={formik.touched.employee_details[0].name && Boolean(formik.errors.employee_details[0].name)}
                              // helperText={formik.touched.employee_details[0].name && formik.errors.employee_details[0].name}
                            />
                        </Grid>
                    
                    </>)
                  })}
                  </Grid>
                  </Box>
              <br/>
              {isUpdate && 
              <Box  component="form" noValidate  
              autoComplete="off" sx={{ flexGrow: 1,  borderRadius: 1,border: '2px solid rgb(234, 238, 240)',padding:'12px 12px 12px 12px' }}>
                <Grid>
                  <br/>
                  <Stack spacing={2} direction="row">
                
                    <Button variant="contained" color="success" type='submit' onClick={handleSubmit}    disabled={!formik.isValid}>Update</Button>
                  
                    </Stack>
                </Grid>
              </Box>
              }
              </form>
              </Box>
                </Paper>
            </div>
    </Container>
    </Box>
  </Box>
</ThemeProvider>
</>)};

export default UpdateSite;


