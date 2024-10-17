import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeleteButton from './DeleteButton';
import RefreshButton from './RefreshButton';
import { MD3Colors } from 'react-native-paper';

interface BottomSheetPropProps {
  onNumLigneSelect: (numLigne: string) => void;
}

function BottomSheetProp({ onNumLigneSelect }: BottomSheetPropProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [numLignes, setNumLignes] = useState<string[]>([]);

  const loadNumLignes = useCallback(async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const filteredKeys = keys.filter(key => key.startsWith('filteredStops_'));
      const lignes = filteredKeys.map(key => key.replace('filteredStops_', ''));
      const uniqueLignes = [...new Set(lignes)];
      setNumLignes(uniqueLignes);
    } catch (error) {
      console.error('Failed to load NumLignes from AsyncStorage:', error);
    }
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChange", index);
    loadNumLignes();
  }, [loadNumLignes]);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={0} {...props} />
  , []);

  useEffect(() => {
    loadNumLignes();
  }, [loadNumLignes]);

  const deleteNumLigne = useCallback(async (numLigne: string) => {
    try {
      const key = `filteredStops_${numLigne}`;
      await AsyncStorage.removeItem(key);
      console.log(`Deleted data for NumLigne: ${numLigne}`);
      loadNumLignes();
    } catch (error) {
      console.error('Error deleting NumLigne:', error);
    }
  }, [loadNumLignes]);

  const handleNumLignePress = useCallback((numLigne: string) => {
    onNumLigneSelect(numLigne);
    bottomSheetRef.current?.collapse();
  }, [onNumLigneSelect]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      backgroundStyle={styles.BackgroundBottomSheet}
      snapPoints={[60, '60%', "80%"]}
      enableContentPanningGesture={false}
      backdropComponent={renderBackdrop}
      keyboardBehavior='fillParent'
    >
      <Text style={{textAlign: "center", paddingBottom:20}}>Swipe up to see your saved routes</Text>
      <BottomSheetView style={{flex:1,}}>
      {numLignes.length > 0 ? (
        
        <BottomSheetFlatList
          style={styles.flatlist}
          data={numLignes}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={{flexDirection:"row"}}>
              <><TouchableOpacity onPress={() => handleNumLignePress(item)} style={styles.list}>
              
                <Text style={styles.text}>Ligne: {item}</Text>
              
            </TouchableOpacity><DeleteButton onDelete={() => deleteNumLigne(item)} /></></View>
            
          )}
        />
      
    ) : (
      <View style={styles.NoSaved}>
        <View><Image source="@/assets/images/BusIcon2.png" style={{width: 40, height: 40}} /></View>
        <Text>Aucune ligne sauvgardee.</Text>
        <RefreshButton onRefresh={loadNumLignes} />
      </View>
    )}
      </BottomSheetView>
      
    </BottomSheet>
  );
}


const styles = StyleSheet.create({
item: {
  padding: 15,
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
},
flatlist:{
  
},
NoSaved:{
  flexDirection:"column",
  height:200,
  justifyContent: 'center',
  alignItems:"center"
},
list:{
  flex:1,
  justifyContent: 'space-between',
  backgroundColor:MD3Colors.secondary80,
  borderWidth:1,
  borderRadius:15,
  margin:6,
  padding:10,
},
BackgroundBottomSheet:{
  flex:1,
}

})
export default BottomSheetProp;
