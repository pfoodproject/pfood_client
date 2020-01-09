import { put, call, takeLatest } from 'redux-saga/effects'
import { callApiUnauthWithHeader } from '../../../utils/apis/apiUnAuth';
import * as actions from './actions'
import * as Types from './constants'

export function fetchGameByType(header) {
    return callApiUnauthWithHeader(``, 'GET', header)
        .then(res => res)
        .catch(error => error.response.data);
}

export function* fetchGame(action) {
    try {
        const { sort, limit, page } = action;
        const gamesByType = yield call(fetchGameByType, { sort: sort, limit: limit, page: page  });
        yield put(actions.fetchGameSuccess({ gamesByType: gamesByType.data }));
    } catch (error) {
        yield put(actions.fetchGameFail(error));
    }
}

function* getGameHomePage() {
    yield takeLatest(Types.FETCH_GAME, fetchGame)
}

export default getGameHomePage;