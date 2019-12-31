import { createStackNavigator, createAppContainer, createDrawerNavigator } from "react-navigation";

import StartPage from "./libraries/StartPage"
import SplashScreen from './libraries/SplashScreen';
import App from "./App";
const MainRoute = createStackNavigator = ({
    SplashScreen: {
        screen: SplashScreen
    },
    StartPage: {
        screen: StartPage
    }

})
export default createAppContainer(MainRoute)
