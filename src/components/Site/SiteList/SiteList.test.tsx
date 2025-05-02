import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SiteList from './SiteList';

describe('<SiteList />', () => {
  test('it should mount', () => {
    render(<SiteList />);
    
    const siteList = screen.getByTestId('SiteList');

    expect(siteList).toBeInTheDocument();
  });
});