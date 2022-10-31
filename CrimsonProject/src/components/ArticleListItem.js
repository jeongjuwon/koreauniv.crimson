import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import PublicText from './PublicText';

dayjs.extend(relativeTime);

const DEFAULT_PROFILE_IMAGE = require('../assets/images/default-profile.png');

const ArticleListItem = ({
  index,
  profileImage,
  title,
  content,
  authorName,
  createdAt,
  onPress,
}) => {
  // 프로필 이미지 | 이름
  //            | 날짜
  return (
    <Pressable style={listItemStyles.container(index)}>
      <View style={listItemStyles.profileContainer}>
        <Image
          source={profileImage ? {uri: profileImage} : DEFAULT_PROFILE_IMAGE}
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
  container: index => ({
    paddingTop: index === 0 ? 0 : 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
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
    fontSize: 15,
    fontWeight: '600',
  },
  content: {
    marginTop: 20,
    fontSize: 15,
  },
  contentContainer: {
    marginLeft: 70,
  },
});

export default ArticleListItem;
