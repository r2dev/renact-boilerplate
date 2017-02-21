import { REQUEST_DATA, RECEIVE_DATA } from './actions'

const initialData = {
  loading: false,
  data: null,
}

function rootReducer(state = initialData, action) {
  switch(action.type) {
    case REQUEST_DATA:
      return {
        ...state,
        loading: true
      }
    case RECEIVE_DATA:
      return {
        ...state,
        loading: false,
        data: action.data
      }
    default:
      return state
  }
}

export default rootReducer
