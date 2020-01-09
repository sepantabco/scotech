import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, AsyncStorage, Alert, TouchableOpacity } from 'react-native'
import get_key from "../Auth";
import { P_URL } from "../PUBLICURLs";
import { Icon, Badge } from 'native-base';
export default class MiningPageHeader extends Component {
    constructor() {
        super();
        this.state = {
            notification: 0
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
            response.json().then((responseJson) => {
                this.setState({
                    notification: responseJson.notification,
                });
            })
        }).catch(e => { alert(e.toString()) })
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }} >
                <TouchableOpacity
                    onPress={() => { this.props.navigation.navigate('webview', { url: P_URL + 'notification?username=' + this.state.username }) }}>
                    <Badge style={{ height: 17, minWidth: 17, position: 'absolute', zIndex: 1, left: -8 }}>
                        <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 10, }}>{this.state.notification}</Text>
                    </Badge>
                    <Icon style={{ color: 'white', fontSize: 28 }} name="mail" />

                </TouchableOpacity>
                <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 18 }}>حفاری</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.openDrawer()}>
                    <Icon style={{ color: 'white', fontSize: 28 }} name="menu" />

                </TouchableOpacity>
            </View>
        )
    }
}
