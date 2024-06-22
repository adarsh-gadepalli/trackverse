
const axios = require('axios');

const getToken = require('./lookup');

// Define the endpoint URL
const url = 'https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=album';

// Define the headers including the Authorization token
const headers = {
  'Authorization': getToken()   // Replace with your actual token
};

// Perform the GET request
axios.get(url, { headers })
  .then(response => {
    // Print the JSON response
    console.log(response.data);
  })
  .catch(error => {
    // Print the error code and message
    console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
  });
