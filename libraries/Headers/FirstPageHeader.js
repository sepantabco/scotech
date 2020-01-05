import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, AsyncStorage, Alert, TouchableOpacity } from 'react-native'
import get_key from "../Auth";
import { P_URL } from "../PUBLICURLs";
import { Icon, Badge } from 'native-base';


export default class FirstPageHeader extends Component {
    constructor() {
        super();
        this.state = {
            Scoin: 0,
            notification:0
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
        fetch(P_URL + 'userData?userID=' + user, { headers: { Authorization: get_key() } }).then((response) => {
            response.json().then((responseJson) => {                
              this.setState({
                notification: responseJson.notification,
              })
            })
          }).catch((err) => Alert.alert(err.toString()))
    }



    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',paddingHorizontal:20 }} >
                <TouchableOpacity
                    onPress={() => this.props.navigation.openDrawer()}>
                    <Badge style={{height:17,width:17,position:'absolute',zIndex:1,left:-8}}>
                        <Text style={{fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 10,}}>{this.state.notification}</Text>
                    </Badge>
                    <Icon style={{ color: 'white', fontSize: 28 }} name="mail" />

                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '30%' }}>
                    <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 20, marginHorizontal: 10 }}>{this.state.Scoin}</Text>
                    <Image resizeMode='stretch' style={{ height: 20, width: 20 }} source={require('../../images/logos/sCoin-white.png')} />
                    <Icon
                        onPress={() => this.props.navigation.navigate('Guide', { id: 0 })}
                        style={{ color: '#8f8f8f', fontSize: 20, marginHorizontal: 5 }} name="help-circle-outline" />

                </View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.openDrawer()}>
                    <Icon style={{ color: 'white', fontSize: 28 }} name="menu" />

                </TouchableOpacity>
            </View>
        )
    }
}
