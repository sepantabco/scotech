import React, { Component } from 'react';
import { Text, View, Fragment, Image, AsyncStorage, Alert, TouchableOpacity } from 'react-native'
import get_key from "../Auth";
import { P_URL } from "../PUBLICURLs";
import { Icon } from 'native-base';
import Overlay from 'react-native-modal-overlay';
import Filter from '../CategoryADs/components/Filter';

export default class GroupADsHeader extends Component {
    constructor() {
        super();
        this.state = {
            Scoin: 0,
            level: 0,
            notifs: 0,
            startnotif: false

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

    _setUsername(u) {
        this.setState({ username: u })
    }

    async componentDidMount() {
        const user = await this.getUsername();
        this._setUsername(user);
        fetch(P_URL + 'userData?userID=' + user, { headers: { Authorization: get_key() } }).then((response) => {
            response.json().then((jsondata) => {
                this.setState({
                    notifs: jsondata.notification,
                    Scoin: jsondata.Bcoin,
                    level: jsondata.level
                });
            })
        }).catch(e => { alert(e.toString()) })
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} >
                <Filter
                    ref={r => { this.openModal = r }}
                />
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('webview', { url: P_URL + 'transfer?username=' + this.state.username })}>
                    <Icon style={{ color: 'white', fontSize: 28 }} name="search" />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '30%' }}>
                    <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 18 }}>فیش اند چیپس عمو جو</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '30%', alignItems: 'center' }}>

                    <TouchableOpacity>
                        <Icon style={{ color: 'white', fontSize: 28 }} name="menu" />
                    </TouchableOpacity>
                </View>
                <View>

                </View>
            </View>
        )
    }
}
