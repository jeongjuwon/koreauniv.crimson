import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useMemo, useState} from 'react';
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PublicText from './PublicText';

const WriteCommentInput = ({articleId, profile, onSave}) => {
  const [content, setContent] = useState('');

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
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://localhost:3000/comment', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          articleId,
          clubId: profile.clubId,
          authorId: profile.id,
          content,
        }),
      });
      const json = await response.json();
      console.log('json', json);
      setContent('');

      if (onSave) {
        onSave();
      }
    } catch (e) {}
  }, [articleId, content, profile, onSave]);

  const isDisabled = useMemo(() => content.length < 10, [content.length]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        multiline
        value={content}
        onChangeText={setContent}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={onPress}
        disabled={isDisabled}>
        <PublicText style={styles.btnTitle(isDisabled)}>등록</PublicText>
      </TouchableOpacity>
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
