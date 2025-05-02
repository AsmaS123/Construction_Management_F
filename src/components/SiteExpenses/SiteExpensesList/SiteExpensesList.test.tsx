import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SiteExpensesList from './SiteExpensesList';

describe('<SiteExpensesList />', () => {
  test('it should mount', () => {
    render(<SiteExpensesList />);
    
    const siteExpensesList = screen.getByTestId('SiteExpensesList');

    expect(siteExpensesList).toBeInTheDocument();
  });
});