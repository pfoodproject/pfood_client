import { combineReducers } from 'redux';
import adminInfo from '../pages/admin/Login/reducers';
import partnerInfo from '../pages/partner/Account/reducers';
import product from '../pages/partner/Product/reducers';
import order from '../pages/partner/Order/reducers';
import sourceOfItems from '../pages/partner/Product/components/SourceOfItems/reducers';
import PartnerManager from '../pages/admin/PartnerController/reducers';
import ProductManager from '../pages/admin/ProductController/reducers';
import UserManager from '../pages/admin/UserController/reducers';

const appReducers = combineReducers({
    PartnerManager,
    ProductManager,
    UserManager,
    adminInfo,
    partnerInfo,
    product,
    order,
    sourceOfItems

});

export default appReducers;