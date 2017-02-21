import fetch from 'isomorphic-fetch'
export const REQUEST_DATA = 'REQUEST_DATA'

export const RECEIVE_DATA = 'RECEIVE_DATA'

export function requestData() {
  return {type: REQUEST_DATA}
}

export function receiveData(json) {
  return {type: RECEIVE_DATA, data: json}
}

export const fetchDataYesNo = () => {
  return (dispatch) => {
    dispatch(requestData())
    return fetch('https://yesno.wtf/api')
      .then(request => request.json())
      .then(json => dispatch(receiveData(json)))
  }
}
