import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useRecoilState} from 'recoil';
import CancelButton from '../components/CancelButton';
import GrayButton from '../components/GrayButton';
import ProfileImage from '../components/ProfileImage';

import SaveButton from '../components/SaveButton';
import ScreenContainer from '../components/ScreenContainer';
import CustomTextInput from '../components/TextInput';
import {getProfileImageUrl} from '../libs/remoteFiles';
import profileState from '../states/atoms/profileState';
import tokenState from '../states/atoms/tokenState';

const DEFAULT_PROFILE_IMAGE = require('../assets/images/default-profile.png');

const ClubJoinScreen = ({navigation, route}) => {
  const {clubId} = route.params;
  const [profileImage, setProfileImage] = useState('');
  const [nickName, setNickName] = useState('');
  const [profileStateValue, setProfileState] = useRecoilState(profileState);
  const [tokenStateValue, setTokenState] = useRecoilState(tokenState);

  useEffect(() => {
    setNickName(profileStateValue.name);
  }, [profileStateValue.name]);

  const onUploadProfileImage = useCallback(async () => {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    setProfileImage(response.assets[0]);
    console.log(response);
  }, []);
  const onSave = useCallback(async () => {
    const token = await AsyncStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3000/profile', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          profileId: profileStateValue.id,
          nickName,
          clubId,
        }),
      });

      const json = await response.json();
      console.log(json);
      if (json.status === 400) {
        Alert.alert('??????', '?????? ????????? ???????????????.', [
          {
            text: 'OK',
          },
        ]);
      }

      if (!profileImage) {
        setProfileState(json);

        navigation.goBack();
        return;
      }
      const data = new FormData();
      data.append('photo', {
        name: profileImage.fileName,
        type: profileImage.type,
        uri:
          Platform.OS === 'ios'
            ? profileImage.uri.replace('file://', '')
            : profileImage.uri,
      });
      console.log('json', json);
      data.append('profileId', json.id);

      const uploadResponse = await fetch(
        'http://localhost:3000/profile/upload',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: data,
        },
      );
      const uploadJson = await uploadResponse.json();
      console.log('uploadJson', uploadJson);

      setProfileState({
        ...json,
        image: uploadJson.image,
      });

      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  }, [
    clubId,
    navigation,
    nickName,
    profileImage,
    profileStateValue.id,
    setProfileState,
  ]);

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onDeleteProfile = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/profile', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenStateValue}`,
        },
        body: JSON.stringify({
          profileId: profileStateValue.id,
        }),
      });

      const json = await response.json();
      console.log('json', json);
      setProfileState({});

      navigation.popToTop();
      Alert.alert('??????', '?????????????????????.', [
        {
          text: '??????',
        },
      ]);
    } catch (e) {
      console.log(e);
    }
  }, [navigation, profileStateValue.id, setProfileState, tokenStateValue]);

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity
          onPress={onUploadProfileImage}
          style={styles.profileContainer}>
          <ProfileImage
            size={100}
            uri={
              profileImage.uri || getProfileImageUrl(profileStateValue.image)
            }
          />
        </TouchableOpacity>
        <CustomTextInput
          placeholder="???????????? ???????????????"
          value={nickName}
          setValue={setNickName}
        />
        {profileStateValue.id && (
          <SaveButton title="?????? ????????????" onSave={onSave} />
        )}
        {!profileStateValue.id && (
          <SaveButton title="?????? ????????????" onSave={onSave} />
        )}
        <CancelButton title="??????" onSave={onCancel} />
        {profileStateValue.id && (
          <GrayButton title="?????? ????????????" onSave={onDeleteProfile} />
        )}
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
});

export default ClubJoinScreen;
