import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ChatBot from './ChatBot';

describe('<ChatBot />', () => {
  test('it should mount', () => {
    render(<ChatBot />);
    
    const chatBot = screen.getByTestId('ChatBot');

    expect(chatBot).toBeInTheDocument();
  });
});