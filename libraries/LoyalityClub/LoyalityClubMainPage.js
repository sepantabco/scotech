import * as React from 'react';
import {
    Alert,
    AsyncStorage,
    Image,
    ImageBackground,
    NativeEventEmitter,
    NativeModules,
    PermissionsAndroid,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    Textarea,
    FlatList,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    View,
} from 'react-native';
import { Card } from 'react-native-paper';
import HeaderView from "../HeaderView";
import Icon from 'react-native-ionicons';
import get_key from "../Auth";
import Overlay from 'react-native-modal-overlay';
import CountdownCircle from 'react-native-countdown-circle'
import FooterViewI from "../FooterViewI";
import BleManager from "react-native-ble-manager";
import { BluetoothStatus } from 'react-native-bluetooth-status';
import { P_URL } from "../PUBLICURLs";
import LoyalityClubMainPageHeader from '../Headers/LoyalityClubMainPageHeader';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
export default class LoyalityClubMainPage extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            clubs: [],
            clubs_copy: [],
            loaded: false,
            modalVisible: false,
            beaconfind: false,
            peripherals_array: [],
            beacon_clubs: [],
            message_to_search: 'در حال جست و جو ...'
        };
        this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
        this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
        this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <LoyalityClubMainPageHeader navigation={navigation} />,
            headerLeft: null,
            headerStyle: {
                backgroundColor: '#573c65',
            }
        }
    };


    search_item(value) {
        this.setState({ clubs: [] });
        let related_ads = [];
        this.state.clubs_copy.map(item => {
            if (item.shopname.includes(value))
                related_ads.push(item)
        });
        this.setState({ clubs: related_ads });
    }

    search_ends() {
        this.setState({ clubs: this.state.clubs_copy })
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    async getUsername() {
        try {
            let token = await AsyncStorage.getItem('username');
            return token;
        } catch (error) {
            Alert.alert(error.toString());
        }
    }

    _setUsername(user) {
        this.setState({ username: user });
    }

    _setClub(club) {
        this.setState({ clubs: club, clubs_copy: club });
        this.setState({ loaded: true });
    }

    // ble methods
    handleDisconnectedPeripheral(data) {
        let peripherals = this.state.peripherals;
        let peripheral = peripherals.get(data.peripheral);
        if (peripheral) {
            peripheral.connected = false;
            peripherals.set(peripheral.id, peripheral);
            this.setState({ peripherals });
        }
        console.log('Disconnected from ' + data.peripheral);
    }

    handleUpdateValueForCharacteristic(data) {
        console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
    }

    handleDiscoverPeripheral(peripheral) {
        let go_next = false;
        console.log(peripheral);
        for (var prop in peripheral) {
            if (prop === 'id')
                go_next = true
        }
        if (go_next && !(this.state.peripherals_array.filter(p => p === peripheral.id).length > 0)) {
            fetch(P_URL + 'add_beacon_user?macAD=' + peripheral.id + '&username=' + this.state.username, { headers: { Authorization: get_key() } }).then(response => {
                response.json().then(responseJson => {
                    if (responseJson.status === 0)
                        return 0;
                    //////////////////setModelVisible -> true //////////////////////
                    this.setState({ shopID: responseJson.shopID });
                    this.state.beacon_clubs.push(responseJson);
                    ////////////////////////////////////////////////////////////////
                    fetch(P_URL + 'get_user_clubs?username=' + this.state.username, { headers: { Authorization: get_key() } }).then(response => {
                        response.json().then(responseJson => {
                            this._setClub(responseJson);
                        });
                    });
                });
            });
            this.state.peripherals_array.push(peripheral.id);
            this.setState({ peripherals_array: this.state.peripherals_array });
        }

    }

    startScan(value) {
        this.setState({ modalVisible: true });
        BleManager.scan(['feaa', 'FEAA'], 20, false);
    }

    async checkInitialBluetoothState() {
        const isEnabled = await BluetoothStatus.state();
        if (isEnabled == false)
            Alert.alert(
                'نیاز به دسترسی',
                'لطفا بلوتوث خود را روشن کنید'
            );
    }

    async componentDidMount() {
        await this.checkInitialBluetoothState();
        BleManager.start({ showAlert: false });
        this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral);
        this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral);
        this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic);
        const username = await this.getUsername();
        this._setUsername(username);
        fetch(P_URL + 'get_user_clubs?username=' + this.state.username, { headers: { Authorization: get_key() } }).then(response => {
            response.json().then(responseJson => {
                this._setClub(responseJson);
            });
        });
        const didFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
                fetch(P_URL + 'get_user_clubs?username=' + this.state.username, { headers: { Authorization: get_key() } }).then(response => {
                    response.json().then(responseJson => {
                        this._setClub(responseJson);
                    });
                });
            }
        );
        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                    console.log("Permission is OK");
                } else {
                    PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
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
    onClose = () => { this.setState({ modalVisible: false, beacon_clubs: [], peripherals_array: [] }); };
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F3F3' }}>
                <ScrollView>
                    <Overlay visible={this.state.modalVisible} onClose={this.onClose} closeOnTouchOutside
                        animationType="zoomIn"
                        childrenWrapperStyle={{ backgroundColor: '#DDDDDD' }}
                        animationDuration={500}>
                        {
                            (hideModal, overlayState) => (
                                <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginBottom: 20,
                                        borderRadius: 20,
                                        overflow: 'hidden',
                                        backgroundColor: '#40C4FF',
                                        width: '100%',
                                        padding: 10,
                                    }}>
                                        <Text style={{ fontSize: 18, color: 'white' }}>{this.state.message_to_search}</Text>
                                        <CountdownCircle
                                            seconds={20}
                                            radius={30}
                                            borderWidth={8}
                                            color="#ff003f"
                                            bgColor="#fff"
                                            textStyle={{ fontSize: 12 }}
                                            onTimeElapsed={() => {
                                                this.setState({ message_to_search: 'جست و جو پابان یافت' })
                                            }}
                                        />
                                    </View>
                                    <View>
                                        {this.state.beacon_clubs.map(item =>
                                            <TouchableOpacity
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    height: 30,
                                                    width: '100%',
                                                    alignItems: 'center',
                                                    marginTop: 5
                                                }} onPress={() => { this.props.navigation.navigate('webview', { url: 'https://scotech.ir/shoptemplates/' + item.shopID + '/' + this.state.username }) }}>
                                                <ImageBackground
                                                    style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
                                                    source={{ uri: item.pic_link }}
                                                    imageStyle={{ opacity: 0.5, borderRadius: 20, overflow: 'hidden' }}
                                                >
                                                    <Text style={{
                                                        fontSize: 18,
                                                        letterSpacing: 2,
                                                        fontWeight: '300',
                                                        marginRight: 5,
                                                    }}>{item.shopname}</Text>

                                                </ImageBackground>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </ScrollView>
                            )
                        }
                    </Overlay>
                    <TouchableOpacity onPress={() => this.startScan()}
                        style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row-reverse' }}>
                        <View style={{ backgroundColor: '#FDD93C', width: '80%', height: 40, alignSelf: 'center', marginTop: 8, borderRadius: 40, alignItems: 'center', justifyContent: 'center' }} >
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 16 }}>یافتن باشگاه مشتریان (S-Beacon)</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Guide', { id: 7 })}
                        >
                            <Icon
                                name='help-circle' style={{ fontSize: 25, marginRight: 5, transform: [{ scaleX: -1 }] }} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center', marginTop: 20, marginLeft: '2.5%' }}>
                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>نزدیک‌‌ ترین باشگاه مشتریان</Text>
                        <Icon
                            onPress={() => this.props.navigation.navigate('Guide', { id: 3 })}
                            name='help-circle' style={{ fontSize: 20, marginRight: 5, transform: [{ scaleX: -1 }] }} />
                    </View>
                    <View style={{ width: '90%', flexDirection: 'row-reverse', alignItems: 'center', height: 40, elevation: 5, marginHorizontal: '5%', marginVertical: 10, backgroundColor: 'white', borderRadius: 20, paddingLeft: 25 }}>
                        <Icon name='search' style={{ fontSize: 30, marginLeft: 10, color: '#c4c4c4' }} />
                        <View style={{ width: '70%', height: 40, }}>
                            <TextInput onChangeText={(value) => this.search_item(value)}
                                onEndEditing={() => this.search_ends()} placeholderTextColor='#c4c4c4' placeholder='جست‌وجو در باشگاه‌های مشتریان' style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 14, color: '#c4c4c4' }} />
                        </View>
                    </View>
                    <View style={{ marginTop: 5, paddingHorizontal: '5%', flex: 1 }}>
                        <FlatList
                            keyExtractor={(item, index) => { return index.toString() }}
                            numColumns={2}
                            data={this.state.clubs}
                            renderItem={({ item }) =>
                                <View style={{ width: '47%', marginHorizontal: '1.5%', height: 140, borderRadius: 20, alignItems: 'center', marginTop: 15 }}>
                                    <Image resizeMode='cover' style={{ height: '100%', width: '100%', borderRadius: 20 }} source={{ uri: item.pic_link }} />
                                    <View style={{ position: 'absolute', bottom: 35, height: 20, width: '90%', backgroundColor: '#827086', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'white' }}>{item.shopname}</Text>
                                    </View>
                                    <View style={{ position: 'absolute', bottom: 12, height: 15, width: '75%', backgroundColor: '#827086', borderRadius: 7.5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 9, color: 'white' }}>موجودی شما:<Icon style={{ fontSize: 8, color: 'white' }} name='logo-usd' /> {item.score}</Text>
                                    </View>
                                </View>}
                        />
                    </View>
                </ScrollView>
                <FooterViewI menu={3} navigation={this.props.navigation} />

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 20,
        height: '100%',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    container_2: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#FFD600',
        padding: 12,
    },
    paragraph: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    footerViews: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    container2: {
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
    },
    splitup: {
        marginTop: 20
    },
    input_search: {
        fontSize: 20,
        fontWeight: '200',
    },
    container_search: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        width: '100%'
    },
});
