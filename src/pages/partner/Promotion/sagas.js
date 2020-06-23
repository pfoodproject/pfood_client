import { put, call, takeLatest } from 'redux-saga/effects'
import callApiUnAuth from '../../../utils/apis/apiUnAuth';
import * as actions from './actions'
import * as Types from './constants'

function fetchPromotionApi(partnerId) {
    return callApiUnAuth(`partner/promotion/${partnerId}`, 'GET', [])
        .then(res => res)
        .catch(error => error.response.data);
}


function updatePromotionApi(promotionid, status) {
    return callApiUnAuth(`partner/promotion`, 'PUT', {promotionid: promotionid, status:status})
        .then(res => res)
        .catch(error => error.response.data);
}

function* fetchPromotion(action) {
    try {
        const { partnerId } = action
        let promotion = yield call(fetchPromotionApi, partnerId)           
        // if (msg.success === true) {            
        yield put(actions.fetchPromotionSuccess(promotion.data));
        // } else {
        // yield put(actions.fetchPartnerFail(partner));
        // }

    } catch (error) {
        yield put(actions.fetchPromotionFail(error));
    }
}


function* updatePromotion(action) {
    try {
        const { promotionid, status } = action
        
        let rsEdit=  yield call(updatePromotionApi, promotionid, status)
        
        if (rsEdit.data.type === 'success') {     
        yield put(actions.updatePromotionSuccess(rsEdit.data));
        } else {
        yield put(actions.updatePromotionFail(rsEdit.data));
        }

    } catch (error) {
        yield put(actions.updatePromotionFail(error));
    }
}


function* watchSaga() {
    yield takeLatest(Types.FETCH_PROMOTION, fetchPromotion);
    yield takeLatest(Types.UPDATE_PROMOTION, updatePromotion);
}

export default watchSaga;