import React, { FC, useEffect } from "react";
import styles from "./CreateUpdateRole.module.css";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Cookies from "js-cookie";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../../Layout/Layout";
// import axios from "axios";
import axiosInstance from "../../../middleware/axiosinterceptors";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiurl from "../../../config/url";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { toast, ToastContainer } from "react-toastify";

interface CreateUpdateRoleProps {}

const CreateUpdateRole = (props: any) => {
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [roleNames, setRolesNames] = useState(["user", "superuser", "admin"]);
  const handleChangePerson = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    formik.setFieldValue(
      "roles",
      typeof value === "string" ? value.split(",") : value,
    );
  };
  const UserRoleSchema = Yup.object().shape({
    roles: Yup.array()
      .of(Yup.string().required("role cannot be empty"))
      .min(1, "At least one role is required"),
    status: Yup.string().required("Status is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      status: "",
      roles: [],
    },
    validationSchema: UserRoleSchema,
    onSubmit: (values) => {},
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // debugger
    const obj = formik.values;
    const url = apiurl + "roles/" + obj.email;
    axiosInstance
      .put(url, obj)
      .then((res: any) => {
        debugger;
        // toast.error('Resource not found.',{ position: 'top-center'});
        // toast.success(res.data.message);
        toast.success("Role updated successfully", { position: "top-center" });
        // alert("role updated successfully");
        props.updateVisibility(false);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (props.childData) {
      formik.setValues(props.childData);
    }
  }, [props.childData]);

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <ToastContainer
          position="top-center"
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
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            {/* <Link underline="hover" color="inherit" href="/">
                                Doctor
                              </Link> */}
            <Link underline="hover" color="inherit" href="/roles">
              Uer Roles
            </Link>
            <Typography color="text.primary">Update</Typography>
          </Breadcrumbs>
        </div>
        <br />
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={3} md={3}>
              <TextField
                id="outlined-name-input"
                label="Email Id"
                type="text"
                autoComplete="Email Id"
                fullWidth
                name={`email`}
                disabled
                value={formik.values.email}
              />
            </Grid>
            <Grid item xs={12} lg={3} md={3}>
              <TextField
                id="outlined-name-input"
                label="Name"
                type="text"
                autoComplete="Name"
                fullWidth
                name={`name`}
                disabled
                value={formik.values.name}
              />
            </Grid>
            <Grid item xs={12} lg={3} md={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name={`status`}
                  label="Status *"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.status}
                  fullWidth
                  error={formik.touched.status && Boolean(formik.errors.status)}
                  // helperText={formik.touched.status && formik.errors.status}
                >
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={3} md={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-checkbox-label">Roles</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={formik.values.roles}
                  onChange={handleChangePerson}
                  input={<OutlinedInput label="Roles" />}
                  renderValue={(selected) => selected.join(", ")}
                  fullWidth
                  // MenuProps={MenuProps}
                >
                  {roleNames.map((val): any => {
                    let temp: any = val;
                    let flag: boolean = false;
                    return (
                      <MenuItem key={val} value={val}>
                        {/* <Checkbox checked={formik.values && formik.values.roles.length>0 && formik.values.roles.indexOf(name) > -1} /> */}
                        {formik.values && formik.values.roles.length > 0 && (
                          <Checkbox checked={flag} />
                        )}

                        <ListItemText primary={val} />
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{
                flexGrow: 1,
                borderRadius: 1,
                border: "2px solid rgb(255, 255, 255)",
                padding: "12px 12px 12px 12px",
              }}
            >
              <Grid container spacing={2}>
                <br />
                <Grid item xs={12} lg={3} md={3}>
                  <Stack spacing={2} direction="row">
                    <Button
                      variant="contained"
                      color="success"
                      type="submit"
                      onClick={handleSubmit}
                      disabled={!formik.isValid}
                    >
                      Update
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default CreateUpdateRole;
