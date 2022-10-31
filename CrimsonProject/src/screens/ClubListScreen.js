import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet } from 'react-native';

import PublicText from '../components/PublicText';
import ScreenContainer from '../components/ScreenContainer';

// image ex) "/images/student_council.jpg"
const ClubListItem = ({image, name, onPress}) => {
  return (
    <Pressable style={listItemStyle.container} onPress={onPress}>
      <ImageBackground
        source={{uri: `http://localhost:3000${image}`}}
        style={listItemStyle.image}>
        <PublicText style={listItemStyle.clubName}>{name}</PublicText>
      </ImageBackground>
    </Pressable>
  );
};

const ClubListScreen = ({navigation, route}) => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    async function init() {
      const response = await fetch('http://localhost:3000/clubs', {
        method: 'GET',
      });
      const json = await response.json();
      // console.log(json);
      setClubs(json);
    }
    init();
  }, []);

  const onPressClub = useCallback(
    clubId => async () => {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(
        `http://localhost:3000/profile?clubId=${clubId}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const profile = await response.json();

      console.log('profile', profile);
      // {"id": null}

      if (!profile.id) {
        navigation.navigate('ClubJoin', {
          clubId,
        });
      } else {
        navigation.navigate('ClubHome', {
          clubId,
        });
      }
    },
    [navigation],
  );

  return (
    <ScreenContainer>
      <ScrollView style={styles.scrollView}>
        {clubs.map(club => {
          return (
            <ClubListItem
              key={club.id}
              name={club.name}
              image={club.image}
              onPress={onPressClub(club.id)}
            />
          );
        })}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 20,
  },
});

const listItemStyle = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  clubName: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '600',
  },
  image: {
    alignSelf: 'stretch',
    height: 200,
    padding: 20,
  },
});

export default ClubListScreen;
