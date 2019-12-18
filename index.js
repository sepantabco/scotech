/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import Webview from './libraries/Webview';
import CompleteHomePage from './libraries/HomePage/CompleteHomePage';
import CategoryADs from './libraries/CategoryADs';
import CompeleteMenue from './libraries/CategoryPage/CompeleteMenue';

AppRegistry.registerComponent(appName, () => App);
