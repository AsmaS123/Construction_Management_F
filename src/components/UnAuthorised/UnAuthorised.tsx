import React, { FC } from 'react';
import styles from './UnAuthorised.module.css';

interface UnAuthorisedProps {}

const UnAuthorised = () => (
  <div className={styles.UnAuthorised} data-testid="UnAuthorised">
    <button onClick={()=> window.location.href = "/dashboard" }>back</button> 
    UnAuthorised Component
  </div>
);

export default UnAuthorised;
