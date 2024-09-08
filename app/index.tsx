import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SearchBar from '@/components/SearchBar';
import { busStops } from '@/constants/bus-stops';
import * as Location from 'expo-location';
import busicon from '@/assets/images/BusIcon2.png';
import BottomSheetProp from '@/components/BottomSheet';
import MyComponent from '@/components/Chip';

export default function HomeScreen() {
  const [selectedNumLigne, setSelectedNumLigne] = useState<number | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const mapRef = useRef<MapView | null>(null);

  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleSelect = (item) => {
    setSelectedNumLigne(item.NumLigne);
  };

  const filteredStops = selectedNumLigne
    ? busStops.filter(stop => stop.NumLigne === selectedNumLigne)
    : [];

  const coordinates = filteredStops.map(stop => ({
    latitude: parseFloat(stop.Latitude),
    longitude: parseFloat(stop.Longitude),
  }));


  return (
    <GestureHandlerRootView style={styles.container}>
      <DismissKeyboard>
        <View style={styles.innerContainer}>
          <SearchBar onSelect={handleSelect} /> <MyComponent></MyComponent>
          <MapView
            style={styles.map}
            provider='google'
            mapType='standard'
            showsUserLocation
            initialRegion={{
              latitude: 36.8065, // center of Tunis
              longitude: 10.1815,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            ref={mapRef}
            >
            <Polyline
              coordinates={coordinates}
              strokeColor="#FF0000" // Customize the color of the polyline
              strokeWidth={5} // Customize the width of the polyline
              lineCap='round'
              lineJoin='bevel'
            />
            {filteredStops.map((stop) => (
              <Marker
                key={stop.ID}
                image={busicon}
                coordinate={{
                  latitude: parseFloat(stop.Latitude),
                  longitude: parseFloat(stop.Longitude),
                }}
                description={`Ligne: ${stop.NumLigne}, Stop: ${stop.NumStation}`}
                title={stop.NomStation}
              />
            ))}
          </MapView>
          <BottomSheetProp stops={filteredStops}/>
          <StatusBar style='dark' />
        </View>
      </DismissKeyboard>
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
