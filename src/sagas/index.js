import AdminSaga from '../pages/admin/Login/sagas';
import PartnerSaga from '../pages/partner/Account/sagas';
import ProductSaga from '../pages/partner/Product/sagas';
import OrderSaga from '../pages/partner/Order/sagas';
import sourceOfItemsSaga from '../pages/partner/Product/components/SourceOfItems/sagas';
import { fork } from 'redux-saga/effects'


export default function* IndexSaga () {  
  yield fork(AdminSaga);
  yield fork(PartnerSaga);
  yield fork(ProductSaga);
  yield fork(OrderSaga);
  yield fork(sourceOfItemsSaga);
}