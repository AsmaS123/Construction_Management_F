import React, { FC } from "react";
import styles from "./Office.module.css";

interface OfficeProps {}

const Office = () => (
  <div className={styles.Office} data-testid="Office">
    Office Component
  </div>
);

export default Office;
