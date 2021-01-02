import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainComponent from './Main';

const props = {
    colors: [] as any,
    manufacturers: [] as any,
    selectedColor: "none",
    selectedManufacturer: "none",
    onFilter:jest.fn(),
    availableCars:[],
    pageCount: 1,
    onPageChange:jest.fn(),
    selectedPage: 1,
    totalCars:10,
    dataFetched: false,
    onInputChange:jest.fn,
    renderColorOptions:jest.fn,
    renderManufacturerOptions:jest.fn,
}
afterEach(cleanup)
test('render <MainComponent>', () => {
    const wrapper = render(<MainComponent {...props} />)
    expect(wrapper).toMatchSnapshot()
})