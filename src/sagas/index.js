import LoginSaga from '../pages/admin/Login/sagas';
import PartnerSaga from '../pages/admin/PartnerController/sagas';
import ProductSaga from '../pages/admin/ProductController/sagas';
import UserSaga from '../pages/admin/UserController/sagas';
import { fork } from 'redux-saga/effects'


export default function* IndexSaga () {  
  yield fork(LoginSaga);
  yield fork(PartnerSaga);
  yield fork(ProductSaga);
  yield fork(UserSaga);
}