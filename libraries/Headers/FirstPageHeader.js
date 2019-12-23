import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, AsyncStorage, Alert, TouchableOpacity } from 'react-native'
import get_key from "../Auth";
import { P_URL } from "../PUBLICURLs";
import { Icon } from 'native-base';

export default class FirstPageHeader extends Component {
    constructor() {
        super();
        this.state = {
            Scoin: 0,
            level: 0,
            notifs: 0
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
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('webview', { url: P_URL + 'transfer?username=' + this.state.username })}>
                    <Icon style={{ color: 'white',fontSize:28 }} name="search" />
                </TouchableOpacity>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'30%'}}>
                <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 20 }}>600</Text>
                <Icon style={{ color: 'white',fontSize:28 }} name="git-merge" />
                <Icon style={{ color: '#8f8f8f',fontSize:28 }} name="help-circle-outline" />
                </View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('webview', { url: P_URL + 'notification?username=' + this.state.username })}>
                    <Icon style={{ color: 'white',fontSize:28 }} name="menu" />

                </TouchableOpacity>
            </View>
        )
    }
}
