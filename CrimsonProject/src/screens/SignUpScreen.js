import React, { useCallback, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import PublicText from '../components/PublicText';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useEffect, useState, useMemo, useCallback, ..

  const onSignUp = useCallback(async () => {
    // API 호출을 할겁니다..
    console.log('email, password', email, password);

    try {
      const response = await fetch('http://localhost:3000/auth/signUp', {
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

      Alert.alert('알림', '가입이 완료되었습니다.', [
        {
          text: 'OK',
          onPress: () => {
            navigation.pop();
          },
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  }, [email, navigation, password]);

  // re-render
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <PublicText style={styles.title}>
        회원 가입 후 크림슨을 이용해 보세요!
      </PublicText>
      <TextInput
        style={styles.emailInput}
        onChangeText={text => {
          console.log('text', text);
          setEmail(text.toLowerCase());
        }}
        value={email}
        placeholder="이메일을 입력해주세요."
      />
      <TextInput
        style={styles.passwordInput}
        onChangeText={setPassword}
        value={password}
        placeholder="패스워드를 입력해주세요."
      />
      <TouchableOpacity
        title="가입하기"
        onPress={onSignUp}
        style={styles.signUpBtn}>
        <PublicText style={styles.signUpBtnTitle}>가입하기</PublicText>
      </TouchableOpacity>
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
    justifyContent: 'flex-end',
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
  signUpBtn: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: 'crimson',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
  signUpBtnTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default SignUpScreen;
