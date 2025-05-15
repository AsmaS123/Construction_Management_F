import React, { FC } from "react";
import styles from "./GlobalLoader.module.css";
import { Backdrop, CircularProgress } from "@mui/material";
interface GlobalLoaderProps {}

const GlobalLoader = () => {
  return (
    <div className={styles.GlobalLoader} data-testid="GlobalLoader">
      GlobalLoader Component
    </div>
  );
};

export default GlobalLoader;
