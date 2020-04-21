import * as Types from './constants';
var initialState = null;

const users = (state = initialState, action) => {
  switch (action.type) {
    case Types.ADMIN_SIGNIN:
      return state
    case Types.ADMIN_SIGNIN_SUCCESS:
      return action.token
    case Types.ADMIN_SIGNIN_FAIL:
      return action.msg
    case Types.MLTS:
      return action.partner
    default:
      return state
  }
};


export default users;    