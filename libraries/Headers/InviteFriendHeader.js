import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native'
import get_key from "../Auth";
import { P_URL } from "../PUBLICURLs";
import { Icon } from 'native-base';

export default class InviteFriendHeader extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between',paddingHorizontal:20}} >
                <View></View>
                <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 14 }}>دعوت از دوستان</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.openDrawer()}>
                    <Icon style={{ color: 'white', fontSize: 28 }} name="menu" />

                </TouchableOpacity>
            </View>
        )
    }
}
