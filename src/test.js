const getToken = require('./token_gen');


 getToken()
  .then(token => {
    console.log('Access token:', token);
  })
  .catch(error => {
    console.error('Error getting token:', error);
  });

  
