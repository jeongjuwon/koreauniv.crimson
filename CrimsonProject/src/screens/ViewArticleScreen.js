import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Image, ScrollView, FlatList} from 'react-native';
import PublicText from '../components/PublicText';
import ScreenContainer from '../components/ScreenContainer';
import dayjs from 'dayjs';
import WriteCommentInput from '../components/WriteCommentInput';
import ViewArticle from '../components/ViewArticle';
import ProfileImage from '../components/ProfileImage';

const ViewArticleScreen = ({navigation, route}) => {
  const {articleId, profile} = route.params;
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function init() {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(
          `http://localhost:3000/article/${articleId}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const json = await response.json();
        console.log(json);
        setArticle(json);
      } catch (e) {
        console.log(e);
      }
    }
    init();
  }, [articleId]);

  const initComment = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(
        `http://localhost:3000/comments/${articleId}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const json = await response.json();
      console.log(json);
      setComments(json);
    } catch (e) {
      console.log(e);
    }
  }, [articleId]);

  useEffect(() => {
    initComment();
  }, [initComment]);

  const onSave = useCallback(() => {
    initComment();
  }, [initComment]);

  const renderItem = useCallback(({item}) => {
    return (
      <View style={listItemStyles.container}>
        <View style={listItemStyles.profileContainer}>
          <ProfileImage size={30} style={listItemStyles.profileImage} />
          <PublicText style={listItemStyles.profileName}>
            {item.profile.name}
          </PublicText>
        </View>
        <View style={listItemStyles.contentContainer}>
          <PublicText style={listItemStyles.content}>
            {item.content || '내용이 없습니다.'}
          </PublicText>
        </View>
      </View>
    );
  }, []);

  return (
    <ScreenContainer style={{borderWidth: 0}}>
      <FlatList
        ListHeaderComponent={<ViewArticle article={article} />}
        data={comments}
        style={flatListStyles.flatList}
        renderItem={renderItem}
        contentInset={{
          bottom: 20,
        }}
      />
      <WriteCommentInput
        articleId={articleId}
        profile={profile}
        onSave={onSave}
      />
    </ScreenContainer>
  );
};

const listItemStyles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.2,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    marginRight: 20,
  },
  contentContainer: {
    marginLeft: 50,
  },
  content: {
    fontSize: 20,
  },
});

const flatListStyles = StyleSheet.create({
  flatList: {
    backgroundColor: '#fff',
    padding: 10,
  },
});

export default ViewArticleScreen;
