import * as Types from './constants';
var initialState = {
  lst: null,
  msg: '',
  type:''
};

const product = (state = initialState, action) => {

  switch (action.type) {

    case Types.FETCH_SOURCEOFITEMS:
      return state
    case Types.FETCH_SOURCEOFITEMS_SUCCESS:
      {
        state.msg = ''
        state.type = ''
        state.lst = action.items   
        return state
      }
      
    case Types.FETCH_SOURCEOFITEMS_FAIL:
      return state

    case Types.ADD_SOURCEOFITEMS:
      return state
    case Types.ADD_SOURCEOFITEMS_SUCCESS:
      {
        state.msg = action.response.msg
        state.type = action.response.type
        return state
      }
    case Types.ADD_SOURCEOFITEMS_FAIL:
      return state

    default:
      state.msg=''
      return state
  }
};


export default product;    