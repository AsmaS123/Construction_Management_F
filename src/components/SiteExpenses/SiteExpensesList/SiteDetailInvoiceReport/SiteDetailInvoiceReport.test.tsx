import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SiteDetailInvoiceReport from './SiteDetailInvoiceReport';

describe('<SiteDetailInvoiceReport />', () => {
  test('it should mount', () => {
    render(<SiteDetailInvoiceReport />);
    
    const siteDetailInvoiceReport = screen.getByTestId('SiteDetailInvoiceReport');

    expect(siteDetailInvoiceReport).toBeInTheDocument();
  });
});