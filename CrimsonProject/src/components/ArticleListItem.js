import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ProfileImage from './ProfileImage';
import {getProfileImageUrl} from '../libs/remoteFiles';

import PublicText from './PublicText';

dayjs.extend(relativeTime);

const DEFAULT_PROFILE_IMAGE = require('../assets/images/default-profile.png');

const ArticleListItem = ({
  paddingBottom,
  index,
  profileImage,
  title,
  content,
  authorName,
  createdAt,
  onPressArticle,
}) => {
  // 프로필 이미지 | 이름
  //            | 날짜
  return (
    <Pressable
      style={listItemStyles.container(index, paddingBottom)}
      onPress={onPressArticle}>
      <View style={listItemStyles.profileContainer}>
        <ProfileImage
          uri={getProfileImageUrl(profileImage)}
          style={listItemStyles.profileImage}
        />
        <View style={listItemStyles.authorContainer}>
          <PublicText>{authorName}</PublicText>
          <PublicText>{dayjs().from(dayjs(createdAt))}</PublicText>
        </View>
      </View>
      <View style={listItemStyles.contentContainer}>
        <PublicText style={listItemStyles.title}>{title}</PublicText>
        <PublicText style={listItemStyles.content}>{content}</PublicText>
      </View>
    </Pressable>
  );
};

const listItemStyles = StyleSheet.create({
  container: (index, paddingBottom) => ({
    paddingTop: index === 0 ? 0 : 20,
    paddingHorizontal: 20,
    paddingBottom: paddingBottom + 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0, 0.2)',
    backgroundColor: '#fff',
  }),
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorContainer: {
    marginLeft: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    marginTop: 20,
    fontSize: 20,
  },
  contentContainer: {
    marginLeft: 70,
  },
});

export default ArticleListItem;
