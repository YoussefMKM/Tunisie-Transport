import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SearchBar from '@/components/SearchBar';
import { busStops } from '@/constants/bus-stops'; // Ensure this path is correct

export default function HomeScreen() {
  const [selectedNumLigne, setSelectedNumLigne] = useState(null);

  const handleSelect = (item) => {
    setSelectedNumLigne(item.NumLigne); // Store the NumLigne for selected stop
  };

  // Filter bus stops based on selected NumLigne
  const filteredStops = selectedNumLigne
    ? busStops.filter(stop => stop.NumLigne === selectedNumLigne)
    : [];

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text>Tunisie Transport</Text>
        <SearchBar onSelect={handleSelect} />
        {selectedNumLigne && (
          <Text style={styles.selectedText}>Showing markers for Ligne: {selectedNumLigne}</Text>
        )}

        <MapView
          style={styles.map}
          provider='google'
          mapType='standard'
          initialRegion={{
            latitude: 36.8065, // center of Tunis
            longitude: 10.1815,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {filteredStops.map((stop) => (
            <Marker
              key={stop.ID}
              coordinate={{
                latitude: parseFloat(stop.Latitude),
                longitude: parseFloat(stop.Longitude),
              }}
              description={`Line: ${stop.NumLigne}, Stop: ${stop.NumStation}`}
              title={stop.NomStation}
            />
          ))}
        </MapView>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: '100%',
  },
  selectedText: {
    marginVertical: 10,
  },
});

/*{busStops.map((stop) => (
              <Marker
              key={stop.ID}
              coordinate={{
                latitude: parseFloat(stop.Latitude),
                longitude: parseFloat(stop.Longitude),
              }}
            description={`Line: ${stop.NumLigne}, Stop: ${stop.NumStation}`}
            title={stop.NomStation}
          />))} */
