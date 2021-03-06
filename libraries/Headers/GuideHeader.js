import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native'
import get_key from "../Auth";
import { P_URL } from "../PUBLICURLs";
import { Icon } from 'native-base';

export default class GuideHeader extends Component {
    constructor() {
        super();
        this.state = {
            title: ''
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ title: this.props.navigation.getParam('title') })

        }, 2000);
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',paddingHorizontal:20 }} >
                <View></View>
                <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 14 }}>{this.state.title}</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.openDrawer()}>
                    <Icon style={{ color: 'white', fontSize: 28 }} name="menu" />

                </TouchableOpacity>
            </View>
        )
    }
}
