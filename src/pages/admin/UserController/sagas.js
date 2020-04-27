import { put, call, takeLatest } from 'redux-saga/effects'

import * as actions from './actions'
import * as Types from './constants'
import callApiUnauthWithBody from "../../../utils/apis/apiUnAuth"

function* wathUserAction(){
    yield takeLatest (Types.GET_DATA, getDataSaga)
    yield takeLatest (Types.CHANGE_STATUS, changeStatus)
}

function*  getDataSaga({payload}){
    var resp = yield call(callApiUnauthWithBody,"admin/getUser","POST",payload.value);
    console.log(resp)
    if(resp.statusText === "OK") {
        var resp1 = yield call(callApiUnauthWithBody,"admin/countUser","GET",{});
        yield call(payload.after,resp.data,resp1.data)
        yield put(actions.getDataSuccess(resp.data))
    }
    else{
        yield put(actions.getDataFalse(resp))
    }
}

function*  changeStatus({payload}){
    var resp = yield call(callApiUnauthWithBody,"admin/UserController","POST",payload.value);
    
    if(resp.statusText === "OK") {
        
        yield call(payload.after)
    }
    else{
        yield put(actions.getDataFalse(resp))
    }
}

export default wathUserAction;