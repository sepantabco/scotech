/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import { AppRegistry, YellowBox,I18nManager } from 'react-native';
console.disableYellowBox=true
import App from './App';
import { name as appName } from './app.json';
import StartPage from './libraries/StartPage';
import MainRoute from './libraries/MainRoute';
import SplashScreen from './libraries/SplashScreen';
import Search from './libraries/Search';
I18nManager.allowRTL(false);
I18nManager.forceRTL(false)

AppRegistry.registerComponent(appName, () =>MainRoute); 
