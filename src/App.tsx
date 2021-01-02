import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Main from './main/Main';
import CarDetails from './main/cars/cardetails/Cardetails';
import Navbar from './main/navbar/NavBar';
import { fetchColors, fetchManufacturers, capitalize, fetchCars } from './utils';
import NotFound from './NotFound/NotFound'


function App() {
  const [availableCars, setAvailableCars] = useState([]);
  const [colors, setColors] = useState([] as any);
  const [manufacturers, setManufacturers] = useState([] as any);
  const [dataFetched, setDataFetched] = useState(false);
  const [filters, setFilter] = useState({
    color: "" as string,
    manufacturer: "" as string
  });
  const [selectedPage, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [totalCars, setTotalCarsCount] = useState(10);

  useEffect(() => {
    let isActive = true;
    getCars({}, isActive);
    getColors(isActive);
    getManufacturer(isActive);
    return () => {
      isActive = false;
    }
  }, []);

  const getCars = async ({ manf = '', color = '', page = 1 }, isActive: boolean) => {
    try {
      const { cars, totalPageCount, totalCarsCount } = await fetchCars({ manufacturer: manf, color, page });
      console.log('all cars', cars);
      if (cars && isActive) {
        setAvailableCars(cars)
        setPageCount(totalPageCount)
        setTotalCarsCount(totalCarsCount);
        setDataFetched(true);
      }
    } catch {
      console.log('Some error occurred')
    }
  }
  const getColors = async (isActive: boolean) => {
    try {
      const { colors } = await fetchColors({});
      if (colors && colors.length && isActive) {
        setColors(colors)
      }
    } catch {
      console.log('Some error occurred')
    }
  }
  const getManufacturer = async (isActive: boolean) => {
    try {
      const { manufacturers } = await fetchManufacturers({});
      if (manufacturers && manufacturers.length && isActive) {
        setManufacturers(manufacturers)
      }
    } catch {
      console.log('Some error occurred')
    }
  }

  const onInputChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(evt.target.name, evt.target.value)
    if (evt.target.name === 'color') {
      setFilter({
        color: evt.target.value,
        manufacturer: filters.manufacturer
      })
    } else {
      setFilter({
        color: filters.color,
        manufacturer: evt.target.value
      })
    }
  };

  const onFilter = () => {
    const manf = filters.manufacturer !== 'none' ? filters.manufacturer : '';
    const color = filters.color !== 'none' ? filters.color : '';
    getCars({ manf: manf, color: color }, true);
    setPageNumber(1);
  }

  const onPageChange = (event: any, value: number) => {
    setPageNumber(value);
    const manf = filters.manufacturer !== 'none' ? filters.manufacturer : '';
    const color = filters.color !== 'none' ? filters.color : '';
    console.log('page', value)
    getCars({ manf: manf, color: color, page: value }, true);
  }
  const renderColorOptions = () => {
    return colors && colors.map((item: string, ind: any) => {
      return (<option value={item} key={ind}>{capitalize(item)}</option>)
    })
  }
  const renderManufacturerOptions = () => {
    return manufacturers && manufacturers.map((item: { name: string }, ind: any) => {
      return (<option value={item.name} key={ind}>{capitalize(item.name)}</option>)
    })
  }

  return (
    <div>
      <div className="main">
        <Navbar></Navbar>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={() => <Main
                colors={colors}
                manufacturers={manufacturers}
                selectedColor={filters.color}
                selectedManufacturer={filters.manufacturer}
                onInputChange={onInputChange}
                onFilter={onFilter}
                availableCars={availableCars}
                pageCount={pageCount}
                onPageChange={onPageChange}
                selectedPage={selectedPage}
                totalCars={totalCars}
                dataFetched={dataFetched}
                renderColorOptions={renderColorOptions}
                renderManufacturerOptions={renderManufacturerOptions}
              />} />
              <Route exact path="/cardetails/:stockNumber" component={() => <CarDetails
              />} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
        <div className="footer">
          <div>@ Auto1 Group 2018</div>
        </div>
      </div>
    </div>

  );
};

export default App;
