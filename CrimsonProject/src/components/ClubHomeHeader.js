import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
// 네비게이션 설치과정에서 설치된 패키지
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRecoilState, useRecoilValue} from 'recoil';
import {getProfileImageUrl} from '../libs/remoteFiles';
import profileState from '../states/atoms/profileState';
import ProfileImage from './ProfileImage';
import PublicText from './PublicText';

const ClubHomeHeader = ({clubId}) => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  const [profileStateValue, setProfileState] = useRecoilState(profileState);

  console.log('profileStateValue', profileStateValue);

  const onBack = useCallback(() => {
    navigation.goBack();
    setProfileState({});
  }, [navigation, setProfileState]);

  const onPress = useCallback(() => {
    navigation.navigate('ClubJoin', {
      clubId,
    });
  }, [navigation, clubId]);

  return (
    <View style={styles.container(inset.top)}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <PublicText style={styles.backBtnTitle}>뒤로</PublicText>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <ProfileImage
          size={30}
          uri={getProfileImageUrl(profileStateValue.image)}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: paddingTop => ({
    paddingTop,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
  }),
  backBtn: {},
  backBtnTitle: {
    fontSize: 20,
  },
});

export default ClubHomeHeader;
