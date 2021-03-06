/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import {
    StyleSheet, Text, View, List, ListItem, FlatList,
    ScrollView,
    PermissionsAndroid,
    Platform,
    Alert,
    AsyncStorage,
    Image,
    AppState, TextInput,
    TouchableOpacity
} from 'react-native';
import Geolocation from 'react-native-geolocation-service'
// import Listinview from "./libraries/Listinview";
import StartPage from "./libraries/StartPage"
// import GetPhonenumber from "./libraries/GetPhonenumber"
// import Sexselection from "./libraries/Sexselection"
// import VerificationPage from './libraries/VerificationPage'
// import Confirm_User from './libraries/Confirm_User'
import CompleteMenue from './libraries/CategoryPage/CompeleteMenue'
// import UserProfile from './libraries/Profile/UserProfile'
import MiningPage from './libraries/MiningPage/MiningPage'
import CategoryADs from './libraries/CategoryADs/CategoryADs'
import CompleteHomePage from './libraries/HomePage/CompleteHomePage'
import More from './libraries/More'
import Webview from './libraries/Webview'
// import Search from './l  ibraries/Search'
import FooterView from './libraries/FooterViewI'
import ScoreBoards from './libraries/MiningPage/ScoreBoards'
import Medals from './libraries/MiningPage/Medals'
import { createStackNavigator, createAppContainer, createDrawerNavigator } from "react-navigation";
import Invitation from './libraries/Invitation/Invitation';
import GameCenterView from './libraries/GameCenter/GameCenterView';
import EventsStatus from './libraries/EventsStatus/EventsStatus';
import LoyalityClubMainPage from './libraries/LoyalityClub/LoyalityClubMainPage';
import ClubPage from './libraries/LoyalityClub/ClubPage'
import { Fragment } from 'react';
import Overlay from 'react-native-modal-overlay';
import AdsArchive from './libraries/Profile/AdsArchive';
import Categories_Data from './libraries/CategoryPage/ImageProfile';
import { P_URL, L_URL } from "./libraries/PUBLICURLs";
import get_key from "./libraries/Auth";
import firebase from 'react-native-firebase';
import type, { Notification } from 'react-native-firebase';
import FirstPageHeader from './libraries/Headers/FirstPageHeader';
import MiningPageHeader from './libraries/Headers/MiningPageHeader';
import CompeleteMenueHeader from './libraries/Headers/CompeleteMenueHeader';
import GroupADs from './libraries/GroupADs/GroupADs';
import SlideMenu from './SlideMenu';
import ShowAll from './libraries/ShowAll'
import SplashScreen from './libraries/SplashScreen';
import Search from './libraries/Search'
import Guide from './libraries/Guide';
import FAQ from './libraries/FAQ';
import GamesWebView from './libraries/GamesWebView';
// import WebViewHeader from './libraries/Headers/WebViewHeader';
var PushNotification = require("react-native-push-notification");


// class WebViewPage extends Component {
//     static navigationOptions = ({ navigation }) => {
//         return {
//             headerTitle: <WebViewHeader navigation={navigation} />,
//             headerTintColor: '#573c65'
//         }
//     };

//     render() {
//         const { navigation } = this.props;
//         const itemId = navigation.getParam('url', '1');
//         return (
//             <Webview url={itemId} navigation={this.props.navigation} />
//         );
//     }
// }

// class AdvertisementData extends React.Component {
//     static navigationOptions = ({ navigation }) => {
//         return {
//             headerTitle: <HeaderView navigation={navigation} />,
//             headerLeft: null
//         }
//     };

//     render() {
//         const { navigation } = this.props;
//         const itemId = navigation.getParam('ad_id', 1);
//         return (
//             <ADinfo ad_id={itemId} navigation={this.props.navigation} />
//         );
//     }
// }




class Mining extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <MiningPageHeader navigation={navigation} />,
            headerLeft: null,
            headerStyle: {
                backgroundColor: '#573c65',
            }
        }
    };

    render() {
        return (
            <MiningPage navigation={this.props.navigation} />
        );
    }
}


class Categories extends React.Component {
    constructor() {
        super();
        this.state = {
            search_text: ""
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <CompeleteMenueHeader navigation={navigation} />,
            headerLeft: null,
            headerStyle: {
                backgroundColor: '#573c65',
            }
        }
    };

    render() {
        return (
            <View style={{ flex: 1 }}>


                <View style={{ flex: 1 }}>
                    <CompleteMenue Categories_Data={Categories_Data} navigation={this.props.navigation} />
                </View>


                <View>
                    <FooterView menu={2} navigation={this.props.navigation} />

                </View>
            </View>
        );
    }
}

class FirstPage extends React.Component {

    constructor() {
        super();
        this.state = {
            notificationTitle: '',
            message: '',
            startnotif: false,
            username: '',
        }
    }

    async getUsername() {
        try {
            let token = await AsyncStorage.getItem('username');
            return token;
        } catch (error) {
            Alert.alert(error.toString());
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <FirstPageHeader navigation={navigation} />,
            headerLeft: null,
            headerStyle: {
                backgroundColor: '#573c65',
            }
        }
    };

    _setUsername(username) {
        this.setState({ username: username })
    }

    async componentWillMount() {
        const username = await this.getUsername();
        console.log(username);
        this._setUsername(username);
        this.getNotification();
    }

    onClose = () => this.setState({ startnotif: false });

   

    render() {
        return (
            <View style={{ flex: 3, flexDirection: 'column' }}>
                <Overlay visible={this.state.startnotif} onClose={this.onClose} closeOnTouchOutside
                    animationType="zoomIn"
                    childrenWrapperStyle={{ backgroundColor: '#DDDDDD' }}
                    animationDuration={500}>
                    {
                        (hideModal, overlayState) => (
                            <Fragment>
                                <Text style={[styles.paragraph, { fontSize: 30 }]}>{this.state.notificationTitle}</Text>
                                <Text style={styles.paragraph}>{this.state.message}</Text>
                                <Text onPress={hideModal} style={[styles.paragraph, { color: "#4AAED1" }]}>بستن</Text>
                            </Fragment>
                        )
                    }
                </Overlay>
                <ScrollView>
                    <CompleteHomePage navigation={this.props.navigation} />
                </ScrollView>
                <FooterView menu={1} navigation={this.props.navigation} />
            </View>
        );
    }
}

// class Mainpage extends React.Component {
//     render() {
//         return (
//             <View>
//                 <HeaderView />
//                 <Listinview />
//             </View>
//         );
//     }
// }


const AppNavigator = createStackNavigator({
    Firstpage: FirstPage,
    Search:Search,
    SplashScreen: SplashScreen,    
    StartPage: StartPage,
    category: Categories,
    // profile: Profile,
    miningpage: Mining,
    // adinfo: AdvertisementData,
    // more: MoreData,
    gamecenter: GameCenterView,
    webview: Webview,
    // searchdata: SearchData,
    Invitation: Invitation,
    EventsStatus: EventsStatus,
    LoyalityClubMainPage: LoyalityClubMainPage,
    clubPage: ClubPage,
    AdsArchive: AdsArchive,
    ScoreBoards: ScoreBoards,
    Medals: Medals,
    MiningPage: MiningPage,
    CategoryADs: CategoryADs,
    GroupADs: GroupADs,
    ShowAll: ShowAll,
    Guide:Guide,
    FAQ:FAQ,
    GamesWebView:GamesWebView
}, {
    // initialRouteName: 'FirstPage',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#f8f8f8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
}
);
const DrawerNav = createDrawerNavigator({
    AppNavigator: {
        screen: AppNavigator
    }
}, {
    drawerPosition: 'right',
    drawerWidth: 240,
    drawerType: 'front',
    overlayColor: 'rgba(0, 0, 0, 0.7)',
    contentComponent: ({ navigation }) => (
        <SlideMenu navigation={navigation} />
    )

}
)
const AppContainer = createAppContainer(DrawerNav);
export default class App extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    };

    async getUsername() {
        try {
            let token = await AsyncStorage.getItem('username');
            return token;
        } catch (error) {
            Alert.alert(error.toString());
        }
    }

    constructor(props) {
        super();
        this.state = {
            peripherals: new Map(),
            title: "hello",
            isPageOnLoading: true,
            scanning: true,
            notifID: null,

        };
    }
    _fetchLocation(username, Coords) {
        fetch(P_URL + 'set_user_location?username=' + username + '&lon=' + Coords.longitude + '&lat=' + Coords.latitude ,
        {headers: {Authorization: get_key()}}).then(async response => {
            console.log("server response " + response);
            console.log(Coords, 'Crooods')
            this._setUserLocation(JSON.stringify(Coords));
        })
    }
    async _setUserLocation(coords) {
        try {
            await AsyncStorage.setItem('userCurrentLocation', coords);
        } catch (error) {
            console.log(error)
        }
    }
    async _getUserLocation() {
        try {
            let userCurrentLocation = await AsyncStorage.getItem('userCurrentLocation');
            userCurrentLocation = JSON.parse(userCurrentLocation)
            return userCurrentLocation
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async getCurrentLocation() {
        const username = await this.getUsername();
        const userCurrentLocation = await this._getUserLocation();
        Geolocation.getCurrentPosition((Position) => {
            const Coords = Position.coords;
            console.log(Coords);
            if (userCurrentLocation) {
                const storedlong = userCurrentLocation.longitude.toFixed(2)
                const storedlat = userCurrentLocation.latitude.toFixed(2)
                if (Coords.longitude.toFixed(2) === storedlong && Coords.latitude.toFixed(2) === storedlat) {
                } else {
                    console.log("changed ")
                    this._fetchLocation(username, Coords);
                }
            } else {
                this._fetchLocation(username, Coords);
            }
        });
        if (Platform.OS === 'android') {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                if (result) {
                    console.log("Permission is OK");
                } else {
                    PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                        if (result) {
                            console.log("User accept");
                        } else {
                            console.log("User refuse");
                        }
                    });
                }
            });
        }

    }
    _getToken() {
        firebase.messaging().getToken()
            .then(fcmToken => {
                if (fcmToken) {

                    console.log(fcmToken)
                } else {
                    // user doesn't have a device token yet
                }
            });
    }
    _pushNotification(title, message) {
        PushNotification.localNotification({
            /* Android Only Properties */
            autoCancel: true, // (optional) default: true
            title: title,
            message: message,
            subText: "This is a subText", // (optional) default: none
            color: "red", // (optional) default: system default
            priority: "high", // (optional) set notification priority, default: high
            visibility: "private", // (optional) set notification visibility, default: private
            importance: "high", // (optional) set notification importance, default: high

        });
    }
    _notificationInForeGround() {
        firebase.notifications().onNotification((notification: Notification) => {
            this._pushNotification(notification.title, notification.body)
            console.log(notification.title, notification.body)

        })
    }
    async getToken() {
        try {
            let token = await AsyncStorage.getItem('loyality_token');
            if (token == '' || token == null)
                return '';
            return token;
        } catch (error) {
            return '';
        }
    }
    
    componentDidMount() {
        this.setState({ isPageOnLoading: false });
        this.getCurrentLocation()
        // if (!this.state.user) { this.getCurrentLocation() }
        this._getToken()
        this._notificationInForeGround();


    }

    render() {
        return (
            <AppContainer />
        );
    }
}

const styles = StyleSheet.create({
    footerViews: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    scroll: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    paragraph: {
        color: '#460000',
        margin: 8,
        fontSize: 20,
        fontFamily: 'IRANSansMobile',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
