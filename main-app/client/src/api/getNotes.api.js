/* 
  Export the getNotes function to make api calls to
  get an array of notes for client
  use: getNotes(userId, this.onSuccess, this.onError)
  userId: Number
  this.onSuccess && this.onError: Function

*/
import axios from 'axios';

// import { API_ENDPOINT } from 'get_uri';
import { API_BASE_URL } from '../config/url_config';

import { UserAuth } from '../utilities/auth';

const getNotes = (userId, successFn, errorFn) => {
  //  create the token to send as header
  const authToken = UserAuth.getAuthToken();
  let config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    }
  }

  return axios
    .get(`${API_BASE_URL}/notes/${userId}`, config, {
      timeout: 3000,
    })
    .then(res => {
      let { data } = res;
      successFn(data);
      return res;
    })
    .catch(err => {
      let { message } = err;
      if (err.code === 'ECONNABORTED') {
        message = 'The notes request took too long - please try again later.';
      }
      errorFn(message);
      return err;      
    })

}

export default getNotes;
