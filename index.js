/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Leagues from './libraries/MiningPage/Leagues';
AppRegistry.registerComponent(appName, () =>Leagues);
