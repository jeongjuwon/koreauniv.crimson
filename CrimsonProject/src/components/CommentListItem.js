import React, {useCallback} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useSetRecoilState} from 'recoil';
import ProfileImage from '../components/ProfileImage';
import PublicText from '../components/PublicText';
import {getProfileImageUrl} from '../libs/remoteFiles';
import commentState from '../states/atoms/commentState';

const CommentListItem = ({item}) => {
  const setCommentState = useSetRecoilState(commentState);

  const onEdit = useCallback(() => {
    setCommentState(item);
  }, [item, setCommentState]);

  return (
    <View style={listItemStyles.container}>
      <View style={listItemStyles.profileContainer}>
        <ProfileImage
          size={30}
          style={listItemStyles.profileImage}
          uri={getProfileImageUrl(item.profile.image)}
        />
      </View>
      <View style={listItemStyles.contentContainer}>
        <PublicText style={listItemStyles.profileName}>
          {item.profile.name}
        </PublicText>
        <PublicText style={listItemStyles.content}>
          {item.content || '내용이 없습니다.'}
        </PublicText>
      </View>
      <TouchableOpacity style={listItemStyles.btn} onPress={onEdit}>
        <PublicText style={listItemStyles.btnText}>수정</PublicText>
      </TouchableOpacity>
    </View>
  );
};

const listItemStyles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.2,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    flexDirection: 'row',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    marginRight: 20,
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    fontSize: 20,
  },
  btn: {
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommentListItem;
