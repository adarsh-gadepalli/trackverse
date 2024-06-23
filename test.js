document.getElementById('searchForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  const albumName = document.getElementById('albumName').value;
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // Clear previous results

  try {
    const token = await getToken(); // Assume getToken() is already defined elsewhere
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };

    const response = await fetch(`https://api.spotify.com/v1/search?q=album:${encodeURIComponent(albumName)}&type=album`, { headers });
    const data = await response.json();
    const albums = data.albums.items;

    if (albums.length > 0) {
      albums.forEach(album => {
        const albumDiv = document.createElement('div');
        albumDiv.classList.add('album');
        albumDiv.innerHTML = `
          <h3>${album.name}</h3>
          <p>Artist: ${album.artists.map(artist => artist.name).join(', ')}</p>
          <p>Release Date: ${album.release_date}</p>
          <p>Total Tracks: ${album.total_tracks}</p>
        `;
        resultsDiv.appendChild(albumDiv);
      });
    } else {
      resultsDiv.innerHTML = '<p>No albums found.</p>';
    }
  } catch (error) {
    console.error('Error:', error);
    resultsDiv.innerHTML = '<p>There was an error fetching the albums.</p>';
  }
});
