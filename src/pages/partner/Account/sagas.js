import { put, call, takeLatest } from 'redux-saga/effects'
import callApiUnAuth from '../../../utils/apis/apiUnAuth';
import {imagesUpload} from '../../../utils/apis/apiAuth';
import * as actions from './actions'
import * as Types from './constants'

function updatePartnerApi(partner) {
    return callApiUnAuth(`partner`, 'PUT', partner)
        .then(res => res)
        .catch(error => error.response.data);
}

function uploadImagesApi(img) {
    return imagesUpload(img)
        .then(res => res)
        .catch(error => error.response.data);
}

function fetchCityApi() {
    return callApiUnAuth(`city`, 'GET', {})
        .then(res => res)
        .catch(error => error.response.data);
}

function fetchPartnerTypeApi() {
    return callApiUnAuth(`partner/partnertype`, 'GET', {})
        .then(res => res)
        .catch(error => error.response.data);
}

function signInApi(user) {
    return callApiUnAuth(`partner/signin`, 'POST', user)
        .then(res => res)
        .catch(error => error.response.data);
}

/////////////////////////////

function* signIn(action) {
    try {
        const { user } = action
        let token = yield call(signInApi, user)
        
        const city = yield call(fetchCityApi)
        const partnertype = yield call(fetchPartnerTypeApi)
        // if (msg.success === true) {            
        yield put(actions.signInSuccess({ token: token.data, city: city, partnertype: partnertype }));
        // } else {
        // yield put(actions.fetchPartnerFail(partner));
        // }

    } catch (error) {
        yield put(actions.signInFail(error));
    }
}

function* uploadImage(action) {
    try {
        const { partner } = action
        
      
            let rs = yield call(uploadImagesApi, partner.file)            
            let link = rs.data.data.link
            delete partner.file;
            partner.PartnerImage = link;
            yield call(updatePartnerApi, partner)
        // if (msg.success === true) {            
        yield put(actions.updateImageSuccess(link));
        // } else {
        // yield put(actions.fetchPartnerFail(partner));
        // }

    } catch (error) {
        yield put(actions.updateImageFail(error));
    }
}


function* putPartner(action) {
    try {
        const { partner } = action
        // const partnerRes = 
        yield call(updatePartnerApi, partner)

        // if (msg.success === true) {            
        yield put(actions.updatePartnerSuccess(partner));
        // } else {
        // yield put(actions.fetchPartnerFail(partner));
        // }

    } catch (error) {
        // yield put(actions.fetchPartnerFail(error));
    }

}

function* watchfetchPartner() {
    yield takeLatest(Types.UPDATE_PARTNER, putPartner);
    yield takeLatest(Types.PARTNER_SIGNIN, signIn);
    yield takeLatest(Types.PARTNER_CHANGE_IMAGE, uploadImage);
}

export default watchfetchPartner;