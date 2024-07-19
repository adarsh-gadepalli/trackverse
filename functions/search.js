import axios from 'axios';

export async function search_album(albumName) {
  try {
    const token = 'BQClD_k_mEFw7yFW_MY7gJt07zYvDP5AEs_eSDcAfw1DpxWDJ2tRRgE7_LM1_B1WkfsD8oQKPiSFPDy90_XZQ2UP0kvErvglLlWn397nFe6tMON3D9Q';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };

    const response = await axios.get(`https://api.spotify.com/v1/search?q=album:${encodeURIComponent(albumName)}&type=album`, { headers });
    const data = response.data;

    const albums = data.albums.items.slice(0, 5).map(album => {
      const imageUrl = album.images.length > 0 ? album.images[0].url : null;
      console.log(album.id)
      return {
        id: album.id,
        imageUrl: imageUrl,
        name: album.name,
        artist: album.artists[0].name
      };
    });

    return albums.length > 0 ? albums : null;

  } catch (error) {
    console.error('Error:', error.response ? `${error.response.status} - ${error.response.statusText}` : error.message);
    return null; 
  }
}
