import { put, call, takeLatest } from 'redux-saga/effects'
import callApiUnAuth from '../../../utils/apis/apiUnAuth';
import * as actions from './actions'
import * as Types from './constants'

export function fetchPartnerApi(customerID) {
    return callApiUnAuth(`partner/${customerID}`, 'GET', {})
        .then(res => res)
        .catch(error => error.response.data);
}

export function* fetchPartner( action ) {
    try {        
        const { id } = action
        const msg = yield call(fetchPartnerApi, id)        
        if (msg.success === true) {            
            yield put(actions.fetchPartnerSuccess(msg));
        } else {
            yield put(actions.fetchPartnerFail(msg));
        }

    } catch (error) {
        yield put(actions.fetchPartnerFail(error));
    }

}

function* watchfetchPartner() {
    yield takeLatest(Types.FETCH_PARTNER, fetchPartner)
  }

export default watchfetchPartner;