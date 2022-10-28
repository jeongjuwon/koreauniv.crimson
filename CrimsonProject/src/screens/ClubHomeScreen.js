import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ClubListItem from '../components/ClubListItem';
import PublicText from '../components/PublicText';
import ScreenContainer from '../components/ScreenContainer';

dayjs.extend(relativeTime);

const articles = [
  {
    id: 10,
    title: '제목입니다!!',
    content: '내용을 입력했습니다!!',
    authorName: 'boiledegg',
    createdAt: new Date(),
  },
  {
    id: 9,
    title: '제목입니다!!',
    content: '내용을 입력했습니다!!',
    authorName: 'boiledegg',
    createdAt: new Date(),
  },
  {
    id: 8,
    title: '제목입니다!!',
    content: '내용을 입력했습니다!!',
    authorName: 'boiledegg',
    createdAt: new Date(),
  },
  {
    id: 7,
    title: '제목입니다!!',
    content: '내용을 입력했습니다!!',
    authorName: 'boiledegg',
    createdAt: new Date(),
  },
  {
    id: 6,
    title: '제목입니다!!',
    content: '내용을 입력했습니다!!',
    authorName: 'boiledegg',
    createdAt: new Date(),
  },
  {
    id: 5,
    title: '제목입니다!!',
    content: '내용을 입력했습니다!!',
    authorName: 'boiledegg',
    createdAt: new Date(),
  },
  {
    id: 4,
    title: '제목입니다!!',
    content: '내용을 입력했습니다!!',
    authorName: 'boiledegg',
    createdAt: new Date(),
  },
  {
    id: 3,
    title: '제목입니다!!',
    content: '내용을 입력했습니다!!',
    authorName: 'boiledegg',
    createdAt: new Date(),
  },
  {
    id: 2,
    title: '제목입니다!!',
    content: '내용을 입력했습니다!!',
    authorName: 'boiledegg',
    createdAt: new Date(),
  },
  {
    id: 1,
    title: '제목입니다!!',
    content: '내용을 입력했습니다!!',
    authorName: 'boiledegg',
    createdAt: new Date(),
  },
];

const DEFAULT_PROFILE_IMAGE = require('../assets/images/default-profile.png');

const ListItem = ({
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
    </Pressable>
  );
};

const ListHeaderComponent = props => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        headerComponentStyle.container,
        {
          marginTop: 200 + insets.top,
        },
      ]}
    />
  );
};

const ClubHomeScreen = props => {
  return (
    <ScreenContainer>
      <ClubListItem
        name="학생회"
        image="/images/student_council.jpg"
        style={styles.clubListItem}
      />
      <FlatList
        data={articles}
        ListHeaderComponent={ListHeaderComponent}
        style={styles.flatList}
        renderItem={({item, index}) => {
          return (
            <ListItem
              index={index}
              authorName={item.authorName}
              title={item.title}
              content={item.content}
              createdAt={item.createdAt}
            />
          );
        }}
      />
    </ScreenContainer>
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
});

const headerComponentStyle = StyleSheet.create({
  container: {
    height: 30,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

const styles = StyleSheet.create({
  clubListItem: {
    borderRadius: 0,
  },
  flatList: {
    borderWidth: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ClubHomeScreen;
