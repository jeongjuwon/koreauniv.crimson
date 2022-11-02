import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {useRecoilState} from 'recoil';
import CancelButton from '../components/CancelButton';

import SaveButton from '../components/SaveButton';
import ScreenContainer from '../components/ScreenContainer';
import CustomTextInput from '../components/TextInput';
import tokenState from '../states/atoms/tokenState';

const WriteArticleScreen = ({navigation, route}) => {
  const {clubId, articleId, initArticles} = route.params;
  const [tokenStateValue, setTokenState] = useRecoilState(tokenState);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    async function init() {
      console.log('articleId', articleId);

      const response = await fetch(
        `http://localhost:3000/article/${articleId}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenStateValue}`,
          },
        },
      );

      const json = await response.json();
      setTitle(json.title);
      setContent(json.content);
      // console.log(json);
    }
    init();
  }, [articleId, tokenStateValue]);

  const onSave = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://localhost:3000/article', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          articleId,
          clubId,
          title,
          content,
        }),
      });
      const json = await response.json();
      console.log('json', json);
      initArticles();
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  }, [articleId, clubId, content, initArticles, navigation, title]);

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <CustomTextInput
          placeholder="제목을 입력하세요"
          value={title}
          setValue={setTitle}
          style={styles.titleTextInput}
        />
        <CustomTextInput
          placeholder="내용을 입력하세요"
          value={content}
          setValue={setContent}
          multiline
          style={styles.contentTextInput}
        />
        <SaveButton title="저장하기" onSave={onSave} />
        <CancelButton title="취소하기" onSave={onCancel} />
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  titleTextInput: {
    marginBottom: 20,
    fontSize: 15,
  },
  contentTextInput: {
    marginBottom: 20,
    flex: 1,
    paddingTop: 20,
    fontSize: 15,
  },
});

export default WriteArticleScreen;
