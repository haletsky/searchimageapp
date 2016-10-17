/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import App from './components'

export default class testwork2 extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('testwork2', () => testwork2);
