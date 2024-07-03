import axios from 'axios';

export async function search_album(albumName) {
  try {
    const token = 'BQDRTrRrgkUv2B_p8pBRqXGGj0CZAShDqw5_AozFFlmeIXkI4h9YO3YARVDYaSF7FlaSL8UO6SMV9xIZcaXUA4BuIFd04c_yMDI4cuauPaorKZHZ5Dc';
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
