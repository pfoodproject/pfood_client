import LoginSaga from '../pages/public/Login/sagas';
import HomeSaga from '../pages/public/HomePage/sagas';
import DetailSaga from '../pages/public/DetailPage/sagas';
import CategorySaga from '../pages/public/CategoryPage/sagas';
import { fork } from 'redux-saga/effects'


export default function* IndexSaga () {  
  yield fork(LoginSaga);
  yield fork(HomeSaga);
  yield fork(DetailSaga);
  yield fork(CategorySaga);
}