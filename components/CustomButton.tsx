import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CustomButton = ({filteredStops, NumLigne}) => {
  const saveFilteredStops = async () => {
    try {
      // Save filtered stops for the NumLigne in AsyncStorage
      const key = `filteredStops_${NumLigne}`;
      const stopsData = JSON.stringify(filteredStops);
      await AsyncStorage.setItem(key, stopsData);
      console.log(`Data saved for NumLigne: ${NumLigne}`);
    } catch (error) {
      console.error('Error saving filtered stops:', error);
    }
  };


    return(
        <Button icon="heart" mode="contained" onPress={saveFilteredStops}  >
        Save {NumLigne} to favorites
        </Button>
    )

};

export default CustomButton;




