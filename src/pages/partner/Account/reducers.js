import * as Types from './constants';
var initialState = null;

const users = (state = initialState, action) => {

  switch (action.type) {
    // update partner
    case Types.UPDATE_PARTNER:
        return state;
    case Types.UPDATE_PARTNER_SUCCESS:
        return state
    case Types.UPDATE_PARTNER_FAIL:
      return action.msg
    // Sign in
    case Types.PARTNER_SIGNIN:
      return state
    case Types.PARTNER_SIGNIN_SUCCESS:
      return action.token
    case Types.PARTNER_SIGNIN_FAIL:
      return action.msg
    //
    case Types.MLTS:
      return action.partner
    default:
      return state
  }
};


export default users;    