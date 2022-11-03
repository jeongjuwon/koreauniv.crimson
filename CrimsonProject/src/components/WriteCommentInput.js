import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useMemo, useState, useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import commentState from '../states/atoms/commentState';
import tokenState from '../states/atoms/tokenState';
import PublicText from './PublicText';
import CustomTextInput from './TextInput';

const WriteCommentInput = ({articleId, profile, onSave, onDelete}) => {
  const [commentStateValue, setCommentState] = useRecoilState(commentState);
  const tokenStateValue = useRecoilValue(tokenState);

  const [content, setContent] = useState('');

  useEffect(() => {
    console.log('commentStateValue', commentStateValue);
    if (commentStateValue) {
      setContent(commentStateValue.content);
    }
  }, [commentStateValue]);

  const onPress = useCallback(async () => {
    try {
      if (!profile) {
        Alert.alert('알림', '프로필 정보가 없습니다.', [
          {
            text: '확인',
          },
        ]);
        return;
      }
      const response = await fetch('http://localhost:3000/comment', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenStateValue}`,
        },
        body: JSON.stringify({
          articleId,
          clubId: profile.clubId,
          authorId: profile.id,
          content,
          commentId: commentStateValue ? commentStateValue.id : null,
        }),
      });
      const json = await response.json();
      console.log('json', json);
      setContent('');
      setCommentState(null);

      if (onSave) {
        onSave();
      }
    } catch (e) {}
  }, [
    profile,
    tokenStateValue,
    articleId,
    content,
    commentStateValue,
    setCommentState,
    onSave,
  ]);

  const onDeleteComment = useCallback(async () => {
    try {
      if (!commentStateValue) {
        Alert.alert('알림', '선택된 댓글이 없습니다.', [
          {
            text: '확인',
          },
        ]);
        return;
      }

      const response = await fetch(
        `http://localhost:3000/comment/${commentStateValue.id}`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenStateValue}`,
          },
        },
      );
      const json = await response.json();
      console.log(json);
      setContent('');
      setCommentState(null);

      if (onDelete) {
        onDelete();
      }
    } catch (e) {
      console.log(e);
    }
  }, [commentStateValue, onDelete, setCommentState, tokenStateValue]);

  const isDisabled = useMemo(() => content.length < 10, [content.length]);

  return (
    <View style={styles.container}>
      <CustomTextInput
        style={styles.textInput}
        multiline
        value={content}
        setValue={setContent}
      />
      {commentStateValue && (
        <TouchableOpacity
          style={styles.btn}
          onPress={onPress}
          disabled={isDisabled}>
          <PublicText style={styles.btnTitle(isDisabled)}>수정</PublicText>
        </TouchableOpacity>
      )}
      {commentStateValue && (
        <TouchableOpacity style={styles.btn} onPress={onDeleteComment}>
          <PublicText style={styles.btnTitle(false)}>삭제</PublicText>
        </TouchableOpacity>
      )}
      {!commentStateValue && (
        <TouchableOpacity
          style={styles.btn}
          onPress={onPress}
          disabled={isDisabled}>
          <PublicText style={styles.btnTitle(isDisabled)}>등록</PublicText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    borderRadius: 30,
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 20,
    fontSize: 20,
    lineHeight: 30,
    textAlignVertical: 'center',
  },
  btn: {
    borderRadius: 30,
    // borderWidth: 1,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  btnTitle: isDisabled => ({
    fontSize: 20,
    fontWeight: '700',
    color: isDisabled === true ? '#ccc' : '#191919',
  }),
});

export default WriteCommentInput;
