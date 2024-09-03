import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { busStops } from '@/constants/bus-stops'; // Adjust the path if necessary

interface SearchBarProps {
  onSelect: (item: any) => void; // Replace 'any' with the appropriate type
}

const SearchBar: React.FC<SearchBarProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Function to handle search input change
  const handleChange = (text: string) => {
    setQuery(text);
    filterResults(text);
  };

  // Filter bus stops based on NumLigne and NomStation
  const filterResults = (text: string) => {
    if (text) {
      const filtered = busStops.filter(stop => {
        const numLigne = String(stop.NumLigne).toLowerCase(); // Convert to lower case for case-insensitive comparison
        const name = stop.NomStation.toLowerCase(); // Convert to lower case for case-insensitive comparison
        
        const queryLower = text.toLowerCase(); // Convert to lower case for case-insensitive comparison
        return numLigne.includes(queryLower) || name.includes(queryLower);
      });
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  function handleSelect(item: any) {
    onSelect(item); // Call the callback to update the parent state
    setQuery(item.name); // Optional: Set the query to the selected stop name
    setResults([]); // Hide results after selection
  }

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.searchContainer}>
      <TextInput
        value={query}
        onChangeText={handleChange}
        placeholder="Search by N° Ligne or station name"
        style={styles.input}
      />
      <FlatList
        data={results}
        keyExtractor={(item, index) => `${item.NumLigne}-${index}`} // Ensure unique keys
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelect(item)} style={styles.item}>
            <Text style={styles.itemText}>{item.NomStation} (Ligne {item.NumLigne})</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    color: '#000',
  }
});

export default SearchBar;
