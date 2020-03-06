import * as Types from './constants';

var initialState = null;

const product = (state = initialState, action) => {

  switch (action.type) {
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


export default product;    