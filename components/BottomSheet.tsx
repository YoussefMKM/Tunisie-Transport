import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
import Handle from './Handle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeleteButton from './DeleteButton';
import RefreshButton from './RefreshButton';
import { MD3Colors } from 'react-native-paper';

function BottomSheetProp({  }) {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChange", index);
        
    }, []);

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={0} {...props}/>
        
    )
    const [numLignes, setNumLignes] = useState([]);

    // Function to fetch all saved NumLignes from AsyncStorage
    const loadNumLignes = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const filteredKeys = keys.filter(key => key.startsWith('filteredStops_'));
  
        // Extract NumLigne from the key (e.g., "filteredStops_23" -> "23")
        const lignes = filteredKeys.map(key => key.replace('filteredStops_', ''));
  
        // Remove duplicates (in case of any redundant saves)
        const uniqueLignes = [...new Set(lignes)];
        setNumLignes(uniqueLignes);
      } catch (error) {
        console.error('Failed to load NumLignes from AsyncStorage:', error);
      }
    };
  
    // Load all NumLignes on component mount
    useEffect(() => {
      loadNumLignes();
    }, []);

    const deleteNumLigne = async (numLigne) => {
      try {
        const key = `filteredStops_${numLigne}`;
        await AsyncStorage.removeItem(key);
        console.log(`Deleted data for NumLigne: ${numLigne}`);
        // Reload data after deleting
        loadNumLignes();
      } catch (error) {
        console.error('Error deleting NumLigne:', error);
      }
    };    

    // renders
    return (
        <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={[60, '60%']}
        enableContentPanningGesture={false}
        backdropComponent={renderBackdrop}
        keyboardBehavior='fillParent'
        handleComponent={(props: any) => <Handle {...props}/>}
        ><Text style={{textAlign:"center"}}>Swipe up to see your saved routes</Text>
          
        
          
          {numLignes.length > 0 ? (
            <><RefreshButton onRefresh={loadNumLignes}></RefreshButton>
            <BottomSheetFlatList
            data={numLignes}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (

              <View style={styles.list}>
                <TouchableOpacity onPress={() => console.log("numligne pressed")}>
                  <Text style={styles.text}>NumLigne: {item}</Text>
                </TouchableOpacity>
                <DeleteButton onDelete={() => deleteNumLigne(item)}></DeleteButton>
              </View>
            )} /></>
        ) : (
          <View style={styles.NoSaved}><Text>No saved NumLignes available.</Text><RefreshButton onRefresh={loadNumLignes}></RefreshButton></View>
        )}
          </BottomSheet>
        
    );
}


const styles = StyleSheet.create({
item: {
  padding: 15,
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
},
NoSaved:{
  flexDirection:"column",
  height:200,
  justifyContent: 'center',
  alignItems:"center"
},
list:{
  flexDirection: 'row',  // This ensures the items are aligned horizontally
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor:MD3Colors.secondary80,
  borderWidth:1,
  borderRadius:15,
  margin:6,
  padding:10
},

})
export default BottomSheetProp;
