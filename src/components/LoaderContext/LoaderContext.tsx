import React, { FC } from "react";
import styles from "./LoaderContext.module.css";

interface LoaderContextProps {}

const LoaderContext: FC<LoaderContextProps> = () => (
  <div className={styles.LoaderContext} data-testid="LoaderContext">
    LoaderContext Component
  </div>
);

export default LoaderContext;
