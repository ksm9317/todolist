import axios from 'axios';

// const apiUrl =
//   'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/';
const backendPortNumber = '8000';
const apiUrl =
  'http://' + window.location.hostname + ':' + backendPortNumber + '/';

async function get(endpoint) {
  console.log(`%cGET 요청 ${apiUrl + endpoint}`, 'color: #a25cd1;');

  return axios.get(apiUrl + endpoint, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
  });
}

async function post(endpoint, data) {
  const bodyData = JSON.stringify(data);
  console.log(`%cPOST 요청: ${apiUrl + endpoint}`, 'color: #296aba;');
  console.log(`%cPOST 요청 데이터: ${bodyData}`, 'color: #296aba;');

  return axios.post(apiUrl + endpoint, bodyData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
  });
}

async function put(endpoint, data) {
  const bodyData = JSON.stringify(data);
  console.log(`%cPUT 요청: ${apiUrl + endpoint}`, 'color: #059c4b;');
  console.log(`%cPUT 요청 데이터: ${bodyData}`, 'color: #059c4b;');

  return axios.put(apiUrl + endpoint, bodyData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
  });
}

async function del(endpoint, params = '') {
  console.log(`DELETE 요청 ${apiUrl + endpoint + '/' + params}`);
  return axios.delete(apiUrl + endpoint + '/' + params, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
  });
}

export { get, post, put, del };
