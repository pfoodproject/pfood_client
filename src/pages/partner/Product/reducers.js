import * as Types from './constants';
var initialState = null;

const product = (state = initialState, action) => {

    switch (action.type) {
        case Types.ADD_PRODUCT:
          return state
        case Types.ADD_PRODUCT_SUCCESS:            
          return action.product
        case Types.ADD_PRODUCT_FAIL:
          return action.msg
        default:
          return state
      }
};


export default product;    