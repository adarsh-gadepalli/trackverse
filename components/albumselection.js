import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styles from '../globals/styles.js';

const AlbumSelection = ({ selectedAlbum, albumTracks, handleAddToLibrary }) => (
  <div style={styles.selectedAlbum}>
    <h2 style={styles.selectedAlbumName}>{selectedAlbum.name}</h2>
    <img src={selectedAlbum.imageUrl} alt="Album Cover" style={styles.selectedAlbumImage} />
    <button onClick={handleAddToLibrary} style={styles.addToLibraryButton}>
      <FontAwesomeIcon icon={faStar} style={styles.goldStarIcon} />
    </button>
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
);

export default AlbumSelection;
