import React, { useState } from 'react';
import './Cardetails.scss';
import { useParams } from 'react-router-dom';
import { fetchCarDetails } from '../../../utils';
import { useEffect } from 'react';
import { capitalize, getProp } from '../../../utils';

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

function CarDetails() {
  const params: { stockNumber: string } = useParams();
  const controller = new AbortController();
  const [carDetails, setCarDetails] = useState({} as Cars);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    let isActive = true;
    getCarsdetails(isActive);
    return () => {
      controller.abort();
      isActive = false
    }
  }, []);

  const getCarsdetails = async (isActive: boolean) => {
    try {
      const { car } = await fetchCarDetails(params.stockNumber, {});
      if (car && isActive) {
        setCarDetails(car)
        console.log('stock based cars', car);
        setDataFetched(true);
      }
    } catch {
      console.log('Some error occurred')
    }
  }

  return (
    <div className="cardetails">
      { dataFetched && <div className="desc">
        <div className="desc1">
          <p className="font32 fontbold">{`${getProp(carDetails, 'manufacturerName')} ${getProp(carDetails, 'modelName')}`}</p>
          <p className="font18">{`Stock # ${getProp(carDetails, 'stockNumber')} - ${getProp(carDetails, 'mileage').number + ' ' + getProp(carDetails, 'mileage').unit} - ${getProp(carDetails, 'fuelType')} - ${capitalize(getProp(carDetails, 'color'))} `}</p>
          <p className="font14 p3">The car is currently available and can be delivered as soon as tomorrow morning. Please be aware that delivery time shown
        in this page are not definitive and may changes due to bad whether conditions</p>
        </div>
        <div className="desc2">
          <p>If you like this car, click the button and save it in your collection fo favourite items.</p>
          <div className="btndiv"><button className="savebtn" >Save</button></div>
        </div>
      </div>}
      {
        !dataFetched && <div data-testid="loading" id="loading" className="loading" >Loading...</div>
      }
    </div>
  );
}

export default CarDetails;
