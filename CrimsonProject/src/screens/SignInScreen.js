import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRecoilState, useSetRecoilState} from 'recoil';

import PublicText from '../components/PublicText';
import CustomTextInput from '../components/TextInput';
import tokenState from '../states/atoms/tokenState';

const SignInScreen = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setTokenState = useSetRecoilState(tokenState);

  // useEffect, useState, useMemo, useCallback, ..
  const saveUserToken = useCallback(
    async token => {
      // async storage에 저장
      await AsyncStorage.setItem('token', token);
      setTokenState(token);
    },
    [setTokenState],
  );

  const onSignIn = useCallback(async () => {
    // API 호출을 할겁니다..
    console.log('email, password', email, password);

    try {
      const response = await fetch('http://localhost:3000/auth/signIn', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      console.log('response', response);
      const json = await response.json();
      console.log('json', json);
      saveUserToken(json.token);
    } catch (err) {
      console.log(err);
    }
  }, [email, password, saveUserToken]);

  const onSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  // re-render
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <PublicText style={styles.title}>
        로그인 후 크림슨을 이용해 보세요!
      </PublicText>
      <CustomTextInput
        style={styles.emailInput}
        setValue={text => {
          console.log('text', text);
          setEmail(text.toLowerCase());
        }}
        value={email}
        placeholder="이메일을 입력해주세요."
      />
      <CustomTextInput
        style={styles.passwordInput}
        setValue={setPassword}
        value={password}
        placeholder="패스워드를 입력해주세요."
      />
      <TouchableOpacity
        title="로그인"
        onPress={onSignIn}
        style={styles.signInBtn}>
        <PublicText style={styles.signInBtnTitle}>로그인</PublicText>
      </TouchableOpacity>
      <View style={styles.signUpBtnContainer}>
        <PublicText>아직 회원이 아니신가요?</PublicText>
        <TouchableOpacity onPress={onSignUp} style={styles.signUpBtn}>
          <PublicText style={styles.signUpBtnTitle}>회원가입</PublicText>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#000',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 50,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailInput: {
    borderWidth: 1,
    height: 50,
    alignSelf: 'stretch',
    borderRadius: 30,
    paddingHorizontal: 30,
  },
  passwordInput: {
    marginTop: 20,
    borderWidth: 1,
    height: 50,
    alignSelf: 'stretch',
    borderRadius: 30,
    paddingHorizontal: 30,
  },
  signInBtn: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: 'crimson',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signInBtnTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  signUpBtnTitle: {
    color: 'blue',
  },
  signUpBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signUpBtn: {
    padding: 20,
  },
});
export default SignInScreen;
