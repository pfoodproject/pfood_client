import LoginSaga from '../pages/admin/Login/sagas';
import PartnerSaga from '../pages/partner/Account/sagas';
import PartnerTokenSaga from '../pages/partner/SignIn/sagas';
import ProductSaga from '../pages/partner/Product/sagas';
import sourceOfItemsSaga from '../pages/partner/Product/components/SourceOfItems/sagas';
import { fork } from 'redux-saga/effects'


export default function* IndexSaga () {  
  yield fork(LoginSaga);
  yield fork(PartnerSaga);
  yield fork(PartnerTokenSaga);
  yield fork(ProductSaga);
  yield fork(sourceOfItemsSaga);
}