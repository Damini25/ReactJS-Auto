import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Filter from './Filter';

const props = {
    renderColorOptions:jest.fn,
    renderManufacturerOptions:jest.fn,
    selectedColor: "none",
    selectedManufacturer: "none",
    onFilter:jest.fn(),
    onInputChange:jest.fn,
}
afterEach(cleanup)
test('render <Filter>', () => {
    const wrapper = render(<Filter {...props} />)
    expect(wrapper).toMatchSnapshot()
})
it('it should change the value on changing color options', () => {
    const wrapper = render(<Filter {...props} />); 
    const colorInput = wrapper.getByTestId('color-test-id')as HTMLSelectElement
    const event = {
        target: { value: "none" }
      } as React.ChangeEvent<HTMLSelectElement>;
    fireEvent.change(colorInput,event)
    expect(colorInput.value).toBe('none')
});
it('it should change the value on changing manufacturer options', () => {
    const wrapper = render(<Filter {...props} />); 
    const manfInput = wrapper.getByTestId('manufacturer-test-id') as HTMLSelectElement
    const event = {
        target: { value: "none" }
      } as React.ChangeEvent<HTMLSelectElement>;
    fireEvent.change(manfInput,event)
    expect(manfInput.value).toBe('none')
});