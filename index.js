/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import { AppRegistry, YellowBox,I18nManager, Rn} from 'react-native';
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);
console.disableYellowBox=true
import { name as appName } from './app.json';
import MainRoute from './libraries/MainRoute';
import GamesWebView from './libraries/GamesWebView.js';

AppRegistry.registerComponent(appName, () =>MainRoute); 
