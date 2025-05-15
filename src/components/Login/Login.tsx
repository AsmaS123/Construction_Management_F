import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import PasswordInput from "../PasswordInput/PasswordInput";
import apiurl from "../../config/url";
import { useDispatch } from "react-redux";
import { setuser, getuser } from "../../redux/actions";
import Auth from "../../middleware/auth";
import { ToastContainer } from "react-toastify";

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  // const [error, setError] = useState(null);
  const [roles, setRoles] = useState([]);
  const dispatch = useDispatch();
  const authservice = Auth();
  const handleSubmit = (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    // debugger
    event.preventDefault();
    login();
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("email is required"),
    password: Yup.string().required("password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      // console.log(values);
    },
  });

  function login() {
    const data = formik.values;
    const url = apiurl + "login";

    axios
      .post(url, data)
      .then((res) => {
        // debugger
        const data = res.data;
        const user: any = {
          email: data.email,
          roles: data.roles,
        };
        dispatch(setuser(user));
        // Create a Date object 1 hour from now
        const inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000);
        Cookies.set("user", JSON.stringify(user), {
          expires: inOneHour,
          secure: true,
        });
        // Cookies.set('useremail', user.email, { expires: 7, secure: true });
        navigate("/dashboard");
      })
      .catch((errr) => {
        // setError(errr.message);
      });
  }

  const handleChange = () => {
    navigate("/signup");
  };

  useEffect(() => {
    // debugger
    if (authservice) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <ThemeProvider theme={defaultTheme} data-testid="Login">
      <Container component="main" maxWidth="xs">
        {/* <ToastContainer
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
        /> */}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
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

            <PasswordInput
              password={formik.values.password}
              // handlePassword={(e:any) => setPassword(e.target.value)}
              handlePassword={formik.handleChange}
              handleBlur={formik.handleBlur}
              formik={formik}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!formik.isValid}
              // onClick={login}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={handleChange}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
