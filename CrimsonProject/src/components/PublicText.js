import React from 'react';
import {StyleSheet, Text} from 'react-native';

const PublicText = ({children, style}) => {
  return <Text style={[styles.defaultStyle, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  defaultStyle: {
    color: '#191919',
    fontFamily: 'Nanum GoDigANiGoGoDing',
  },
});

export default PublicText;
