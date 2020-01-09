import { combineReducers } from 'redux';
import users from '../pages/public/Login/reducers';
import homeGame from '../pages/public/HomePage/reducers';
import detailGame from '../pages/public/DetailPage/reducers';
import categoryGame from '../pages/public/CategoryPage/reducers';

const appReducers = combineReducers({
    users,
    homeGame,
    detailGame,
    categoryGame
});

export default appReducers;