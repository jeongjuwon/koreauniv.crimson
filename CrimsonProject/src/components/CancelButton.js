import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import PublicText from './PublicText';

const CancelButton = ({onSave, title}) => {
  return (
    <TouchableOpacity style={styles.joinBtn} onPress={onSave}>
      <PublicText style={styles.joinBtnTitle}>{title}</PublicText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  joinBtn: {
    backgroundColor: '#ff',
    borderWidth: 1,
    borderColor: '#ccc',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 10,
  },
  joinBtnTitle: {
    color: '#191919',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default CancelButton;
