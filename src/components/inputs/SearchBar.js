import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (text) => {
    setQuery(text);
    onSearch(text);
  };

  return (
      <TextInput
        style={styles.input}
        placeholder="Buscar..."
        value={query}
        onChangeText={handleSearch}
      />
  );
};

const styles = StyleSheet.create({
  
  input: {
    flex:1,
    // width:'100%',
    // height:'85%',
    marginLeft:5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize:12
  },
});

export default SearchBar;
