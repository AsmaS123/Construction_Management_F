import React, { FC } from 'react';
import styles from './PasswordInput.module.css';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

interface PasswordInputProps {}

const PasswordInput = ({ password, handlePassword ,handleBlur,formik}:any) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      data-testid="PasswordInput"
      type={showPassword ? "text" : "password"}
      label="Password"
      id="password"
      name="password"
      autoComplete="new-password"
      value={password}
      onChange={handlePassword}
      onBlur={handleBlur}
      required={true}
      error={formik.touched.password && Boolean(formik.errors.password)}
      helperText={formik.touched.password && formik.errors.password}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      fullWidth
    />
  );
};

export default PasswordInput;
