import * as Types from './constants';

export const fetchGame = (sort, limit, page) => {
    return {
        type : Types.FETCH_GAME,
        sort, 
        limit, 
        page
    }
}

export const fetchGameSuccess = (games) => {
    return {
        type : Types.FETCH_GAME_SUCCESS,
        games
    }
}

export const fetchGameFail = (msg) => {
    return {
        type : Types.FETCH_GAME_FAIL,
        msg
    }
}
