import { combineReducers } from 'redux';
import adminInfo from '../pages/admin/Login/reducers';
import partnerInfo from '../pages/partner/Account/reducers';
import product from '../pages/partner/Product/reducers';
import order from '../pages/partner/Order/reducers';
import sourceOfItems from '../pages/partner/Product/components/SourceOfItems/reducers';
const appReducers = combineReducers({
    adminInfo,
    partnerInfo,
    product,
    order,
    sourceOfItems
});

export default appReducers;