import axios from 'axios';

export const fetchCars=async (params:{})=>{
    const response = await axios({
        method: 'GET',
        url:'https://auto1-mock-server.herokuapp.com/api/cars',
        headers: {
            'Content-Type': 'application/json'
        },
        params: {...params}
    });
    return response.data
}

export const fetchColors=async (params:{})=>{
    const response = await axios({
        method: 'GET',
        url:'https://auto1-mock-server.herokuapp.com/api/colors',
        headers: {
            'Content-Type': 'application/json'
        },
        params: {...params}
    });
    return response.data
}

export const fetchManufacturers=async (params:{})=>{
    const response = await axios({
        method: 'GET',
        url:'https://auto1-mock-server.herokuapp.com/api/manufacturers',
        headers: {
            'Content-Type': 'application/json'
        },
        params: {...params}
    });
    return response.data
}

export const fetchCarDetails=async (stockNumber:any,params:{})=>{
    const response = await axios({
        method: 'GET',
        url:`https://auto1-mock-server.herokuapp.com/api/cars/${stockNumber}`,
        headers: {
            'Content-Type': 'application/json'
        },
        params: {...params}
    });
    return response.data
}

export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export const getProp = (obj: any, prop = '', def = '') => {
    if (!obj) {
        return '';
    }
    if (!prop) {
        return obj;
    }
    return !obj[prop] ? def : obj[prop];
}
