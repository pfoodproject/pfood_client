import { combineReducers } from 'redux';
import users from '../pages/admin/Login/reducers';
import partnerInfo from '../pages/partner/Account/reducers';
import product from '../pages/partner/Product/reducers';
import sourceOfItems from '../pages/partner/Product/components/SourceOfItems/reducers';
const appReducers = combineReducers({
    users,
    partnerInfo,
    product,
    sourceOfItems
});

export default appReducers;