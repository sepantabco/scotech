import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, AsyncStorage, Alert, TouchableOpacity } from 'react-native'
import get_key from "../Auth";
import { P_URL } from "../PUBLICURLs";
import { Icon } from 'native-base';

export default class WebViewHeader extends Component {
    constructor() {
        super();
        this.state = {
            webviewTitle: ''
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ webviewTitle: this.props.navigation.getParam('webviewTitle') })

        }, 2000);
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} >
                <View></View>
                <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 18 }}>{this.state.webviewTitle}</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.openDrawer()}>
                    <Icon style={{ color: 'white', fontSize: 28 }} name="menu" />

                </TouchableOpacity>
            </View>
        )
    }
}
