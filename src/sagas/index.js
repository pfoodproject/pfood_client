import LoginSaga from '../pages/admin/Login/sagas';
import partnerSaga from '../pages/partner/Account/sagas';
import productSaga from '../pages/partner/Product/sagas';
import sourceOfItemsSaga from '../pages/partner/Product/components/SourceOfItems/sagas';
import PartnerSaga from '../pages/admin/PartnerController/sagas';
import ProductSaga from '../pages/admin/ProductController/sagas';
import UserSaga from '../pages/admin/UserController/sagas';

import { fork } from 'redux-saga/effects'


export default function* IndexSaga () {  
  yield fork(LoginSaga);
  yield fork(PartnerSaga);
  yield fork(ProductSaga);

  yield fork(sourceOfItemsSaga);
  yield fork(partnerSaga);
  yield fork(productSaga);
  yield fork(UserSaga);

}