import * as Types from './constants';


export const addProduct = (product) => {
    return {
        type : Types.ADD_PRODUCT,
        product
    }
}

export const addProductSuccess = (product) => {
    return {
        type : Types.ADD_PRODUCT_SUCCESS,
        product
    }
}

export const addProductFail = (msg) => {
    return {
        type : Types.ADD_PRODUCT_FAIL,
        msg
    }
}