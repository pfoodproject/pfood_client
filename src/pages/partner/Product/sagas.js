import { put, call, takeLatest } from 'redux-saga/effects'
import callApiUnAuth from '../../../utils/apis/apiUnAuth';
import {imagesUpload, importProduct} from '../../../utils/apis/apiAuth';
import * as actions from './actions'
import * as Types from './constants'

function fetchProductApi(partnerId) {
    return callApiUnAuth(`partner/product/${partnerId}`, 'GET', [])
        .then(res => res)
        .catch(error => error.response.data);
}


function addProductApi(product) {
    return callApiUnAuth(`partner/product`, 'POST', product)
        .then(res => res)
        .catch(error => error.response.data);
}

function uploadImagesApi(img) {
    return imagesUpload(img)
        .then(res => res)
        .catch(error => error.response.data);
}


function deleteProductApi(productId) {
    return callApiUnAuth(`partner/product/${productId}`, 'DELETE', [])
        .then(res => res)
        .catch(error => error.response.data);
}

function updateProductApi(product) {
    return callApiUnAuth(`partner/product`, 'PUT', product)
        .then(res => res)
        .catch(error => error.response.data);
}

function importProductApi(obj) {
    console.log(obj);
    
    return importProduct(`partner/import`, 'POST', obj)
        .then(res => res)
        .catch(error => error.response.data);
}

function* fetchProduct(action) {
    try {
        const { partnerId } = action
        let product = yield call(fetchProductApi, partnerId)   
        console.log(product);
        
        // if (msg.success === true) {            
        yield put(actions.fetchProductSuccess(product.data));
        // } else {
        // yield put(actions.fetchPartnerFail(partner));
        // }

    } catch (error) {
        yield put(actions.fetchProductFail(error));
    }
}

function* addProduct(action) {
    try {
        const { product } = action
        
        if(typeof product.img === 'object'){
            let rs = yield call(uploadImagesApi, product.img[0])
            console.log(rs.data.data.link);
            
            product.img = rs.data.data.link
        }
            
        let rsAdd= yield call(addProductApi, product)
         if (rsAdd.data.type === 'success') {                        
        yield put(actions.addProductSuccess(rsAdd.data));
        } else {
        yield put(actions.addProductFail(rsAdd.data));
        }

    } catch (error) {
        yield put(actions.addProductFail(error));
    }
}

function* updateProduct(action) {
    try {
        const { product } = action
        if(typeof product.ItemImage === 'object'){
            let rs = yield call(uploadImagesApi, product.ItemImage[0])
            product.ItemImage = rs.data.data.link
            console.log(rs.data.data.link);
        }
        
        let rsEdit=  yield call(updateProductApi, product)
        console.log(rsEdit);
        
        if (rsEdit.data.type === 'success') {     
            rsEdit.data.product = product;                   
        yield put(actions.updateProductSuccess(rsEdit.data));
        } else {
        yield put(actions.updateProductFail(rsEdit.data));
        }

    } catch (error) {
        yield put(actions.updateProductFail(error));
    }
}

function* deleteProduct(action) {
    try {
        const { productId } = action
       let rs =  yield call(deleteProductApi, productId)        
         if (rs.data.type === 'success') {            
        yield put(actions.deleteProductSuccess(rs.data));
         } else {
         yield put(actions.deleteProductFail(rs.data));
         }

    } catch (error) {
        yield put(actions.deleteProductFail(error));
    }
}

function* importProductFunc(action) {
    try {
        const { obj } = action
        
            
        let rs= yield call(importProductApi, obj)
        //  if (rsAdd.data.type === 'success') {                        
        yield put(actions.importProductSuccess(rs));
        // } else {
        // yield put(actions.addProductFail(rsAdd.data));
        // }

    } catch (error) {
        yield put(actions.importProductFail(error));
    }
}


function* watchSaga() {
    yield takeLatest(Types.FETCH_PRODUCT, fetchProduct);
    yield takeLatest(Types.ADD_PRODUCT, addProduct);
    yield takeLatest(Types.DELETE_PRODUCT, deleteProduct);
    yield takeLatest(Types.UPDATE_PRODUCT, updateProduct);
    yield takeLatest(Types.IMPORT_PRODUCT, importProductFunc);
}

export default watchSaga;