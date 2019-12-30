/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import { AppRegistry, YellowBox } from 'react-native';
console.disableYellowBox=true
import App from './App';
import { name as appName } from './app.json';
import StartPage from './libraries/StartPage';

AppRegistry.registerComponent(appName, () =>StartPage); 
