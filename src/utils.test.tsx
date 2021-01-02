import React from 'react';
import {cleanup} from '@testing-library/react';
import {fetchCars,fetchColors,fetchManufacturers,fetchCarDetails,capitalize,getProp} from './utils';
import axios, { AxiosStatic} from 'axios';

afterEach(cleanup);
interface AxiosMock extends AxiosStatic {
    mockResolvedValue: Function
    mockRejectedValue: Function
  }
  
jest.mock('axios')
const mockedAxios = axios as AxiosMock

it('test for capitalize function', () => {
    expect(capitalize('test')).toBe('Test');
});

it('test for getProp function', () => {
    expect(getProp(null,'a')).toBe('');
    expect(getProp({'a':1},'')).toStrictEqual({'a':1});
    expect(getProp({'a':1},'a')).toBe(1);
});

it('test for fetchCars function', async() => {
    mockedAxios.mockResolvedValue({ data: {} });
    const res=await fetchCars({ manf : '', color : '', page : 1 })
    expect(res).toEqual({})
});
it('test for fetchColors function', async() => {
    mockedAxios.mockResolvedValue({ data: {} });
    const res=await fetchColors({})
    expect(res).toEqual({})
});
it('test for fetchManufacturers function', async() => {
    mockedAxios.mockResolvedValue({ data: {} });
    const res=await fetchManufacturers({})
    expect(res).toEqual({})
});
it('test for fetchCarDetails function', async() => {
    mockedAxios.mockResolvedValue({ data: {} });
    const res=await fetchCarDetails(10041,{})
    expect(res).toEqual({})
});