import { searchService } from './services';

export function searchAction(keySearch){
  return dispatch => {
    searchService(keySearch).then(
      data => {
        console.log('data action: ', data);
        dispatch(success(data));
      },
      error => {
        console.log('error action: ', error);
        dispatch(failure(error))
      }
    )
  };
  function success(data){
    return { type: 'SEARCH_SUCCESS', data };
  }
  function failure(error){
    return { type: 'ERROR', error };
  }
}