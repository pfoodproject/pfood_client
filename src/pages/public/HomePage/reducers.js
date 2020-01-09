import * as Types from './constants';
var initialState = null;

const homeGame = (state = initialState, action) => {

    switch (action.type) {
        case Types.FETCH_GAME: 
          return null
        case Types.FETCH_GAME_SUCCESS:                   
          return action.games
        case Types.FETCH_GAME_FAIL:
          return action.msg
        default:
          return state
      }
};


export default homeGame;    