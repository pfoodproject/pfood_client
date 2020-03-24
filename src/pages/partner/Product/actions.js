import * as Types from './constants';

// fetch product
export const fetchProduct = (partnerId) => {
    return {
        type : Types.FETCH_PRODUCT,
        partnerId
    }
}

export const fetchProductSuccess = (listProduct) => {
    return {
        type : Types.FETCH_PRODUCT_SUCCESS,
        listProduct
    }
}

export const fetchProductFail = (msg) => {
    return {
        type : Types.FETCH_PRODUCT_FAIL,
        msg
    }
}

// Add Product
export const addProduct = (product) => {
    return {
        type : Types.ADD_PRODUCT,
        product
    }
}

export const addProductSuccess = (response) => {
    return {
        type : Types.ADD_PRODUCT_SUCCESS,
        response
    }
}

export const addProductFail = (response) => {
    return {
        type : Types.ADD_PRODUCT_FAIL,
        response
    }
}

// Delete Product
export const deleteProduct = (productId) => {
    return {
        type : Types.DELETE_PRODUCT,
        productId
    }
}

export const deleteProductSuccess = (response) => {
    return {
        type : Types.DELETE_PRODUCT_SUCCESS,
        response
    }
}

export const deleteProductFail = (response) => {
    return {
        type : Types.ADD_PRODUCT_FAIL,
        response
    }
}

// Update Product
export const updateProduct = (product) => {
    return {
        type : Types.UPDATE_PRODUCT,
        product
    }
}

export const updateProductSuccess = (msg) => {
    return {
        type : Types.UPDATE_PRODUCT_SUCCESS,
        msg
    }
}

export const updateProductFail = (msg) => {
    return {
        type : Types.UPDATE_PRODUCT_FAIL,
        msg
    }
}