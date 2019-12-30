import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, TextInput, TouchableOpacity, Animated } from 'react-native'
import { createStackNavigator, createAppContainer, ScrollView } from 'react-navigation';
import { Button } from "react-native-elements";
import { Icon } from 'native-base';


export default class GetPhonenumber extends Component {
    constructor() {
        super();
        this.state = {
            smsSent: false
        };
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f5f5f5', marginTop: 25 }}>
                <View style={{ flex: 7, }}>
                    {this.state.smsSent == false ?
                        (
                            <ScrollView>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ flex: 1, width: '75%', flexDirection: 'row', height: '15%', backgroundColor: 'white', marginVertical: 10, elevation: 1, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, paddingHorizontal: '5%', justifyContent: 'space-between', alignItems: 'center', marginTop: 100 }}>
                                        <TextInput placeholder='کد فعال سازی را وارد کنید' numberOfLines={1} style={{ width: '85%', fontFamily: 'IRANSans(FaNum)', fontSize: 10 }} />
                                        <Icon style={{ color: 'gray', fontSize: 15 }} type='FontAwesome5' name="user" />
                                    </View>
                                </View>
                            </ScrollView>
                        ) :
                        <ScrollView>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ flex: 1, width: '75%', flexDirection: 'row', height: '15%', backgroundColor: 'white', marginVertical: 10, elevation: 1, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, paddingHorizontal: '5%', justifyContent: 'space-between', alignItems: 'center', marginTop: 100 }}>
                                    <TextInput placeholder='کد فعال سازی را وارد کنید' numberOfLines={1} style={{ width: '85%', fontFamily: 'IRANSans(FaNum)', fontSize: 10 }} />
                                    <Icon style={{ color: 'gray', fontSize: 15 }} type='FontAwesome5' name="user" />
                                </View>
                            </View>
                        </ScrollView>
                    }
                </View>


                <TouchableOpacity
                    onPress={() => { this.setState({ smsSent: !this.state.smsSent }) }}
                    style={{ height: '10%', width: '50%', height: 40, flexDirection: 'row', marginVertical: 5, backgroundColor: '#573c65', alignSelf: 'center', borderRadius: 20, elevation: 5, alignItems: 'center', justifyContent: 'space-around' }}>
                    <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 14, marginHorizontal: 10 }}>{!this.state.smsSent ? 'ارسال کد فعالسازی' : 'ارسال مجدد کد فعالسازی'}</Text>
                    <Icon style={{ color: 'white', fontSize: 14 }} type='FontAwesome5' name="key" />
                </TouchableOpacity>
            </View>
        );
    }
}
