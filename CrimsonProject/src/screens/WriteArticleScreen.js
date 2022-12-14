import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {useRecoilState} from 'recoil';
import CancelButton from '../components/CancelButton';
import GrayButton from '../components/GrayButton';

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
      const response = await fetch('http://localhost:3000/article', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenStateValue}`,
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
  }, [
    articleId,
    clubId,
    content,
    initArticles,
    navigation,
    title,
    tokenStateValue,
  ]);

  const onDelete = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/article/${articleId}`,
        {
          method: 'DELETE',
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenStateValue}`,
        },
      );
      const json = await response.json();
      console.log('json', json);
      initArticles();
      navigation.pop(2);
    } catch (e) {
      console.log(e);
    }
  }, [articleId, tokenStateValue]);

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <CustomTextInput
          placeholder="????????? ???????????????"
          value={title}
          setValue={setTitle}
          style={styles.titleTextInput}
        />
        <CustomTextInput
          placeholder="????????? ???????????????"
          value={content}
          setValue={setContent}
          multiline
          style={styles.contentTextInput}
        />
        {!articleId && <SaveButton title="????????????" onSave={onSave} />}
        {articleId && <SaveButton title="????????????" onSave={onSave} />}
        {articleId && <GrayButton title="????????????" onSave={onDelete} />}
        <CancelButton title="????????????" onSave={onCancel} />
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
