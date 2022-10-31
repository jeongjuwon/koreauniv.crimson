import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import SaveButton from '../components/SaveButton';
import ScreenContainer from '../components/ScreenContainer';
import CustomTextInput from '../components/TextInput';

const DEFAULT_PROFILE_IMAGE = require('../assets/images/default-profile.png');

const ClubJoinScreen = ({navigation, route}) => {
  const {clubId} = route.params;

  const onUploadProfileImage = useCallback(async () => {
    const response = await launchImageLibrary({
      mediaType: 'photo',
    });

    console.log(response);

    // 폼을 통해 폼데이터를 넘기는 로직이 후에 들어간다. 이부분에서 서버에 업로드를 하는 것.
    // conse uploadResponse = await fetch('http://localhost:3000/upload', {
    //   method: 'POST',
    //   body: {
    //     fileName: response.uri
    //   }
    // });
    // const uploaded = await uploadResponse.json()

    // uploaded.name: http://localhost:3000/images/user_files/99371282-6F12-402A-82CF-51C2F60B2065.jpg'

    // const response = await launchCamera({
    //   mediaType: 'photo',
    // });
    // console.log(response);
  }, []);

  const [profileImage, setProfileImage] = useState('');
  const [nickName, setNickName] = useState('');

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
          nickName,
          clubId,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.status === 400) {
        Alert.alert('알림', '이미 가입된 클럽입니다.', [
          {
            text: 'OK',
          },
        ]);
      }
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  }, [clubId, navigation, nickName]);

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity onPress={onUploadProfileImage}>
          <Image
            source={profileImage ? {uri: profileImage} : DEFAULT_PROFILE_IMAGE}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <CustomTextInput
          placeholder="닉네임을 입력하세요"
          value={nickName}
          setValue={setNickName}
        />
        <SaveButton title="클럽 가입하기" onSave={onSave} />
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 50,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default ClubJoinScreen;
