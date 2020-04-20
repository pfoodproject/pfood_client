import * as Types from './constants';

export const getData = (after) => {
    return {
        type : Types.GET_DATA_PROCESS,
        payload: {after}
    }
}


