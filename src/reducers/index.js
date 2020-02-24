import { combineReducers } from 'redux';
import users from '../pages/admin/Login/reducers';
import PartnerManager from '../pages/admin/PartnerController/reducers';

const appReducers = combineReducers({
    users,
    PartnerManager
});

export default appReducers;