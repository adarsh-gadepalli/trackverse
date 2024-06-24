import { search_album } from './search.js'




search_album("If you're reading this its too late")
  .then(imageUrl => {
    if (imageUrl) {
      console.log(`Album Cover Image URL: ${imageUrl}`);
    } else {
      console.log('No album cover image found or album not found.');
    }
  })
  .catch(err => {
    console.error('Error searching for album:', err);
  });
