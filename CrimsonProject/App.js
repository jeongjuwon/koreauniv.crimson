/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {RecoilRoot} from 'recoil';

import Navigator from './src/screens/Navigator';

const App = () => {
  return (
    <RecoilRoot>
      <Navigator />
    </RecoilRoot>
  );
};

export default App;
