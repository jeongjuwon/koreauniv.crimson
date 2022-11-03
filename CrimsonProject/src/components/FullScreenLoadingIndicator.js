import React from 'react';
import {View, StyleSheet} from 'react-native';
import {DotIndicator} from 'react-native-indicators';

const FullScreenLoadingIndicator = ({
  backgroundColor = '#fff',
  color = 'white',
  size = 3,
}) => {
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <DotIndicator color={color} size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FullScreenLoadingIndicator;
