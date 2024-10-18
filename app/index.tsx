import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard, useColorScheme } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
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
  MD3Colors,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from 'react-native-paper';


export default function HomeScreen() {
  // Theme setup
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme =
    colorScheme === 'dark'
      ? { ...MD3DarkTheme, colors: theme.dark }
      : { ...MD3LightTheme, colors: theme.light };
  
  const [selectedNumLigne, setSelectedNumLigne] = useState<number | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const mapRef = useRef(null);

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

  const handleBottomSheetNumLigneSelect = (numLigne: string) => {
    setSelectedNumLigne(parseInt(numLigne));
  };

  const filteredStops = selectedNumLigne
    ? busStops.filter(stop => stop.NumLigne === selectedNumLigne)
    : [];

  const coordinates = filteredStops.map(stop => [
    parseFloat(stop.Longitude),
    parseFloat(stop.Latitude)
  ]);

  useEffect(() => {
    if (filteredStops.length > 0) {
      mapRef.current?.fitBounds(
        [Math.min(...coordinates.map(coord => coord[0])), Math.min(...coordinates.map(coord => coord[1]))],
        [Math.max(...coordinates.map(coord => coord[0])), Math.max(...coordinates.map(coord => coord[1]))],
        { padding: 50, animated: true }
      );
    }
  }, [filteredStops]);

  return (
    <PaperProvider theme={paperTheme}>
      <GestureHandlerRootView style={styles.container}>
        <DismissKeyboard>
          <View style={styles.innerContainer}>
            <SearchBar onSelect={handleSelect} />
            
            <View style={styles.mapcontainer}>
              <MapboxGL.MapView
                style={styles.map}
                ref={mapRef}
                zoomEnabled={true}
                pitchEnabled={true}
              >
                <MapboxGL.Camera
                  zoomLevel={10}
                  centerCoordinate={[10.1815, 36.8065]}
                />
                
                {/* Polyline (LineLayer) */}
                <MapboxGL.ShapeSource
                  id="lineSource"
                  shape={{
                    type: 'Feature',
                    geometry: {
                      type: 'LineString',
                      coordinates: coordinates,
                    },
                  }}
                >
                  <MapboxGL.LineLayer
                    id="lineLayer"
                    style={{
                      lineColor: "#FF0000",
                      lineWidth: 5,
                      lineCap: 'round',
                      lineJoin: 'bevel',
                    }}
                  />
                </MapboxGL.ShapeSource>

                {/* Markers */}
                {filteredStops.map((stop) => (
                  <MapboxGL.PointAnnotation
                    key={stop.ID}
                    id={`marker-${stop.ID}`}
                    coordinate={[parseFloat(stop.Longitude), parseFloat(stop.Latitude)]}
                  >
                    <View style={styles.markerContainer}>
                      <View style={styles.marker} />
                      <Text>{stop.NomStation}</Text>
                    </View>
                  </MapboxGL.PointAnnotation>
                ))}
              </MapboxGL.MapView>
            </View>
      
            <View style={styles.CustomButton1}>
              <CustomButton 
                NumLigne={filteredStops.length > 0 ? filteredStops[0].NumLigne : null} 
                filteredStops={filteredStops}
              />
            </View>
            <BottomSheetProp onNumLigneSelect={handleBottomSheetNumLigneSelect} />
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
  mapcontainer: {
    flex: 1,
    width: '100%',
    marginBottom: 60,
    borderRadius: 5,
    borderColor: MD3Colors.primary50,
    borderWidth: 4,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'red',
  },
  CustomButton1: {
    position: 'absolute',
    bottom: 70,
    right: 0,
    width: 200,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
