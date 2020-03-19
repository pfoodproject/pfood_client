import { combineReducers } from 'redux';
import users from '../pages/admin/Login/reducers';
import partnerInfo from '../pages/partner/Account/reducers';
import product from '../pages/partner/Product/reducers';
import sourceOfItems from '../pages/partner/Product/components/SourceOfItems/reducers';
import PartnerManager from '../pages/admin/PartnerController/reducers';
import ProductManager from '../pages/admin/ProductController/reducers';
import UserManager from '../pages/admin/UserController/reducers';

const appReducers = combineReducers({
    users,
    PartnerManager,
    ProductManager,
    UserManager,
    partnerInfo,
    product,
    sourceOfItems

});

export default appReducers;