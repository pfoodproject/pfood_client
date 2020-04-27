import { call, takeLatest } from 'redux-saga/effects'
import * as Types from './constants'
import callApiUnauthWithBody from "../../../utils/apis/apiUnAuth"

function* wathNoticationAction(){
    yield takeLatest (Types.GET_DATA_PROCESS, getDataSaga)
}

function*  getDataSaga({payload}){
    var resp = yield call(callApiUnauthWithBody,"admin/countProcessProduct","GET",{});

    yield call(payload.after,resp.data)

}

export default wathNoticationAction;