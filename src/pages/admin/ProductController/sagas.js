import { call, takeLatest } from 'redux-saga/effects'

import * as Types from './constants'
import callApiUnauthWithBody from "../../../utils/apis/apiUnAuth"

function* wathProductAction(){
    yield takeLatest (Types.GET_DATA, getDataSaga)
    yield takeLatest (Types.GET_COUNT, getCountSaga)
    yield takeLatest (Types.CHANGE_STATUS, changeStatus)
}

function*  getDataSaga({payload}){
    var resp = yield call(callApiUnauthWithBody,"admin/getProduct","POST",payload.value);
    yield call(payload.after,resp.data)
}

function*  getCountSaga({payload}){
    var resp = yield call(callApiUnauthWithBody,"admin/countProduct","GET",{});
    yield call(payload.after,resp.data)
}

function*  changeStatus({payload}){
    var resp = yield call(callApiUnauthWithBody,"admin/ProductController","POST",payload.value);
    yield call(payload.after,resp.data)
}

export default wathProductAction;