import React from 'react';
import { render, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CarDetails from './Cardetails';
import axios, { AxiosStatic} from 'axios';
import { fetchCarDetails } from '../../../utils';

interface AxiosMock extends AxiosStatic {
    mockResolvedValue: Function
    mockRejectedValue: Function
}

jest.mock('axios')
jest.mock('react-router-dom', () => {
    // Require the original module to not be mocked...
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        useParams: jest.fn(),
    };
});
const mockedAxios = axios as AxiosMock
const mockData = {
    "car": {
        "stockNumber": 10123,
        "manufacturerName": "Tesla",
        "modelName": "Model X",
        "color": "blue",
        "mileage": { "number": 153819, "unit": "km" },
        "fuelType": "Petrol",
        "pictureUrl": "https://auto1-js-task-api--mufasa71.repl.co/images/car.svg"
    }
}
it('displays the cardetails from cardetails API', async () => {
    mockedAxios.mockResolvedValue({ data: mockData });
    await act(async () => {
        const res = await fetchCarDetails(10123, {})
        const { asFragment }=render(<Router><CarDetails /></Router>,)
        expect(res).toEqual(mockData)
        expect(asFragment()).toMatchSnapshot();
    })
})