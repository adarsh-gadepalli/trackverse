import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { search_album } from '../functions/search';
import { getAlbumTracks } from '../functions/getAlbumTracks'; 

export default function Home() {
  const [albumName, setAlbumName] = useState('');
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [albumTracks, setAlbumTracks] = useState([]);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setAlbumName(value);

    if (value.length > 2) {
      try {
        const albumResults = await search_album(value);
        setAlbums(albumResults);
        setIsDropdownVisible(true);
      } catch (error) {
        console.error('Error fetching albums:', error.message);
        setAlbums([]); 
      }
    } else {
      setAlbums([]);
      setIsDropdownVisible(false);
    }
  };

  const handleSelectAlbum = async (album) => {
    setSelectedAlbum(album);
    setIsDropdownVisible(false);
    setAlbumName(album.name);

    try {
      const tracks = await getAlbumTracks(album.id);
      setAlbumTracks(tracks);
    } catch (error) {
      console.error('Error fetching album tracks:', error.message);
      setAlbumTracks([]);
    }
  };

  return (
    <div style={styles.container}>
      <Head>
        <title>Home</title>
      </Head>

      <main style={styles.main}>
        <h1 style={styles.title}>Search for an Album</h1>
        <form onSubmit={(e) => e.preventDefault()} style={styles.form}>
          <input
            type="text"
            value={albumName}
            onChange={handleInputChange}
            placeholder="Enter album name"
            onFocus={() => setIsDropdownVisible(true)}
            style={styles.input}
            ref={searchInputRef} 
          />
        </form>

        {isDropdownVisible && (
          <ul style={styles.dropdown}>
            {albums && albums.length > 0 ? (
              albums.map((album, index) => (
                <li
                  key={album.id}
                  onClick={() => handleSelectAlbum(album)}
                  style={{ ...styles.dropdownItem, backgroundColor: index % 2 ? '#333' : '#444' }}
                >
                  <img src={album.imageUrl} alt="Album Cover" style={styles.albumImage} />
                  <div>
                    <div style={styles.albumName}>{album.name}</div>
                    <div style={styles.artistName}>by {album.artist}</div>
                  </div>
                </li>
              ))
            ) : (
              <li style={styles.noAlbums}>No albums found</li>
            )}
          </ul>
        )}

        {selectedAlbum && (
          <div style={styles.selectedAlbum}>
            <h2 style={styles.selectedAlbumName}>{selectedAlbum.name}</h2>
            <img src={selectedAlbum.imageUrl} alt="Album Cover" style={styles.selectedAlbumImage} />
            <p style={styles.selectedArtistName}>by {selectedAlbum.artist}</p>

            <h3 style={styles.tracksHeader}>Tracks</h3>
            <ul style={styles.tracksList}>
              {albumTracks.map((track, index) => (
                <li key={track.id} style={styles.trackItem}>
                  <strong>{track.trackNumber}. {track.name}</strong> &ndash;
                  <span>{track.artists.map(artist => artist.name).join(', ')}</span>
                  {track.features.length > 0 && (
                    <span> feat. {track.features.map(feature => feature.name).join(', ')}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

      </main>

      <footer style={styles.footer}>
        {/* Footer content */}
      </footer>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#121212',
    color: '#fff',
    minHeight: '100vh',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  main: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center'
  },
  title: {
    fontSize: '2.5em',
    marginBottom: '20px',
    color: '#1DB954' 
  },
  form: {
    marginBottom: '20px'
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '1.2em',
    borderRadius: '5px',
    border: 'none',
    marginBottom: '10px',
    outline: 'none'
  },
  dropdown: {
    border: '1px solid #333',
    maxHeight: '200px',
    overflowY: 'auto',
    listStyleType: 'none',
    padding: 0,
    borderRadius: '5px',
    backgroundColor: '#222'
  },
  dropdownItem: {
    cursor: 'pointer',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.3s'
  },
  albumImage: {
    width: '50px',
    height: '50px',
    marginRight: '10px',
    borderRadius: '5px'
  },
  albumName: {
    fontSize: '1em',
    fontWeight: 'bold'
  },
  artistName: {
    fontSize: '0.8em',
    color: '#aaa'
  },
  selectedAlbum: {
    marginTop: '20px',
    textAlign: 'center'
  },
  selectedAlbumName: {
    fontSize: '2em',
    marginBottom: '10px'
  },
  selectedAlbumImage: {
    maxWidth: '300px',
    borderRadius: '10px'
  },
  selectedArtistName: {
    fontSize: '1.2em',
    color: '#1DB954'
  },
  tracksHeader: {
    fontSize: '1.5em',
    marginTop: '20px',
    color: '#1DB954'
  },
  tracksList: {
    listStyleType: 'none',
    padding: 0,
    textAlign: 'left'
  },
  trackItem: {
    fontSize: '1.2em',
    marginBottom: '10px'
  },
  noAlbums: {
    padding: '10px',
    textAlign: 'center',
    color: '#aaa'
  },
  footer: {
    marginTop: '40px',
    textAlign: 'center',
    fontSize: '0.8em',
    color: '#666'
  }
};
