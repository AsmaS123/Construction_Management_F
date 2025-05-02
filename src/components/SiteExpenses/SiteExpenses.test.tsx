import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SiteExpenses from './SiteExpenses';

describe('<SiteExpenses />', () => {
  test('it should mount', () => {
    render(<SiteExpenses />);
    
    const siteExpenses = screen.getByTestId('SiteExpenses');

    expect(siteExpenses).toBeInTheDocument();
  });
});