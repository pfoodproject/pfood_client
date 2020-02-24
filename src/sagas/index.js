import LoginSaga from '../pages/admin/Login/sagas';
import ManagerSaga from '../pages/admin/PartnerController/sagas';
import { fork } from 'redux-saga/effects'


export default function* IndexSaga () {  
  yield fork(LoginSaga);
  yield fork(ManagerSaga);
}