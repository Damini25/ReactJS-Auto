import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter as Router} from 'react-router-dom';
import NotFound from './NotFound';

afterEach(cleanup)
test('render <NotFound>', () => {
    const notfound = render(<Router><NotFound /></Router>)
    expect(notfound).toMatchSnapshot()
})