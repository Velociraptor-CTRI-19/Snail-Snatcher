const path = require('path');
import React from 'react';
import App from '../client/components/App';
import NotFound from '../client/components/NotFound.js'
// import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';


describe('Not Found', () => {
    // let component;

    // beforeAll(() => {
    //     component = render(<NotFound />)
    // });

    test('test', () => {
        // somehow expect the inner text to say 'The page you are looking for was not found!'
        const { getByText } = render(<NotFound />)
        expect(getByText('The page you are looking for was not found!')).toBeInTheDocument();
    })
});
