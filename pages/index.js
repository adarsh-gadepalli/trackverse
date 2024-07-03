import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { search_album } from '../functions/search';
import { getAlbumTracks } from '../functions/getAlbumTracks';
import styles from '../globals/styles.js'

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
    setAlbumTracks([]);

    try {
      const tracks = await getAlbumTracks(album.id);
      setAlbumTracks(tracks);
    } catch (error) {
      console.error('Error fetching album tracks:', error.message);
      setAlbumTracks([]);
    }
  };

  const handleAddToLibrary = (e) => {
    e.stopPropagation(); // Prevent dropdown from closing on button click
    console.log('Selected:', selectedAlbum); // Replace with your desired functionality
    // Implement your logic to add the selected album to the library
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
            <button onClick={handleAddToLibrary} style={styles.addToLibraryButton}>+</button>
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
