/* 
  Export the addNotes function to make api calls to
  post all the data from a note needed to insert a new note
  use: addNotes(note, this.onSuccess, this.onError)

  note: {
    note_text: 'text field',
    participant_id: 1
  }

  this.onSuccess && this.onError: Function

*/
import axios from 'axios';

// import { API_ENDPOINT } from 'get_uri';
import { API_BASE_URL } from '../config/url_config';

import { UserAuth } from '../utilities/auth';

const addNotes = ({ userId: participant_id, note_text }, successFn, errorFn) => {
  //  create the token to send as header
  const authToken = UserAuth.getAuthToken();
  let config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    }
  }

  return axios
    .post(`${API_BASE_URL}/note/${participant_id}`, { participant_id, note_text }, config, {
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

export default addNotes;
