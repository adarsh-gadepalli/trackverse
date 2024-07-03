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
  addToLibraryButton: {
    fontSize: '1.5em',
    backgroundColor: '#1DB954',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    padding: '10px 15px',
    cursor: 'pointer',
    position: 'absolute',
    top: '20px',
    right: '20px'
  },
  footer: {
    marginTop: '40px',
    textAlign: 'center',
    fontSize: '0.8em',
    color: '#666'
  }
};

export default styles;
