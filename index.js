/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import Leagues from './libraries/MiningPage/Leagues';
import MiningPage from './libraries/MiningPage/MiningPage';
import Medals from './libraries/MiningPage/Medals';
import ScoreBoards from './libraries/MiningPage/ScoreBoards';
import Help from './libraries/MiningPage/help';
AppRegistry.registerComponent(appName, () => App);
