import { put, call, takeLatest } from 'redux-saga/effects'
import callApiUnAuth from '../../../utils/apis/apiUnAuth';
import * as actions from './actions'
import * as Types from './constants'

export function fetchPartnerApi(customerID) {
    return callApiUnAuth(`partner/${customerID}`, 'GET', {})
        .then(res => res)
        .catch(error => error.response.data);
}

export function fetchCityApi() {
    return callApiUnAuth(`city`, 'GET', {})
        .then(res => res)
        .catch(error => error.response.data);
}

export function updatePartnerApi(partner) {
    return callApiUnAuth(`partner`, 'PUT', partner)
        .then(res => res)
        .catch(error => error.response.data);
}

export function* fetchPartner( action ) {
    try {        
        const { id } = action
        const partner = yield call(fetchPartnerApi, id)     
        const city = yield call(fetchCityApi)
        // console.log(partner);
           
        // if (msg.success === true) {            
            yield put(actions.fetchPartnerSuccess({partner: partner, city: city}));
        // } else {
            // yield put(actions.fetchPartnerFail(partner));
        // }

    } catch (error) {
        yield put(actions.fetchPartnerFail(error));
    }

}

export function* putPartner( action ) {
    try {        
        const { partner } = action
        const partnerRes = yield call(updatePartnerApi, partner)     
        const city = yield call(fetchCityApi)
        // console.log(partner);
           console.log(partnerRes);
           
        // if (msg.success === true) {            
            yield put(actions.fetchPartnerSuccess(partnerRes));
        // } else {
            // yield put(actions.fetchPartnerFail(partner));
        // }

    } catch (error) {
        // yield put(actions.fetchPartnerFail(error));
    }

}

function* watchfetchPartner() {
    yield takeLatest(Types.FETCH_PARTNER, fetchPartner)
    yield takeLatest(Types.UPDATE_PARTNER, putPartner)
  }

export default watchfetchPartner;