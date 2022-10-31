import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const CustomTextInput = ({value, setValue, placeholder, multiline, style}) => {
  return (
    <TextInput
      style={[styles.textInput, style]}
      placeholder={placeholder}
      value={value}
      onChangeText={setValue}
      multiline={multiline}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    height: 50,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
});

export default CustomTextInput;
