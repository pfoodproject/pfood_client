import * as Types from './constants';
var initialState = null;

const users = (state = initialState, action) => {

  switch (action.type) {
    case Types.FETCH_PARTNER:
      return state
    case Types.FETCH_PARTNER_SUCCESS:
      return action.user
    case Types.FETCH_PARTNER_FAIL:
      return action.msg
    // update partner
    case Types.UPDATE_PARTNER:
      {
        return state;
      }
    case Types.UPDATE_PARTNER_SUCCESS:
      {
        console.log(action);

        return state
      }
    case Types.UPDATE_PARTNER_FAIL:
      return action.msg
    // Sign in
    case Types.PARTNER_SIGNIN:
      return state
    case Types.PARTNER_SIGNIN_SUCCESS:
      return action.token
    case Types.PARTNER_SIGNIN_FAIL:
      return action.msg

    default:
      return state
  }
};


export default users;    