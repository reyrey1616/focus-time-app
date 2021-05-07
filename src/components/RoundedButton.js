import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';


const RoundedButton = ({
  title,
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {

  

  return (
    <TouchableOpacity style={[styles(size).radius, style]} {...props}>
      <Text style={[styles(size).text, textStyle]}> { title } </Text>
    </TouchableOpacity>
  );
};

const styles = (size) => StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#333',
      borderWidth: 2,
    },
    text: {
      color: '#333',
      fontSize: size / 3
    },
  });

  
export default RoundedButton;