export function searchService(keySearch) {
  console.log('keySearch service: ', keySearch);
  const requestOptions = {
    method: 'GET'
  };
  return fetch("https://listing-stg.teko.vn/api/search/?channel=pv_online&visitorId=c8kjs98922fsd&q=" + keySearch, requestOptions)
  .then(response => {
    console.log('response service: ', response);
    if (!response.ok) {
      return Promise.reject(response.statusText)
    }
    return response.json();
  })
}