import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ICON = require('../assets/images/icon-writing.png');

const FAB = ({clubId, initArticles}) => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.navigate('WriteArticle', {
      clubId,
      initArticles,
    });
  }, [clubId, navigation, initArticles]);

  return (
    <TouchableOpacity style={styles.container(inset.bottom)} onPress={onPress}>
      <Image source={ICON} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: bottom => ({
    borderRadius: 50,
    borderWidth: 3,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: bottom + 20,
    right: 20,
  }),
  icon: {
    width: 25,
    height: 25,
  },
});

export default FAB;
