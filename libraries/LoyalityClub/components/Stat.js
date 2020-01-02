import * as React from 'react';
import {
    Text, View, StyleSheet, Image, Switch,
    NativeAppEventEmitter,
    NativeEventEmitter,
    NativeModules,
    Platform,
    PermissionsAndroid, AsyncStorage, Alert, Modal, TouchableOpacity, ScrollView, WebView,
} from 'react-native';
import BleManager from "react-native-ble-manager";
import EventModal from "../../GameCenter/GameCenterView";
import {P_URL} from "../../PUBLICURLs";
import get_key from "./Auth";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
export default class Stat extends React.Component {
    constructor() {
        super();
        this.state = {
            beaconfind: false, username: '', modalVisible: false, shopID: 0,
            peripherals_array: []
        };
        this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
        this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
        this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
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
        this.setState({username: user});
    }

    async componentDidMount() {
        const username = await this.getUsername();
        this._setUsername(username);
        BleManager.start({showAlert: false});
        this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral);
        this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral);
        this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic);


    }

    handleDisconnectedPeripheral(data) {
        let peripherals = this.state.peripherals;
        let peripheral = peripherals.get(data.peripheral);
        if (peripheral) {
            peripheral.connected = false;
            peripherals.set(peripheral.id, peripheral);
            this.setState({peripherals});
        }
        console.log('Disconnected from ' + data.peripheral);
    }

    handleUpdateValueForCharacteristic(data) {
        console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
    }

    handleDiscoverPeripheral(peripheral) {
        console.log('Got ble peripheral', peripheral);

    }

    ///////////////////////////setModalVisible/////////////////////////////////////////
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    ///////////////////////////////////////////////////////////////////////////////////

    startScan() {
        if (!this.state.scanning) {
            this.setState({peripherals: new Map()});
            BleManager.scan([], 3, true);
        }
    }

    startScan(value) {
        this.setState({beaconfind: value});
        BleManager.scan(['FEAA'], 30, true);
        this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', (peripheral) => {
            let go_next = false;
            console.log(peripheral);
            for (var prop in peripheral) {
                if (prop === 'id')
                    go_next = true
            }
            if (go_next && !(this.state.peripherals_array.filter( p => p===peripheral.id).length >0 )) {
                fetch(P_URL+'add_beacon_user?macAD=' + peripheral.id + '&username=' + this.state.username,{headers: {Authorization: get_key()}}).then(response => {
                    response.json().then(responseJson => {
                        if (responseJson.status === 0)
                            return 0;
                        //////////////////setModelVisible -> true //////////////////////
                        this.setState({shopID: responseJson.shopID});
                        this.setModalVisible(true);
                        ////////////////////////////////////////////////////////////////
                    });
                });
                this.state.peripherals_array.push(peripheral.id);
                this.setState({peripherals_array: this.state.peripherals_array})
            }
        });

    }

    render() {
        return (
            <View style={styles.container_2}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}>
                        <WebView
                            source={{uri: 'https://scotech.ir/shoptemplate/' + this.state.shopID}}
                            style={{height: '80%'}}/>
                        <TouchableOpacity
                            style={{height: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: '#211F68'}}
                            onPress={() => this.setState({modalVisible: false})}>
                            <View>
                                <Text style={{fontSize: 28, color: '#FBFFF0'}}>خروج</Text>
                            </View>
                        </TouchableOpacity>
                </Modal>
                <Switch onValueChange={(value) => this.startScan(value)} value={this.state.beaconfind}></Switch>
                <Text style={styles.paragraph}>پیدا کردن S-Beacon</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container_2: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 24,
    },
    paragraph: {
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 1,
    }
});
