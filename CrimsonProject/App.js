/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';

import ClubHomeScreen from './src/screens/ClubHomeScreen';
import ClubJoinScreen from './src/screens/ClubJoinScreen';
import ClubListScreen from './src/screens/ClubListScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ViewArticleScreen from './src/screens/ViewArticleScreen';
import WriteArticleScreen from './src/screens/WriteArticleScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [userToken, setUserToken] = useState(null);

  const saveUserToken = useCallback(async token => {
    // async storage에 저장
    await AsyncStorage.setItem('token', token);
    setUserToken(token);
  }, []);

  useEffect(() => {
    async function init() {
      const token = await AsyncStorage.getItem('token');
      setUserToken(token);
    }
    init();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={userToken ? 'ClubList' : 'SignIn'}>
        {userToken ? (
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
                headerShown: false,
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
                headerTitle: '글보기',
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
              initialParams={{
                saveUserToken,
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

export default App;
