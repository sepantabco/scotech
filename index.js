/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import { AppRegistry, YellowBox,I18nManager } from 'react-native';
console.disableYellowBox=true
I18nManager.allowRTL(false);
I18nManager.forceRTL(false)
import { name as appName } from './app.json';
import MainRoute from './libraries/MainRoute';

AppRegistry.registerComponent(appName, () =>MainRoute); 
