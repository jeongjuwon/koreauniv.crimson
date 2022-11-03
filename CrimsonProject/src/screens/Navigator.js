/**
 * Sample React Native Navigator
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {RecoilRoot, useRecoilState} from 'recoil';
import RNBootSplash from 'react-native-bootsplash';
import ClubHomeHeader from '../components/ClubHomeHeader';

import ClubHomeScreen from './ClubHomeScreen';
import ClubJoinScreen from './ClubJoinScreen';
import ClubListScreen from './ClubListScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import ViewArticleScreen from './ViewArticleScreen';
import WriteArticleScreen from './WriteArticleScreen';
import tokenState from '../states/atoms/tokenState';
import ViewArticleHeader from '../components/ViewArticleHeader';
import FullScreenLoadingIndicator from '../components/FullScreenLoadingIndicator';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tokenStateValue, setTokenState] = useRecoilState(tokenState);
  const [clubId, setClubId] = useState('');

  useEffect(() => {
    async function init() {
      const token = await AsyncStorage.getItem('token');
      setTokenState(token);
      setIsLoading(false);
    }
    init();
  }, [setTokenState]);

  const onReady = useCallback(() => {
    RNBootSplash.hide();
  }, []);

  if (isLoading) {
    return <FullScreenLoadingIndicator size={20} color={'#ccc'} />;
  }

  return (
    <NavigationContainer onReady={onReady}>
      <Stack.Navigator
        initialRouteName={tokenStateValue ? 'ClubList' : 'SignIn'}>
        {tokenStateValue ? (
          <>
            <Stack.Screen
              name="ClubList"
              component={ClubListScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ClubHome"
              component={ClubHomeScreen}
              options={{
                headerShown: true,
                header: () => <ClubHomeHeader clubId={clubId} />,
              }}
            />
            <Stack.Screen
              name="ClubJoin"
              component={ClubJoinScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="WriteArticle"
              component={WriteArticleScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ViewArticle"
              component={ViewArticleScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
