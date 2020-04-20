import * as Types from './constants';
var initialState = {
  lst: null,
  msg: '',
  type: '',
  count: 0
};

const product = (state = initialState, action) => {

  switch (action.type) {
    case Types.FETCH_PRODUCT:
      return state
    case Types.FETCH_PRODUCT_SUCCESS:
      {
        state.lst = action.listProduct
        return state
      }
    case Types.FETCH_PRODUCT_FAIL:
      return action.msg
    //
    case Types.ADD_PRODUCT:
      return state
    case Types.ADD_PRODUCT_SUCCESS:
      {
        state.count++;
        state.msg = action.response.msg
        state.type = action.response.type
        state.lst.push(action.response.product[0])
        return state
      }
    case Types.ADD_PRODUCT_FAIL:
      {
        state.count++;
        state.msg = action.response.msg
        state.type = action.response.type
        return state
      }
    //
    case Types.DELETE_PRODUCT:
      return state
    case Types.DELETE_PRODUCT_SUCCESS:
      {
        state.count++;
        state.msg = action.response.msg
        state.type = action.response.type
        state.lst.find((e, i) => {
          if (e.ItemID === action.response.productId) {
            state.lst.splice(i, 1);
          }
        })
        return state
      }
    case Types.DELETE_PRODUCT_FAIL:
      return state
    //
    case Types.UPDATE_PRODUCT:
      return state
    case Types.UPDATE_PRODUCT_SUCCESS:
      {
        state.count++;
        state.msg = action.response.msg
        state.type = action.response.type
        state.lst.find((e, i) => {
          if (e.ItemID === action.response.product.ItemID) {
            state.lst[i] = action.response.product
          }
        })
        return state
      }
    case Types.UPDATE_PRODUCT_FAIL:
      {
        state.count++;
        state.msg = action.response.msg
        state.type = action.response.type
        return state
      }
    //
    case Types.IMPORT_PRODUCT:
      return state
    case Types.IMPORT_PRODUCT_SUCCESS:
      return state
    case Types.IMPORT_PRODUCT_FAIL:
      return state

    default:
      return state
  }
};


export default product;    