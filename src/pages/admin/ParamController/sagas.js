import { put, call, takeLatest } from 'redux-saga/effects'

import * as actions from './actions'
import * as Types from './constants'
import callApiUnauthWithBody from "../../../utils/apis/apiUnAuth"

function* wathUserAction(){
    yield takeLatest (Types.GET_DATA_PARAM, getDataSaga)
    yield takeLatest (Types.UPDATE_DATA_PARAM, changeStatus)
}

function*  getDataSaga({payload}){
    var resp = yield call(callApiUnauthWithBody,"admin/parameters","GET",{});

    yield call(payload.after,resp.data)

}

function*  changeStatus({payload}){
    var resp = yield call(callApiUnauthWithBody,"admin/parameters/update","POST",payload.value);
    yield call(payload.after,resp.data)
}

export default wathUserAction;