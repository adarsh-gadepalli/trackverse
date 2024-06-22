const getToken = require('./token_gen');


 getToken()
  .then(token => {
    console.log('Access token:', token);
    // Use the token for further operations
  })
  .catch(error => {
    console.error('Error getting token:', error);
  });

  
