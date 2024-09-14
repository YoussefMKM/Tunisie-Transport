import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard, useColorScheme } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SearchBar from '@/components/SearchBar';
import { busStops } from '@/constants/bus-stops';
import * as Location from 'expo-location';
import busicon from '@/assets/images/BusIcon2.png';
import BottomSheetProp from '@/components/BottomSheet';
import CustomButton from '@/components/CustomButton';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from 'react-native-paper';

export default function HomeScreen() {
  //theme stuff
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme =
    colorScheme === 'dark'
      ? { ...MD3DarkTheme, colors: theme.dark }
      : { ...MD3LightTheme, colors: theme.light };

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
    <PaperProvider theme={paperTheme}>
      <GestureHandlerRootView style={styles.container}>
        <DismissKeyboard>
          <View style={styles.innerContainer}>
            <SearchBar onSelect={handleSelect} />
            
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
      
            <View  style={styles.CustomButton1}><CustomButton NumLigne={filteredStops ? Object.values(filteredStops)[0]?.NumLigne : null} filteredStops={filteredStops}></CustomButton></View>
            <BottomSheetProp/>
            <StatusBar style='dark' />
          </View>
        </DismissKeyboard>
      </GestureHandlerRootView>
    </PaperProvider>
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
  CustomButton1:{
    position: 'absolute',
    bottom: 70, // Position from bottom
    right: 0, // Position from right
    width: 200,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  }
});

