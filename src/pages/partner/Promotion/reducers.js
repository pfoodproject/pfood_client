import * as Types from './constants';
var initialState = {
  lst: [],
  msg: '',
  type: '',
  count: 0
};

const promotion = (state = initialState, action) => {

  switch (action.type) {
    case Types.FETCH_PROMOTION:
      return state
    case Types.FETCH_PROMOTION_SUCCESS:
      {
        state.lst = action.listPromotion
        return state
      }
    case Types.FETCH_PROMOTION_FAIL:
      return action.msg
    //
    case Types.UPDATE_PROMOTION:
      return state
    case Types.UPDATE_PROMOTION_SUCCESS:
      {
        state.count++;
        state.msg = action.response.msg
        state.type = action.response.type
        // eslint-disable-next-line
        state.lst.find((e, i) => {
          if (e.promotionid === action.response.promotion[0].promotionid) {
            state.lst[i] = action.response.promotion[0]
          }
        })
        return state
      }
    case Types.UPDATE_PROMOTION_FAIL:
      {
        state.count++;
        state.msg = action.response.msg
        state.type = action.response.type
        return state
      }
    //
    case Types.ADD_PROMOTION:
      return state
    case Types.ADD_PROMOTION_SUCCESS:
      {
        state.count++;
        state.msg = action.response.msg
        state.type = action.response.type
        state.lst.unshift(action.response.promotion[0])
        return state
      }
    case Types.ADD_PROMOTION_FAIL:
      {
        state.count++;
        state.msg = action.response.msg
        state.type = action.response.type
        return state
      }
    default:
      return state
  }
};


export default promotion;    