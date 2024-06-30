import axios from 'axios';

export async function getAlbumTracks(albumId) {
  try {
    const token = 'token';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };

    const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}/tracks`, { headers });
    const data = response.data;

    const tracks = data.items.map(track => ({
      id: track.id,
      name: track.name,
      artists: track.artists.map(artist => ({
        name: artist.name,
        id: artist.id 
      })),
      features: track.artists.length > 1 ? track.artists.slice(1).map(artist => ({
        name: artist.name,
        id: artist.id 
      })) : [],
      duration: track.duration_ms,
      previewUrl: track.preview_url,
      trackNumber: track.track_number
    }));
    console.log(tracks)
    return tracks;

  } catch (error) {
    console.error('Error fetching album tracks:', error.message);
    return [];
  }
}
