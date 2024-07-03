import axios from 'axios';
import { config } from '../globals/load.js';

export async function getToken() {

  try {
    const credentials = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`;
    const base64Credentials = Buffer.from(credentials).toString('base64');  
    const authHeader = `Basic ${base64Credentials}`;

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

    const response = await axios(authOptions);
    console.log("Response:", response.data);

    if (response.status === 200) {
      return response.data.access_token;
    } else {
      throw new Error(`Failed to get token. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching access token:", error.message);
    throw new Error(`Error fetching access token: ${error.message}`);
  }
}

getToken()
  .then(token => {
    console.log("Access token:", token);
  })
  .catch(error => {
    console.error("Failed to get access token:", error.message);
  });
