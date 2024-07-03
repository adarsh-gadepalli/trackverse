import React from 'react';
import styles from '../globals/styles.js'

const AlbumDropdown = ({ albums, handleSelectAlbum }) => (
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
);

export default AlbumDropdown;



