import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Contractor from './Contractor';

describe('<Contractor />', () => {
  test('it should mount', () => {
    render(<Contractor />);
    
    const contractor = screen.getByTestId('Contractor');

    expect(contractor).toBeInTheDocument();
  });
});