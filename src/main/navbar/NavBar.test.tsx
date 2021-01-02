import React from 'react';
import { render, cleanup } from '@testing-library/react';
import NavBar from './NavBar';

afterEach(cleanup)
test('render <NavBar>', () => {
    const navBar = render(<NavBar />)
    expect(navBar).toMatchSnapshot()
})

