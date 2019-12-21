/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import { AppRegistry, YellowBox } from 'react-native';
console.disableYellowBox=true
import App from './App';
import { name as appName } from './app.json';
import GroupOffer from './libraries/CategoryADs/components/GroupOffer';
AppRegistry.registerComponent(appName, () => App); 
