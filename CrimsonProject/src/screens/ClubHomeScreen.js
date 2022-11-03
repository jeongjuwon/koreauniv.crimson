import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, useWindowDimensions, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import ArticleListItem from '../components/ArticleListItem';
import ClubListItem from '../components/ClubListItem';
import FAB from '../components/FAB';
import PublicText from '../components/PublicText';
import ScreenContainer from '../components/ScreenContainer';

dayjs.extend(relativeTime);
const COVER_IMAGE_HEIGHT = 200;

const ListHeaderComponent = props => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        headerComponentStyle.container,
        {
          marginTop: COVER_IMAGE_HEIGHT + insets.top,
        },
      ]}
    />
  );
};

const ListEmptyComponent = props => {
  const window = useWindowDimensions();

  const height = window.height - COVER_IMAGE_HEIGHT;

  return (
    <View style={[emptyComponentStyle.container(height)]}>
      <PublicText style={emptyComponentStyle.title}>
        등록된 게시물이 없습니다.
      </PublicText>
    </View>
  );
};

const ClubHomeScreen = ({navigation, route}) => {
  const {clubId, profile} = route.params;
  const keyExtractor = useCallback(item => item.id, []);
  const inset = useSafeAreaInsets();

  // 초기값 articles: []
  // const articles = [
  //   {
  //     id: 1,
  //     title: '제목입니다!!',
  //     content: '내용을 입력했습니다!!',
  //     authorName: 'boiledegg',
  //     createdAt: new Date(),
  //   },
  // ];
  const [articles, setArticles] = useState([]);

  const initArticles = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/articles/${clubId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      console.log(json);
      setArticles(json);
    } catch (e) {
      console.log(e);
    }
  }, [clubId]);

  // 홈이 로드되었을때 api 호출
  useEffect(() => {
    initArticles();
  }, [clubId, initArticles]);

  const onPressArticle = useCallback(
    articleId => () => {
      navigation.navigate('ViewArticle', {
        clubId,
        articleId,
        profile,
        initArticles,
      });
    },
    [clubId, initArticles, navigation, profile],
  );

  return (
    <ScreenContainer style={{backgroundColor: '#fff'}}>
      <ClubListItem
        name="학생회"
        image="/images/student_council.jpg"
        style={styles.clubListItem}
      />
      <FlatList
        data={articles}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        style={styles.flatList}
        renderItem={({item, index}) => {
          return (
            <ArticleListItem
              paddingBottom={articles.length - 1 === index ? inset.bottom : 0}
              index={index}
              authorName={item.profile.name}
              profileImage={item.profile.image}
              title={item.title}
              content={item.content}
              createdAt={item.createdAt}
              onPressArticle={onPressArticle(item.id)}
            />
          );
        }}
      />
      {/* float Action Button */}
      <FAB clubId={clubId} initArticles={initArticles} />
    </ScreenContainer>
  );
};

const headerComponentStyle = StyleSheet.create({
  container: {
    height: 30,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

const emptyComponentStyle = StyleSheet.create({
  container: height => ({
    height,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  title: {
    fontSize: 15,
    fontWeight: '700',
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
