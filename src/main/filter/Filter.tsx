import React from 'react';
import './Filter.scss';

export interface Props{
  renderColorOptions:()=>void,
  renderManufacturerOptions:()=>void,
  onInputChange:(evt:React.ChangeEvent<HTMLSelectElement>) => void,
  selectedColor:string,
  selectedManufacturer:string
  onFilter:() => void;
}
function Filter({renderManufacturerOptions,renderColorOptions,onInputChange,selectedColor="none",selectedManufacturer="none",onFilter}:Props) {
  
  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    onInputChange(e);  
  }

  return (
    <div className="filter-main">
      <div className="subdiv">
        <div className="control">
          <label>Color</label>
          <div>
            <select
              value={selectedColor}
              onChange={(e)=>handleChange(e)}
              name="color"
              data-testid="color-test-id"
            >
              <option value="none">All car colors</option>
              {renderColorOptions()}
            </select>
          </div>

        </div>
        <div className="control">
          <label>
            Manufacturer
          </label>
          <div>
            <select
              value={selectedManufacturer}
              onChange={(e)=>handleChange(e)}
              name="manufacturer"
              data-testid="manufacturer-test-id"
            >
              <option value="none">All manufacturers</option>
             {renderManufacturerOptions()}
            </select>
          </div>

        </div>
        <div className="btndiv"> <button className="filterbtn" onClick={onFilter}>Filter</button></div>
      </div>
    </div>
  );
}

export default Filter;