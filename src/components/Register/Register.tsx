import React, { FC } from "react";
import styles from "./Register.module.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiurl from "../../config/url";
import {TextField } from "@mui/material";
import PasswordInput from "../PasswordInput/PasswordInput";
import { useFormik } from 'formik';
import * as Yup from "yup";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

// type RegisterT = {
//   name: string;
//   email: string;
//   password: string;
//   roles: never[] | [string];
// };

export default function Register() {
  const navigate = useNavigate();
  const SignUpSchema = Yup.object().shape({
        name:Yup.string().required("user name is required"),
        email:Yup.string().required("email is required"),
        password:Yup.string().required("password is required"),
        roles:Yup.array()
     });

  const formik = useFormik({
      initialValues: {
        name:'',
        email:'',
        password:'',
        roles:['user']
      },
      validationSchema: SignUpSchema,
      onSubmit: (values) => {
        // console.log(values);
      },
    });
      
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // debugger
    const obj = formik.values;
    // console.log(obj,'obj')
    const url = apiurl + "signUp";
    axios
      .post(url, obj)
      .then((res: any) => {
        navigate("/");
      })
      .catch((error) => {
      });
  };

  const handleChange = () => {
    navigate("/");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src="/logo.jpg" alt="Example" width="70" />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="User Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>

              <Grid item xs={12}>
              <PasswordInput
                  password={formik.values.password}
                  // handlePassword={(e:any) => setPassword(e.target.value)}
                  handlePassword={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  formik={formik}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              name="signup"
              disabled={!formik.isValid}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={handleChange}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

