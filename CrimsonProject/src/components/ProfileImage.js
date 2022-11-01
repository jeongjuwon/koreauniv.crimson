import React from 'react';
import {Image, StyleSheet} from 'react-native';

const DEFAULT_PROFILE_IMAGE = require('../assets/images/default-profile.png');

const ProfileImage = ({size, uri, style}) => {
  return (
    <Image
      source={uri ? {uri} : DEFAULT_PROFILE_IMAGE}
      style={[styles.profileImage(size), style]}
    />
  );
};

const styles = StyleSheet.create({
  profileImage: size => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    borderColor: '#ccc',
    borderWidth: 1,
  }),
});

export default ProfileImage;
