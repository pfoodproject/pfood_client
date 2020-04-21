import * as Types from './constants';

export const changeStatus = (value,after) => {
    return {
        type : Types.CHANGE_STATUS,
        payload: {value,after}
    }
}

export const getData = (value,after) => {
    return {
        type : Types.GET_DATA,
        payload: {value,after}
    }
}

export const getCount = (value,after) => {
    return {
        type : Types.GET_COUNT,
        payload: {value,after}
    }
}

export const getDataSuccess = (data) => {
    return {
        type : Types.GET_DATA_SUCCESS,
        payload: data 
    }
}

export const getDataFalse = (error) => {
    return {
        type : Types.GET_DATA_FALSE,
        payload: error
    }
}