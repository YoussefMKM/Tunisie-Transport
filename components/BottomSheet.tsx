import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import Handle from './Handle';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

function BottomSheetProp({stops}) {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChange", index);
        
    }, []);

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={0} {...props}/>
        
    )



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
        >
          <Text style={{textAlign:"center"}}>Tunisie Transport by Youssef Dardouri</Text>
          <BottomSheetFlatList
            data={stops}
            keyExtractor={(item, index) => `${item.NumLigne}-${index}`} // Ensure unique keys
            renderItem={({ item }) => (
                <Text style={styles.item}>Stop N°:{item.NumStation} {item.NomStation} </Text>
            )}
            scrollEnabled={true}>
        
          </BottomSheetFlatList>
          </BottomSheet>
        
    );
}


const styles = StyleSheet.create({
item: {
  padding: 15,
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
},
})
export default BottomSheetProp;

function onSendLocation(coordinate: any) {
  throw new Error('Function not implemented.');
}
