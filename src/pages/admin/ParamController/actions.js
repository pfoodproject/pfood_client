import * as Types from './constants';

export const changeStatus = (value,after) => {
    return {
        type : Types.UPDATE_DATA_PARAM,
        payload: {value,after}
    }
}

export const getData = (after) => {
    return {
        type : Types.GET_DATA_PARAM,
        payload: {after}
    }
}

