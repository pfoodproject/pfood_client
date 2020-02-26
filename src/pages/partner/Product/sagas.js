import { put, call, takeLatest } from 'redux-saga/effects'
import callApiUnAuth from '../../../utils/apis/apiUnAuth';
import * as actions from './actions'
import * as Types from './constants'

 function addProductApi(product) {
    return callApiUnAuth(`partner/product`, 'POST', product)
        .then(res => res)
        .catch(error => error.response.data);
}



 function* fetchPartner( action ) {
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


function* watchfetchPartner() {
    yield takeLatest(Types.ADD_PRODUCT, fetchPartner);
  }

export default watchfetchPartner;