import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, AsyncStorage, Alert, TouchableOpacity } from 'react-native'
import get_key from "../Auth";
import { P_URL } from "../PUBLICURLs";
import { Icon } from 'native-base';

export default class ShowAllHeader extends Component {
    constructor(props) {
        super(props);
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

  
       

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',paddingHorizontal:20}} >
              <View>
                  
              </View>
                <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 20 }}>
                    نمایش همه
                </Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.openDrawer()}>
                    <Icon style={{ color: 'white', fontSize: 28 }} name="menu" />

                </TouchableOpacity>
            </View>
        )
    }
}
