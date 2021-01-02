import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Cars from './Cars';

const props = {
    availableCars:[],
    pageCount: 1,
    onPageChange:jest.fn(),
    selectedPage: 1,
    totalCars:10,
}
afterEach(cleanup)
test('render <Cars>', () => {
    const wrapper = render(<Cars {...props} />)
    expect(wrapper).toMatchSnapshot()
})