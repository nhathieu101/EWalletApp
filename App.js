/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import EnterNumber from './src/screens/EnterNumber'
import Main from './src/navigators'
import { Provider } from 'react-redux'
import store from './src/stores'
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
