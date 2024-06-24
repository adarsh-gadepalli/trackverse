import axios from 'axios';
import { config } from 'dotenv';
config();
const client_id  = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

export function getToken() {

  return new Promise((resolve, reject) => {
    const authHeader = 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64');

    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      method: 'post',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {
        grant_type: 'client_credentials'
      }
    };

    axios(authOptions)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data.access_token);
        } else {
          reject(`Failed to get token. Status code: ${response.status}`);
        }
      })
      .catch(error => {
        reject(`Error fetching access token: ${error.message}`);
      });
  });
};

