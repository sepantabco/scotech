/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import { AppRegistry, YellowBox,I18nManager, Rn} from 'react-native';
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);
console.disableYellowBox=true
<<<<<<< HEAD
import App from './App';
import { name as appName } from './app.json';
import StartPage from './libraries/StartPage';
import MainRoute from './libraries/MainRoute';
import SplashScreen from './libraries/SplashScreen';
import Search from './libraries/Search';
import Webview from './libraries/Webview';

=======
I18nManager.allowRTL(false);
I18nManager.forceRTL(false)
import { name as appName } from './app.json';
import MainRoute from './libraries/MainRoute';
>>>>>>> refs/remotes/origin/master

AppRegistry.registerComponent(appName, () =>MainRoute); 
