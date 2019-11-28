import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, AsyncStorage, Alert, TouchableOpacity} from 'react-native'
import get_key from "./Auth";
import {P_URL} from "./PUBLICURLs";

export default class HeaderView extends Component {
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

    _setUsername(u){
        this.setState({username: u})
    }

    async componentDidMount() {
        const user = await this.getUsername();
        this._setUsername(user);
        fetch(P_URL+'userData?userID=' + user,{headers: {Authorization: get_key()}}).then((response) => {
            response.json().then((jsondata) => {
                this.setState({
                    notifs: jsondata.notification,
                    Scoin: jsondata.Bcoin,
                    level: jsondata.level
                });
            })
        }).catch(e => {alert(e.toString())})
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.leftview}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('webview', {url: P_URL+'transfer?username=' + this.state.username})}>
                        <Image style={styles.transfer} source={require('../images/transfer.png')}/>
                    </TouchableOpacity>
                    <Image style={styles.level} source={require('../images/level.png')}/>
                    <View style={{marginTop: '10%'}}>
                        <Text style={{fontSize: 10, marginTop: 8}}>{this.state.level} </Text>
                    </View>
                </View>
                <View style={styles.centerview}>
                    <Image source={require('../images/scoin.png')} style={{width: 28, height: 28}}/>
                    <View style={{marginTop: '5%'}}>
                        <Text style={{}}>{' ' + this.state.Scoin} </Text>
                    </View>
                </View>
                <View style={styles.rightview}>
                    <View style={{marginTop: '15%'}}>
                        <Text style={{fontSize: 10}}>{this.state.notifs} </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('webview', {url: P_URL+'notification?username=' + this.state.username})}>
                        <Image style={styles.alertview} source={require('../images/alert.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent:'space-between',
        width:'100%'
    },
    transfer: {
        height: 28,
        width: 35,
    },
    level: {
        height: 28,
        width: 25,
    },
    alertview: {
        width: 28,
        height: 28
    },
    rightview: {
        marginRight: 5,
        flexDirection: 'row',
    },
    centerview: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftview: {
        marginLeft: 5,
        flexDirection: 'row',
    }
});
