import React, { useCallback, useEffect, useState } from 'react';
import { ImageBackground, Pressable, StyleSheet } from 'react-native';

import PublicText from '../components/PublicText';

// image ex) "/images/student_council.jpg"
const ClubListItem = ({image, name, onPress, style}) => {
  return (
    <Pressable style={[listItemStyle.container, style]} onPress={onPress}>
      <ImageBackground
        source={{uri: `http://localhost:3000${image}`}}
        style={listItemStyle.image}>
        <PublicText style={listItemStyle.clubName}>{name}</PublicText>
      </ImageBackground>
    </Pressable>
  );
};

const listItemStyle = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  clubName: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '600',
  },
  image: {
    alignSelf: 'stretch',
    height: 200,
    padding: 20,
  },
});

export default ClubListItem;
