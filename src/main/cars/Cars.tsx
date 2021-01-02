import React from 'react';
import './Cars.scss';
import Pagination from '@material-ui/lab/Pagination';
import { Link } from "react-router-dom";
import {capitalize} from '../../utils';

export interface Props {
  availableCars: any[],
  pageCount: number,
  onPageChange: (event: any, value: number) => void,
  selectedPage: number,
  totalCars: number
}
export interface Cars {
  stockNumber: number,
  manufacturerName: string,
  modelName: string,
  mileage: {
    number: number,
    unit: string
  },
  fuelType: string,
  color: string,
  pictureUrl: string
}
function Cars({ availableCars, pageCount = 1, onPageChange, selectedPage = 1, totalCars }: Props) {
  console.log('incars', availableCars)
  const itemsPerPage = selectedPage <= Math.floor(totalCars / 10) ? 10 : (totalCars % 10);
  
  const renderCars = () => {
    return availableCars && availableCars.map((item: Cars, ind) => {
      return (<div className="features" key={ind}>
        <div className="carimg">
          <img src={item.pictureUrl} className="picture" alt="logo" />
        </div>
        <div className="details">
          <p className="font18 fontbold">{`${item.manufacturerName} ${item.modelName}`}</p>
          <p className="font14">{`Stock # ${item.stockNumber} - ${item.mileage.number + ' ' + item.mileage.unit} - ${item.fuelType} - ${capitalize(item.color)} `}</p>
          <p className="font12">
          <Link to={`/cardetails/${item.stockNumber}`} className="ctacolor">View Details</Link>
          </p>
        </div>
      </div>);
    })
  }
  return (
    <div className="cars-main">
      <div>
        <p className="font18 fontbold" data-testid="available-cars-id">Available cars</p>
        <p>Showing {itemsPerPage} of {totalCars} results</p>
      </div>
      {renderCars()}
      <div className="pagination">
        <Pagination count={pageCount} page={selectedPage} onChange={onPageChange} color="primary" showFirstButton showLastButton />
      </div>
    </div>
  );
}

export default Cars;
