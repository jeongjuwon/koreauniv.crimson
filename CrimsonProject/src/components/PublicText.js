import React from 'react';
import {StyleSheet, Text, Platform} from 'react-native';

const PublicText = ({children, style}) => {
  return <Text style={[styles.defaultStyle, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  defaultStyle: {
    color: '#191919',
    fontFamily:
      Platform.OS === 'ios' ? 'Nanum GoDigANiGoGoDing' : 'GoDigANiGoGoDing',
    fontSize: 20,
  },
});

export default PublicText;
