import axios from 'axios';

const apiUrl =
  'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/';

async function post(endpoint, data) {
  const bodyData = JSON.stringify(data);

  return axios.post(apiUrl + endpoint, bodyData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
  });
}

export { post };
