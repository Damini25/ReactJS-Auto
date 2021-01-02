import React, { useEffect, useState } from 'react';
import './main.scss';
import Filter from './filter/Filter';
import Cars from './cars/Cars';

export interface Props {
  availableCars: any[],
  pageCount: number,
  onPageChange: (event: any, value: number) => void,
  selectedPage: number,
  totalCars: number,
  colors: [],
  manufacturers: [],
  onInputChange: (evt: React.ChangeEvent<HTMLSelectElement>) => void,
  selectedColor: string,
  selectedManufacturer: string
  onFilter: () => void;
  dataFetched: boolean;
  renderColorOptions:()=>void,
  renderManufacturerOptions:()=>void,
}

function MainComponent({ renderColorOptions, renderManufacturerOptions, onInputChange, selectedColor = "none", selectedManufacturer = "none", onFilter, availableCars, pageCount = 1, onPageChange, selectedPage = 1, totalCars, dataFetched = false }: Props) {
  return (
    <div className="content">
      <Filter
        renderManufacturerOptions={renderManufacturerOptions}
        renderColorOptions={renderColorOptions}
        selectedColor={selectedColor}
        selectedManufacturer={selectedManufacturer}
        onInputChange={onInputChange}
        onFilter={onFilter}
      ></Filter>
      {dataFetched && <Cars
        availableCars={availableCars}
        pageCount={pageCount}
        onPageChange={onPageChange}
        selectedPage={selectedPage}
        totalCars={totalCars}
      ></Cars>}
      {
        !dataFetched && <div className="loading" data-testid="cars-loading">Loading...</div>
      }

    </div>
  );
}

export default MainComponent;
