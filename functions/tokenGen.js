import axios from 'axios';


export async function getToken() {
  try {
    const credentials = `${'8459e5c4329341d0a309fac1cfa1b0be'}:${'961f7a90dcc645b3a0e16c171fb3706c'}`;
    const base64Credentials = btoa(credentials); 

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
console.log(getToken())
