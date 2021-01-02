import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import App from './App';
import { fetchCars, fetchColors, fetchManufacturers } from './utils';
import axios, { AxiosStatic } from 'axios';


afterEach(cleanup);
interface AxiosMock extends AxiosStatic {
  mockResolvedValue: Function
  mockRejectedValue: Function
}

jest.mock('axios')
const mockedAxios = axios as AxiosMock

describe('App component', () => {

  it('displays loading text before cars are loaded', async () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('cars-loading')).toHaveTextContent('Loading...')
  });

  it('displays the available cars from cars API', async () => {
    const fakeCars = {
      "cars": [
        {
          "stockNumber": 10025,
          "manufacturerName": "Fiat",
          "modelName": "Qubo",
          "color": "white",
          "mileage": {
            "number": 151459,
            "unit": "km"
          },
          "fuelType": "Diesel",
          "pictureUrl": "https://auto1-js-task-api--mufasa71.repl.co/images/car.svg"
        }
      ],
      "totalPageCount": 100,
      "totalCarsCount": 1000
    }
    mockedAxios.mockResolvedValue({ data: fakeCars });
    await act(async () => {
      const res = await fetchCars({ manf: '', color: '', page: 1 })
      render(<App />)
      expect(res).toEqual(fakeCars)
    })
  })

  it('displays the colors from colors API', async () => {
    const fakeColors = { "colors": ["red", "blue", "green", "black", "yellow", "white", "silver"] }
    mockedAxios.mockResolvedValue({ data: fakeColors });
    await act(async () => {
      const res = await fetchColors({})
      render(<App />)
      expect(res).toEqual(fakeColors)
    })
  })

  it('displays the manufacturers from manufacturers API', async () => {
    const fakeManufacturers = {
      "manufacturers": [
        {
          "name": "Audi",
          "models": [
            {
              "name": "100"
            }
          ]
        }]
    }
    mockedAxios.mockResolvedValue({ data: fakeManufacturers });
    await act(async () => {
      const res = await fetchManufacturers({})
      render(<App />)
      expect(res).toEqual(fakeManufacturers)
    })
  })
})















// test('renders <App/>', () => {
//   const wrapper = render(<App />);
//   expect(wrapper).toMatchSnapshot()
// });

// test("should display a loading text before loading cars", () => {
//   const wrapper = render(<App />);
//   const load = wrapper.getByTestId('cars-loading')
//   expect(load).toHaveTextContent('Loading...')
//   // expect(await screen.findByText('Available cars')).toBeInTheDocument();
// });

// test('should load and display the cars data', async () => {
//   const url = 'https://auto1-mock-server.herokuapp.com/api/cars?&page=1'
//   const {getByTestId} = render(<App />)
//   const getCars= jest.fn();
//   //axiosMock.get.mockResolvedValueOnce(carsData);
//  // fetchAPI(url).mockResolvedValueOnce(carsData);
//  // const availableCars = await waitFor(() => getByTestId('available-cars-id'))
// //  const {data} = await fetchAPI(url);
//  // await act(() =>expect(getByTestId('available-cars-id')).toHaveTextContent('Available cars'))
//   //expect(fetchAPI).toHaveBeenCalledWith(url);
//   //expect(axiosMock.get).toHaveBeenCalledTimes(1)
//   //expect(axiosMock.get).toHaveBeenCalledWith(url)
//  // expect(getByTestId('available-cars-id')).toHaveTextContent('Available cars')
// })
// it('should load and display the cars data', async () => {
//   const url = 'https://auto1-mock-server.herokuapp.com/api/cars?&page=1'
//   const promise = Promise.resolve({ data: { ...carsData } })
//   axiosMock.get.mockResolvedValueOnce(() => promise);
//   const { getByTestId } = render(<App />);
//   await act(() => expect(getByTestId('available-cars-id')).toHaveTextContent('Available cars'));
//   //expect(getByTestId('available-cars-id')).toHaveTextContent('Available cars')
// });
// it('should load and display the colors data', async () => {
//   const url = 'https://auto1-mock-server.herokuapp.com/api/cars?&page=1'
//   //const promise = Promise.resolve({ data: { ...colors } })
//   ////axiosMock.get.mockResolvedValueOnce(() => promise);
//   const {data} = await fetchAPI(url,{manufacturer: '', color:'', page:1})
//   const { getByTestId } = render(<App />);
//   await act(() => expect(getByTestId('available-cars-id')).toHaveTextContent('Available cars'));
//   //expect(getByTestId('available-cars-id')).toHaveTextContent('Available cars')
// });