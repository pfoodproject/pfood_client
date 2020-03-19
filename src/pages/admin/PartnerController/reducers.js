import * as Types from './constants';

var initialState = {
  PartnerList: []
};

const homeItems = (state = initialState, action) => {

    switch (action.type) {
      case Types.GET_DATA_SUCCESS:

      return{
        ...state,
        PartnerList: action.payload
      }
      case Types.GET_DATA_FALSE:


        return{
          ...state
        }
      
      default:
          return state
    }
};


export default homeItems;    