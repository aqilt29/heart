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
    .get(`${API_BASE_URL}/participants/${userId}/notes`, config, {})

}

export default getNotes;
