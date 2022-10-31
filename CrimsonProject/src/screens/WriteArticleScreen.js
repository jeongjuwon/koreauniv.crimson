import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

import SaveButton from '../components/SaveButton';
import ScreenContainer from '../components/ScreenContainer';
import CustomTextInput from '../components/TextInput';

const WriteArticleScreen = ({navigation, route}) => {
  const {clubId, initArticles} = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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
  }, [clubId, content, initArticles, navigation, title]);

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
