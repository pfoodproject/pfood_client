import { put, call, takeLatest } from 'redux-saga/effects'
import callApiUnAuth from '../../../utils/apis/apiUnAuth';
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

function* fetchProduct(action) {
    try {
        const { partnerId } = action
        let product = yield call(fetchProductApi, partnerId)   
        // if (msg.success === true) {            
        yield put(actions.fetchProductSuccess(product));
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
        yield call(addProductApi, product)

        // if (msg.success === true) {            
        yield put(actions.addProductSuccess(product));
        // } else {
        // yield put(actions.fetchPartnerFail(partner));
        // }

    } catch (error) {
        yield put(actions.addProductFail(error));
    }
}


function* watchSaga() {
    yield takeLatest(Types.FETCH_PRODUCT, fetchProduct);
    yield takeLatest(Types.ADD_PRODUCT, addProduct);
}

export default watchSaga;