import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { search_album } from '../functions/search';
import { getAlbumTracks } from '../functions/getAlbumTracks';
import styles from '../globals/styles.js';
import AlbumSelection from '../components/albumselection.js'; 
import AlbumDropdown from '../components/dropdown.js'; 
import SearchInput from '../components/searchbar.js'; 

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
  const handleAddToLibrary = async (e) => {
    e.stopPropagation();

    if (selectedAlbum) {
        try {
            const payload = {
                id: selectedAlbum.id,
                imageURL: selectedAlbum.imageUrl,
                name: selectedAlbum.name,
                artist: selectedAlbum.artist
            };
            const response = await fetch('http://localhost:3000/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Album posted successfully:', result);
            } else {
                console.error('Failed to post album:', response.statusText);
            }
        } catch (error) {
            console.error('Error posting album:', error.message);
        }
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
          <SearchInput
            value={albumName}
            onChange={handleInputChange}
            onFocus={() => setIsDropdownVisible(true)}
            searchInputRef={searchInputRef}
          />
        </form>

        {isDropdownVisible && (
          <AlbumDropdown
            albums={albums}
            handleSelectAlbum={handleSelectAlbum}
          />
        )}

        {selectedAlbum && (
          <AlbumSelection
            selectedAlbum={selectedAlbum}
            albumTracks={albumTracks}
            handleAddToLibrary={handleAddToLibrary}
          />
        )}

      </main>

      <footer style={styles.footer}>
        <title>footer</title>
      </footer>
    </div>
  );
}
