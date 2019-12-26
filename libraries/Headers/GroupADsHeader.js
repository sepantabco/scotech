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
            notifs: 0,
            title: ''
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
        // const user = await this.getUsername();
        // this._setUsername(user);
        // fetch(P_URL + 'userData?userID=' + user, { headers: { Authorization: get_key() } }).then((response) => {
        //     response.json().then((jsondata) => {
        //         this.setState({
        //             notifs: jsondata.notification,
        //             Scoin: jsondata.Bcoin,
        //             level: jsondata.level
        //         });
        //     })
        // }).catch(e => { alert(e.toString()) })
        let ad_id = await this.props.navigation.getParam('ad_id')
        fetch(P_URL + 'ad_info?ad_id=' + ad_id).then(response => {
            response.json().then(responseJson => {
                this.setState({ title: responseJson.title })

            })
        })

    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} >
              
                <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 20 }}>{this.state.title.substring(0,15)}...</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.openDrawer()}>
                    <Icon style={{ color: 'white', fontSize: 28 }} name="menu" />

                </TouchableOpacity>
            </View>
        )
    }
}
