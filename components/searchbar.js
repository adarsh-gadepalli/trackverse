import React from 'react';
import styles from '../globals/styles.js'

const SearchInput = ({ value, onChange, onFocus, searchInputRef }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder="Enter album name"
    onFocus={onFocus}
    style={styles.input}
    ref={searchInputRef}
  />
);

export default SearchInput;
