import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, TextInput, TouchableOpacity, Animated, Alert, AsyncStorage } from 'react-native'
import { createStackNavigator, createAppContainer, ScrollView } from 'react-navigation';
import { Button } from "react-native-elements";
import { Icon } from 'native-base';
import { P_URL } from "./PUBLICURLs";
import get_key from "./Auth";
export default class GetPhonenumber extends Component {
    constructor() {
        super();
        this.state = {
            smsSent: false,
            phonenumber:'',
            token: '',
            smsToken: 0,
            userToken: ''
        };
    }
    async storeUsername(username) {
        await AsyncStorage.setItem('username', username);
    }  
    _sendSms() {
        const RandomNumber = Math.floor(Math.random() * 10000) + 1000;
        console.log(RandomNumber + " activation code");
        this.setState({smsToken: RandomNumber});
        fetch('https://RestfulSms.com/api/MessageSend', {
            method: 'post',
            headers : {'Content-Type': 'application/json', 'x-sms-ir-secure-token': this.state.token},
            body : JSON.stringify({Code: RandomNumber, MobileNumber: this.state.phonenumber})
        }).then(response => {
            response.json().then(responseJson => {
                console.log(responseJson.total_rate);
            });
        });
    }
    async componentDidMount() {
        fetch('https://RestfulSms.com/api/Token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "UserApiKey": "9f5c49e51b990ba866a49e5",
                "SecretKey": "&&vbnsa123&&w1)("
            }),
        }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson);
            this.setState({token: responseJson.TokenKey});
        });
    }
    async _check_registered() {
        console.log('dasdasdasd');
        let page_url = P_URL + 'check_registered?phonenumber=' + this.state.phonenumber;
        fetch(page_url,{headers: {Authorization: get_key()}})
            .then((response) => response.json())
            .then(async (responseJson) => {
                if (responseJson.registered) {
                    await this.storeUsername(responseJson.username);
                    
                    this.props.navigation.replace('Firstpage');
                } 

            }, function () {
            }).catch((error) => {
            Alert.alert(error.toString())
        });
    }
    _action_perform() {
        switch (this.state.smsSent) {
            case false:
                this.setState({ smsSent: !this.state.smsSent });
                this._sendSms();
                break;
            case true:
                if (this.state.userToken.toString() == this.state.smsToken.toString()) {
                    this._check_registered();
                }
                break;
        }
    }
    _ButtonTouched(){
        if(this.state.phonenumber.length==0){
            this.setState({phonenumberError:true})
        }else{
            this._action_perform()
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f5f5f5', marginTop: 25 }}>
                <View style={{ flex: 7, }}>
                            <ScrollView>
                                <View style={{ flex: 1, width: '75%', flexDirection: 'row', height: '95%', backgroundColor: 'white', marginTop: 10, alignSelf: 'center', elevation: 3, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%',marginTop:100 }}>
                                    {!this.state.smsSent && <TextInput
                                        onChangeText={(phonenumber) => {
                                            this.setState({ phonenumber: phonenumber })
                                        }}
                                        keyboardType='phone-pad'
                                        placeholder='شماره موبایل خود را وارد کنید' placeholderTextColor={this.state.phonenumberError == true ? 'red' : 'gray'} numberOfLines={1} style={{ width: '85%', fontFamily: 'IRANSans(FaNum)', fontSize: 12,textAlign:'right' }} />
                                    }
                                    {!this.state.smsSent && <Icon style={{ color: '#573c65', fontSize: 15 }} type='FontAwesome5' name="phone" />}
                                    {this.state.smsSent && <TextInput
                                        onChangeText={(value) => {
                                            this.setState({ userToken: value })
                                        }}
                                        keyboardType='phone-pad'
                                        placeholder='کد فعالسازی را وارد کنید' placeholderTextColor= 'gray' numberOfLines={1} style={{ width: '85%', fontFamily: 'IRANSans(FaNum)', fontSize: 12,textAlign:'right' }} />
                                    }
                                    {this.state.smsSent && <Icon style={{ color: '#573c65', fontSize: 15 }} type='FontAwesome5' name="key" />}
                                </View>
                                <TouchableOpacity
                                    onPress={() => { this._ButtonTouched() }}
                                    style={{ height: '10%', width: '50%', height: 40, flexDirection: 'row', marginVertical: 50, backgroundColor: '#573c65', alignSelf: 'center', borderRadius: 20, elevation: 5, alignItems: 'center', justifyContent: 'space-around' }}>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 14, marginHorizontal: 10 }}>{!this.state.smsSent ? 'ارسال کد فعالسازی' : 'تایید'}</Text>
                                    <Icon style={{ color: 'white', fontSize: 14 }} type='FontAwesome5' name="key" />
                                </TouchableOpacity>
                            </ScrollView>
                </View>

            </View>
        );
    }
}
