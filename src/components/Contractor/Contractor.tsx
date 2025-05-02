import React, { FC } from 'react';
import styles from './Contractor.module.css';

interface ContractorProps {}

const Contractor: FC<ContractorProps> = () => (
  <div className={styles.Contractor} data-testid="Contractor">
    Contractor Component
  </div>
);

export default Contractor;
