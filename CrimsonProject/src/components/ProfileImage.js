import React, {useMemo} from 'react';
import {Image, StyleSheet} from 'react-native';

const DEFAULT_PROFILE_IMAGE = require('../assets/images/default-profile.png');

const ProfileImage = ({size, uri, style}) => {
  const source = useMemo(() => {
    console.log('typeof uri', typeof uri);

    if (uri) {
      if (typeof uri === 'number') {
        return {uri: Image.resolveAssetSource(uri).uri};
      } else {
        return {uri};
      }
    }

    return DEFAULT_PROFILE_IMAGE;
  }, [uri]);

  return <Image source={source} style={[styles.profileImage(size), style]} />;
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
