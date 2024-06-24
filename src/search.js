

import { getToken } from './token_gen.js'
import axios from 'axios';

export async function search_album(albumName) {
  try {
    const token = await getToken();
    // header
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };

    // endport
    const response = await axios.get(`https://api.spotify.com/v1/search?q=album:${encodeURIComponent(albumName)}&type=album`, { headers });
    const data = response.data;

    // for now hardcode so it only displays first album
    const firstAlbum = data.albums.items[0];
    if (firstAlbum) {
     
      if (firstAlbum.images.length > 0) {
        return firstAlbum.images[0].url; // return first image
      } else {
        return null; 
      }
    } else {
      return null; 
    }
  } catch (error) {

    console.error('Error:', error.response ? `${error.response.status} - ${error.response.statusText}` : error.message);
    return null; 
  }
}


