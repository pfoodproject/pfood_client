import { combineReducers } from 'redux';
import users from '../pages/admin/Login/reducers';
import partnerInfo from '../pages/partner/Account/reducers';

const appReducers = combineReducers({
    users,
    partnerInfo
});

export default appReducers;