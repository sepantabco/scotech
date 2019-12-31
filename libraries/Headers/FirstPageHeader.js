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

    async componentDidMount() {
        const user = await this.getUsername();
        console.log(user)
        fetch(P_URL + 'userData?userID=' + user, { headers: { Authorization: get_key() } }).then((response) => {
            response.json().then((responseJson) => {
                this.setState({
                    Scoin: responseJson.Bcoin,
                });
            })
        }).catch(e => { alert(e.toString()) })
    }



    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} >
                <View>

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '30%' }}>
                    <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 20, marginHorizontal: 10 }}>{this.state.Scoin}</Text>
                    <Image resizeMode='stretch' style={{ height: 20, width: 20 }} source={require('../../images/logos/sCoin-white.png')} />
                    <Icon style={{ color: '#8f8f8f', fontSize: 28 }} name="help-circle-outline" />

                </View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.openDrawer()}>
                    <Icon style={{ color: 'white', fontSize: 28 }} name="menu" />

                </TouchableOpacity>
            </View>
        )
    }
}
