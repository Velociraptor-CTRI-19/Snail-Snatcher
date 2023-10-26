const path = require('path');
import React from 'react';
import { NotFound } from '../client/components/NotFound';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'


describe('Not Found', () => {

test('it should contain the appropriate text', () => {
    render(<NotFound />);
    expect(screen.getByText('The page you are looking for was not found!')).toBeInTheDocument();
  });
})
//screen is what is showing
//getByText is content type (inject content here)
//tobeintheDocument can be left open 