import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface CustomButtonProps{
    onPress:() => void;
    title:string;
    textStyles?:string;
    containerStyles?:string;
}

const CustomButton = ({ onPress, title, textStyles="", containerStyles=""}: CustomButtonProps) => {
  return (
    <TouchableOpacity 
        activeOpacity={0.5}
        className={`bg-white rounded-xl min-h-[62pxl] justify-center my-10 ${containerStyles}`}
        onPress={onPress}
    >
      <Text className={`font-semibold text-center text-lg mt-3 mb-3 ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

