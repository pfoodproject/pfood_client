import * as Types from './constants';

var initialState = {
  UserList: []
};

const UserItems = (state = initialState, action) => {

    switch (action.type) {
      case Types.GET_DATA_SUCCESS:

      return{
        ...state,
        UserList: action.payload
      }
      case Types.GET_DATA_FALSE:


        return{
          ...state
        }
      
      default:
          return state
    }
};


export default UserItems;    