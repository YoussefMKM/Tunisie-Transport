import * as React from 'react';
import { IconButton, MD3Colors } from 'react-native-paper';

const DeleteButton = ({ onDelete }) => (
  <IconButton
    icon="delete-forever"
    iconColor={MD3Colors.error50}
    size={30}
    onPress={onDelete}
  />
);

export default DeleteButton;
