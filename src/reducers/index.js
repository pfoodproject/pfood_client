import { combineReducers } from 'redux';
import users from '../pages/admin/Login/reducers';
import PartnerManager from '../pages/admin/PartnerController/reducers';
import ProductManager from '../pages/admin/ProductController/reducers';
import UserManager from '../pages/admin/UserController/reducers';
import ParamManager from '../pages/admin/ParamController/reducers';

const appReducers = combineReducers({
    users,
    PartnerManager,
    ProductManager,
    UserManager,
    ParamManager
});

export default appReducers;