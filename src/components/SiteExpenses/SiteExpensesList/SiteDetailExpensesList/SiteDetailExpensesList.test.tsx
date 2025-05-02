import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SiteDetailExpensesList from './SiteDetailExpensesList';

describe('<SiteDetailExpensesList />', () => {
  test('it should mount', () => {
    render(<SiteDetailExpensesList />);
    
    const siteDetailExpensesList = screen.getByTestId('SiteDetailExpensesList');

    expect(siteDetailExpensesList).toBeInTheDocument();
  });
});