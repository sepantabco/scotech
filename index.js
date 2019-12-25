/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import { AppRegistry, YellowBox } from 'react-native';
console.disableYellowBox=true
import App from './App';
import { name as appName } from './app.json';
import GroupOffer from './libraries/CategoryADs/components/GroupOffer';
import GroupADs from './libraries/GroupADs/GroupADs';
import CategoryADs from './libraries/CategoryADs/CategoryADs';
import CompleteHomePage from './libraries/HomePage/CompleteHomePage';
import LoyalityClubMainPage from './libraries/LoyalityClub/LoyalityClubMainPage';
AppRegistry.registerComponent(appName, () => App); 
