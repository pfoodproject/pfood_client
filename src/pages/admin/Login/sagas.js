import { put, call, takeLatest } from 'redux-saga/effects'
import callApiUnAuth from '../../../utils/apis/apiUnAuth';
import * as actions from './actions'
import * as Types from './constants'

export function checkLoginApi(user) {
    
    return callApiUnAuth(`admin/signin`, 'POST', { user })
        .then(res => res)
        .catch(error => error.response.data);
}

export function* login( action ) {
    try {        
        const { user } = action
        const token = yield call(checkLoginApi,user)        
        yield put(actions.signInSuccess({ token: token.data }));

    } catch (error) {
        yield put(actions.signInFail(error));
    }

}

function* watchCheckLogin() {
    yield takeLatest(Types.ADMIN_SIGNIN, login)
  }

export default watchCheckLogin;