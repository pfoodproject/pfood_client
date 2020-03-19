import * as Types from './constants';

var initialState = {
  ProductList: []
};

const ProductItems = (state = initialState, action) => {

    switch (action.type) {
      case Types.GET_DATA_SUCCESS:

      return{
        ...state,
        ProductList: action.payload
      }
      case Types.GET_DATA_FALSE:


        return{
          ...state
        }
      
      default:
          return state
    }
};


export default ProductItems;    