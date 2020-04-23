import partnerSaga from '../pages/partner/Account/sagas';
import productSaga from '../pages/partner/Product/sagas';
import AdminSaga from '../pages/admin/Login/sagas';
import OrderSaga from '../pages/partner/Order/sagas';
import sourceOfItemsSaga from '../pages/partner/Product/components/SourceOfItems/sagas';
import PartnerSaga from '../pages/admin/PartnerController/sagas';
import ProductSaga from '../pages/admin/ProductController/sagas';
import UserSaga from '../pages/admin/UserController/sagas';
import ParamSaga from '../pages/admin/ParamController/sagas';
import NoticationSaga from '../pages/admin/Notication/sagas';
import { fork } from 'redux-saga/effects'


export default function* IndexSaga () {  
  yield fork(AdminSaga);
  yield fork(PartnerSaga);
  yield fork(ProductSaga);
  yield fork(OrderSaga);
  yield fork(sourceOfItemsSaga);
  yield fork(partnerSaga);
  yield fork(productSaga);
  yield fork(UserSaga);
  yield fork(ParamSaga);
  yield fork(NoticationSaga);

}