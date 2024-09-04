import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SearchBar from '@/components/SearchBar';
import { busStops } from '@/constants/bus-stops';
import * as Location from 'expo-location';
import busicon from '@/assets/images/BusIcon2.png';


export default function HomeScreen() {
  const [selectedNumLigne, setSelectedNumLigne] = useState(null);

  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
  
  
  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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

  let text = '';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
// Route work in progress
/*  const getRoute = async () => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startLocation}&destination=${endLocation}&waypoints=${waypoints}&key=YOUR_API_KEY`
    );
    const data = await response.json();
    const points = decode(data.routes[0].overview_polyline.points);
    setCoordinates(points);
  };

  const decode = (t, e) => {
    let points = Polyline.decode(t);
    let coords = points.map((point, index) => {
      return {
        latitude: point[0],
        longitude: point[1]
      };
    });
    return coords;
  };
*/
  

  // Handler function to update selected stop
  const handleSelect = (item) => {
    setSelectedNumLigne(item.NumLigne); // Store the NumLigne for selected stop
  };

  // Filter bus stops based on selected NumLigne
  const filteredStops = selectedNumLigne
    ? busStops.filter(stop => stop.NumLigne === selectedNumLigne)
    : [];
  
  const coordinates = filteredStops.map((stop) => ({
    latitude: parseFloat(stop.Latitude),
    longitude: parseFloat(stop.Longitude),
  }));
  
  return (
    <GestureHandlerRootView style={styles.container}>
      <DismissKeyboard>
        <View style={styles.innerContainer}>
          <Text>Tunisie Transport by Youssef Dardouri</Text>
          <SearchBar onSelect={handleSelect} />
          {selectedNumLigne && (
            <><Text style={styles.selectedText}>Showing markers for Ligne: {selectedNumLigne}</Text><Text>{text}</Text></>
            
          )}
          <MapView
            style={styles.map}
            provider='google'
            mapType='standard'
            showsUserLocation
            initialRegion={{
              latitude: 36.8065, // center of Tunis
              longitude: 10.1815,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
          
<Polyline
  coordinates={coordinates}
  strokeColor="#FF0000" // Customize the color of the polyline
  strokeWidth={5}    // Customize the width of the polyline
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
          <StatusBar style="dark" />
        </View>
      </DismissKeyboard>
    </GestureHandlerRootView>
  );
}
/*{filteredStops.map((stop) => (
              <Marker
                key={stop.ID}
                coordinate={{
                  latitude: parseFloat(stop.Latitude),
                  longitude: parseFloat(stop.Longitude),
                }}
                description={`Ligne: ${stop.NumLigne}, Stop: ${stop.NumStation}`}
                title={stop.NomStation}
              />
            ))}*/
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
