import React from 'react';
import {StyleSheet, View} from 'react-native';
import PublicText from './PublicText';

import dayjs from 'dayjs';
import ProfileImage from './ProfileImage';

const ViewArticle = ({article}) => {
  return (
    <>
      <View style={styles.profileContainer}>
        <ProfileImage size={70} />
        <View style={styles.profileNameContainer}>
          <PublicText style={styles.profileName}>
            {article.profile ? article.profile.name : '-'}
          </PublicText>
          <PublicText>{dayjs().fromNow(dayjs(article.createdAt))}</PublicText>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <PublicText style={styles.title}>{article.title}</PublicText>
        <PublicText style={styles.content}>{article.content}</PublicText>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  profileContainer: {
    flexDirection: 'row',
  },
  profileNameContainer: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  profileName: {
    fontSize: 20,
    marginBottom: 10,
  },
  contentContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    marginTop: 20,
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  content: {
    fontSize: 20,
  },
});

export default ViewArticle;
