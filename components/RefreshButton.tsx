import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, MD3Colors } from 'react-native-paper';

const RefreshButton = ({ onRefresh }) => (
  <View style={styles.item}>
      <IconButton
        icon="refresh"
        iconColor={MD3Colors.primary50}
        size={30}
        onPress={onRefresh}
      />
  </View>
);

export default RefreshButton;

const styles = StyleSheet.create({
    
})