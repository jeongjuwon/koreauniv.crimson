import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import PublicText from './PublicText';

const SaveButton = ({onSave, title}) => {
  return (
    <TouchableOpacity style={styles.joinBtn} onPress={onSave}>
      <PublicText style={styles.joinBtnTitle}>{title}</PublicText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  joinBtn: {
    backgroundColor: 'crimson',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 50,
  },
  joinBtnTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default SaveButton;
