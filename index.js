/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import CompeleteMenue from './libraries/CategoryPage/CompeleteMenue';
import CategoryADs from './libraries/CategoryADs/CategoryADs';
import Webview from './libraries/Webview';

AppRegistry.registerComponent(appName, () => App); 
