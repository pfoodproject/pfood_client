import { put, call, takeLatest } from 'redux-saga/effects'
import callApiUnAuth from '../../../utils/apis/apiUnAuth';
import * as actions from './actions'
import * as Types from './constants'

function fetchPromotionApi(partnerId) {
    return callApiUnAuth(`partner/promotion/${partnerId}`, 'GET', [])
        .then(res => res)
        .catch(error => error.response.data);
}


function updatePromotionApi(promotion) {
    return callApiUnAuth(`partner/promotion`, 'PUT', promotion)
        .then(res => res)
        .catch(error => error.response.data);
}

function addPromotionApi(promotion) {
    return callApiUnAuth(`partner/promotion`, 'POST', promotion)
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
        const { promotion } = action
        
        
        let rsEdit=  yield call(updatePromotionApi, promotion)
        
        if (rsEdit.data.type === 'success') {     
        yield put(actions.updatePromotionSuccess(rsEdit.data));
        } else {
        yield put(actions.updatePromotionFail(rsEdit.data));
        }

    } catch (error) {
        yield put(actions.updatePromotionFail(error));
    }
}

function* addPromotion(action) {
    try {
        const { promotion } = action
        
        
        let rsAdd=  yield call(addPromotionApi, promotion)
        
        if (rsAdd.data.type === 'success') {     
        yield put(actions.addPromotionSuccess(rsAdd.data));
        } else {
        yield put(actions.addPromotionFail(rsAdd.data));
        }

    } catch (error) {
        yield put(actions.addPromotionFail(error));
    }
}


function* watchSaga() {
    yield takeLatest(Types.FETCH_PROMOTION, fetchPromotion);
    yield takeLatest(Types.UPDATE_PROMOTION, updatePromotion);
    yield takeLatest(Types.ADD_PROMOTION, addPromotion);
}

export default watchSaga;