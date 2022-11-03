import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useRecoilValue} from 'recoil';
import CommentListItem from '../components/CommentListItem';
import FullScreenLoadingIndicator from '../components/FullScreenLoadingIndicator';
import ScreenContainer from '../components/ScreenContainer';
import ViewArticle from '../components/ViewArticle';
import ViewArticleHeader from '../components/ViewArticleHeader';
import WriteCommentInput from '../components/WriteCommentInput';
import tokenState from '../states/atoms/tokenState';

const ViewArticleScreen = ({navigation, route}) => {
  const {articleId, clubId, profile, initArticles} = route.params;
  const tokenStateValue = useRecoilValue(tokenState);
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);

  useFocusEffect(
    useCallback(() => {
      async function init() {
        try {
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
          console.log('json', json);
          setArticle(json);
        } catch (e) {
          console.log(e);
        }
      }
      init();
    }, [articleId, tokenStateValue]),
  );

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

  const onDelete = useCallback(() => {
    initComment();
  }, [initComment]);

  const renderItem = useCallback(({item}) => {
    return <CommentListItem item={item} />;
  }, []);

  if (!article) {
    return <FullScreenLoadingIndicator color="#ccc" size={40} />;
  }

  return (
    <>
      <ViewArticleHeader
        articleId={articleId}
        clubId={clubId}
        initArticles={initArticles}
      />
      <ScreenContainer style={{backgroundColor: '#fff'}}>
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
          onDelete={onDelete}
        />
      </ScreenContainer>
    </>
  );
};

const flatListStyles = StyleSheet.create({
  flatList: {
    backgroundColor: '#fff',
    padding: 10,
  },
});

export default ViewArticleScreen;
