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
    Platform, StyleSheet, Text, View, List, ListItem, FlatList, PermissionsAndroid,
    ScrollView,
    NativeAppEventEmitter,
    NativeEventEmitter,
    NativeModules,
    Navigator,
    AppRegistry,
    Alert,
    Button,
    ImageBackground,
    AsyncStorage,
    Image,
    AppState, TextInput,
    TouchableOpacity
} from 'react-native';
import HeaderView from "./libraries/HeaderView";
import Listinview from "./libraries/Listinview";
import StartPage from "./libraries/StartPage"
import GetPhonenumber from "./libraries/GetPhonenumber"
import Sexselection from "./libraries/Sexselection"
import VerificationPage from './libraries/VerificationPage'
import Confirm_User from './libraries/Confirm_User'
import CompleteMenue from './libraries/CategoryPage/CompeleteMenue'
import UserProfile from './libraries/Profile/UserProfile'
import MiningPage from './libraries/MiningPage/MiningPage'
import CategoryADs from './libraries/CategoryADs/CategoryADs'
import CompleteHomePage from './libraries/HomePage/CompleteHomePage'
import More from './libraries/More'
import ADinfo from './libraries/ADinfo'
import Webview from './libraries/Webview'
import Search from './libraries/Search'
import FooterView from './libraries/FooterViewI'
import ScoreBoards from './libraries/MiningPage/ScoreBoards'
import Medals from './libraries/MiningPage/Medals'
import { createStackNavigator, createAppContainer } from "react-navigation";
import Invitation from './libraries/Invitation/Invitation';
import GameCenterView from './libraries/GameCenter/GameCenterView';
import EventsStatus from './libraries/EventsStatus/EventsStatus';
import LoyalityClubMainPage from './libraries/LoyalityClub/LoyalityClubMainPage';
import ClubPage from './libraries/LoyalityClub/ClubPage'
import { Fragment } from 'react';
import Overlay from 'react-native-modal-overlay';
import AdsArchive from './libraries/Profile/AdsArchive';
import Categories_Data from './libraries/CategoryPage/ImageProfile';
import { P_URL } from "./libraries/PUBLICURLs";
import firebase from 'react-native-firebase';
import type { Notification } from 'react-native-firebase';
var PushNotification = require("react-native-push-notification");

let user = "";
let Bcoin = 0;
let name = "";
let phonenumber = "";
let level = "";

//rest of code will be performing for iOS on background too

class StartSignUp extends React.Component {
    static navigationOptions = {
        headerLeft: null,
        header: null
    };

    render() {
        return (
            <StartPage navigation={this.props.navigation} />
        );
    }
}

class Verify extends React.Component {
    static navigationOptions = {
        headerLeft: null,
        header: null
    };

    render() {
        const { navigation } = this.props;
        const phonenumber = navigation.getParam('phone', '1');
        return (
            <VerificationPage navigation={this.props.navigation} phonenumber={phonenumber} />
        );
    }
}

class SelectSex extends React.Component {
    static navigationOptions = {
        headerLeft: null,
        header: null
    };

    render() {
        return (
            <Sexselection navigation={this.props.navigation} />
        );
    }
}

class ConfirmData extends React.Component {
    static navigationOptions = {
        headerLeft: null,
        header: null
    };

    render() {
        const { navigation } = this.props;
        const sex = navigation.getParam('sex', '1');
        const phonenumber = navigation.getParam('phone', '1');
        return (
            <Confirm_User navigation={this.props.navigation} phone={phonenumber} sex={sex} />
        );
    }
}

class PhonePage extends React.Component {
    static navigationOptions = {
        headerLeft: null,
        header: null
    };

    render() {
        return (
            <GetPhonenumber navigation={this.props.navigation} />
        );
    }
}

// Start App

class WebViewPage extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <HeaderView navigation={navigation} />,
            headerTintColor: '#21C6D4'
        }
    };

    render() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('url', '1');
        return (
            <Webview url={itemId} navigation={this.props.navigation} />
        );
    }
}

class AdvertisementData extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <HeaderView navigation={navigation} />,
            headerLeft: null
        }
    };

    render() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('ad_id', 1);
        return (
            <ADinfo ad_id={itemId} navigation={this.props.navigation} />
        );
    }
}

class MoreData extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <HeaderView navigation={navigation} />,
            headerLeft: null
        }
    };

    render() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('cid', '5');
        console.log(itemId + " cid");
        return (
            <More cid={itemId} navigation={this.props.navigation} />
        );
    }
}

class SearchData extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <HeaderView navigation={navigation} />,
            headerLeft: null
        }
    };

    render() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('indexstr', '5');
        return (
            <Search indexstr={itemId} navigation={this.props.navigation} />
        );
    }
}

class Profile extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <HeaderView navigation={navigation} />,
            headerLeft: null
        }
    };

    render() {
        return (
            <UserProfile navigation={this.props.navigation} />
        );
    }
}

class Mining extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <HeaderView navigation={navigation} />,
            headerLeft: null
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
            headerTitle: <HeaderView navigation={navigation} />,
            headerLeft: null
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
            headerTitle: <HeaderView navigation={navigation} />,
            headerLeft: null
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

    getNotification() {
        console.log(this.state.username + " asdasdasd");
        return fetch(P_URL + 'getNotif?username=' + this.state.username)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ notificationTitle: responseJson.title });
                this.setState({ message: responseJson.message });
                this.setState({ startnotif: responseJson.startnotif });
            })
            .catch((error) => {
                alert.error(error.toString());
            })
            .catch(error => console.log(error.toString()));
    }

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

class Mainpage extends React.Component {
    render() {
        return (
            <View>
                <HeaderView />
                <Listinview />
            </View>
        );
    }
}


const AppNavigator = createStackNavigator({
    Firstpage: FirstPage,
    startsignup: StartSignUp,
    phonepage: PhonePage,
    verificationpage: Verify,
    select_sex: SelectSex,
    confirm_data: ConfirmData,
    category: Categories,
    profile: Profile,
    miningpage: Mining,
    adinfo: AdvertisementData,
    more: MoreData,
    gamecenter: GameCenterView,
    webview: WebViewPage,
    searchdata: SearchData,
    Invitation: Invitation,
    EventsStatus: EventsStatus,
    loyalityClub: LoyalityClubMainPage,
    clubPage: ClubPage,
    AdsArchive: AdsArchive,
    ScoreBoards: ScoreBoards,
    Medals: Medals,
    MiningPage:MiningPage,
    CategoryADs:CategoryADs
}, {
    initialRouteName: 'startsignup',
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
const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
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
        fetch(P_URL + 'set_user_location?username=' + username + '&lon=' + Coords.longitude + '&lat=' + Coords.latitude).then(async response => {
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
        navigator.geolocation.getCurrentPosition((Position) => {
            const Coords = Position.coords;
            if (userCurrentLocation) {
                const storedlong = userCurrentLocation.longitude.toFixed(2)
                const storedlat = userCurrentLocation.latitude.toFixed(2)
                if (Coords.longitude.toFixed(2) === storedlong && Coords.latitude.toFixed(2) === storedlat) {
                    console.log(Coords, 'Coords');
                } else {
                    this._fetchLocation(username, Coords);
                }
            } else {
                this._fetchLocation(username, Coords);
            }
        },
            (error) => {
                console.log("location problem " + error)
            },
            { enableHighAccuracy: true, timeout: 1000, maximumAge: 10000 }
        )
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

    componentDidMount() {
        this.setState({ isPageOnLoading: false });
        this.getCurrentLocation()
        this._getToken()
        this._notificationInForeGround()


        //            fetch('https://parsbeacon.ir/requests/getNotif?username=')
        //                .then((response) => response.json()
        //                    .then((responseJson) => {
        //                        if(responseJson.startnotif == true){
        //                            PushNotification.localNotification({
        //                                title: responseJson.title,
        //                                message: responseJson.message,
        //                        });
        //                        }
        //                    }, function () {
        //                    }).catch((error) => {Alert.alert(error)})
        //                ).catch((error) => {
        //                Alert.alert(error)
        //            });
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
