import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Site from './Site';

describe('<Site />', () => {
  test('it should mount', () => {
    render(<Site />);
    
    const site = screen.getByTestId('Site');

    expect(site).toBeInTheDocument();
  });
});