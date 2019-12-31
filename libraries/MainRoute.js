import {createStackNavigator,createAppContainer} from 'react-navigation'
import SplashScreen from './SplashScreen'
import StartPage from './StartPage'
import App from '../App'
const MainRoute = createStackNavigator({
    SplashScreen:{
        screen:SplashScreen
    },
    StartPage:{
        screen:StartPage
    },
    App:{
        screen:App
    }
})
export default createAppContainer(MainRoute)