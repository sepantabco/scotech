import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    AsyncStorage,
    Alert,
    TouchableOpacity,
    TextInput,
    ScrollView
} from 'react-native'
import get_key from "./Auth";
import { P_URL } from "./PUBLICURLs";
import { Icon } from 'native-base';

export default class Confirm_User extends Component {
    constructor() {
        super();
        this.state = {
            phonenumber: "",
            name: "",
            family_name: "",
            username: "",
            //         reagent: "",
            sex: 0,
            buttonSelected: 0
        };
    }

    // async storeUsername(username) {
    //     await AsyncStorage.setItem('username', username);
    // }

    // _set_states(phonenumber, sex) {
    //     this.setState({ 'phonenumber': phonenumber, 'sex': sex });
    // }

    // componentDidMount() {

    //     const { navigation } = this.props;
    //     this._set_states(phone, this.props.sex)
    // }

    // _submitData() {
    //     console.log(this.state.user);
    //     console.log(this.state.phonenumber);
    //     this.storeUsername(this.state.user);
    //     let page_url = P_URL + "register" +
    //         "?phonenumber=" + this.state.phonenumber + "&name=" + this.state.name + "." + this.state.family_name +
    //         "&username=" + this.state.user + "&sex=" + this.state.sex + "&reagent=" + this.state.reagent;
    //     fetch(page_url, { headers: { Authorization: get_key() } })
    //         .then((response) => { }).catch((error) => {
    //             Alert.alert(error.toString())
    //         });
    //     this.props.navigation.navigate('Firstpage');
    // }

    // _check_username_exist() {
    //     fetch(P_URL + 'check_user_exist?username=' + this.state.user, { headers: { Authorization: get_key() } })
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             if (responseJson.exists) {
    //                 Alert.alert('این نام کاربری قبلا انتخاب شده');
    //             } else {
    //                 this._submitData();
    //             }
    //         }, function () {
    //         }).catch((error) => {
    //             Alert.alert(error.toString())
    //         });
    // }
    _sexSelected(sex) {
        this.setState({
            sex: sex
        })
    }
    _checkFormData() {
        console.log('Checking Form & Submit');
        this.setState({ buttonSelected: this.state.buttonSelected + 1 })
    }
    _sendSms() {
        console.log('SendingSms');
        this.setState({ buttonSelected: this.state.buttonSelected + 1 })
    }
    _ButtonTouched() {
        switch (this.state.buttonSelected) {
            case 0:
                this._checkFormData()
                break;
            case 1:
                this._sendSms()
                break;
            case 2:
                this._sendSms()
                break;
        }
    }
    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#f5f5f5', marginTop: 25 }}>
                <View style={{ flex: 7 }}>
                    {this.state.buttonSelected == 0 ?
                        (
                            <ScrollView>
                                <View style={{ flex: 1, width: '75%', flexDirection: 'row', height: '95%', backgroundColor: 'white', marginTop: 10, alignSelf: 'center', elevation: 3, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%' }}>
                                    <TextInput
                                        onChangeText={(name) => {
                                            this.setState({ name: name })
                                        }}
                                        placeholder='(اختیاری) نام خود را وارد کنید' numberOfLines={1} style={{ width: '85%', fontFamily: 'IRANSans(FaNum)', fontSize: 10 }} />
                                    <Icon style={{ color: 'gray', fontSize: 15 }} type='FontAwesome5' name="user" />
                                </View>
                                <View style={{ flex: 1, width: '75%', flexDirection: 'row', height: '95%', backgroundColor: 'white', marginTop: 10, alignSelf: 'center', elevation: 3, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%' }}>
                                    <TextInput
                                     onChangeText={(family_name) => {
                                        this.setState({ family_name: family_name })
                                    }}
                                    placeholder='نام خانوادگی خود را وارد کنید' numberOfLines={1} style={{ width: '85%', fontFamily: 'IRANSans(FaNum)', fontSize: 10 }} />
                                    <Icon style={{ color: 'gray', fontSize: 15 }} type='FontAwesome5' name="user" />
                                </View>
                                <View style={{ flex: 1, width: '75%', flexDirection: 'row', height: '95%', backgroundColor: 'white', marginTop: 10, alignSelf: 'center', elevation: 3, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%' }}>
                                    <TextInput
                                      onChangeText={(username   ) => {
                                            this.setState({ username: username })
                                        }}
                                    placeholder='نام کاربری خود را وارد کنید' numberOfLines={1} style={{ width: '85%', fontFamily: 'IRANSans(FaNum)', fontSize: 10 }} />
                                    <Icon style={{ color: 'gray', fontSize: 15 }} type='FontAwesome5' name="user" />
                                </View>
                                <View style={{ flex: 1, width: '75%', flexDirection: 'row', height: '95%', backgroundColor: 'white', marginTop: 10, alignSelf: 'center', elevation: 3, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: '13%' }}>
                                    <TouchableOpacity onPress={() => { this._sexSelected(0) }}
                                        style={{ width: 34, height: 34, borderWidth: 2, borderColor: this.state.sex == 0 ? '#573c65' : 'gray', borderRadius: 17, justifyContent: 'center', alignItems: 'center', marginRight: '5%' }}>
                                        <Icon style={{ color: this.state.sex == 0 ? '#573c65' : 'gray', fontSize: 25, }} type='FontAwesome5' name="male" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { this._sexSelected(1) }}
                                        style={{ width: 34, height: 34, borderWidth: 2, borderColor: this.state.sex == 1 ? '#573c65' : 'gray', borderRadius: 17, justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon style={{ color: this.state.sex == 1 ? '#573c65' : 'gray', fontSize: 25 }} type='FontAwesome5' name="female" />
                                    </TouchableOpacity>
                                    <TextInput editable={false} placeholder='جنسیت خود را انتخاب کنید' numberOfLines={1} style={{ width: '70%', fontFamily: 'IRANSans(FaNum)', fontSize: 10 }} />
                                </View>
                                <View style={{ flex: 1, width: '75%', flexDirection: 'row', height: '95%', backgroundColor: 'white', marginVertical: 10, alignSelf: 'center', elevation: 3, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%' }}>
                                    <TextInput
                                      onChangeText={(phonenumber   ) => {
                                        this.setState({ phonenumber: phonenumber })
                                    }}
                                    placeholder='شماره موبایل خود را وارد کنید' numberOfLines={1} style={{ width: '85%', fontFamily: 'IRANSans(FaNum)', fontSize: 10 }} />
                                    <Icon style={{ color: 'gray', fontSize: 15 }} type='FontAwesome5' name="user" />
                                </View>
                            </ScrollView>
                        )
                        :
                        (
                            <ScrollView>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ flex: 1, width: '75%', flexDirection: 'row', height: '15%', backgroundColor: 'white', marginVertical: 10, elevation: 1, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, paddingHorizontal: '5%', justifyContent: 'space-between', alignItems: 'center', marginTop: 100 }}>
                                        <TextInput placeholder='کد فعال سازی را وارد کنید' numberOfLines={1} style={{ width: '85%', fontFamily: 'IRANSans(FaNum)', fontSize: 10 }} />
                                        <Icon style={{ color: 'gray', fontSize: 15 }} type='FontAwesome5' name="user" />
                                    </View>
                                </View>
                            </ScrollView>
                        )
                    }
                </View>
                <TouchableOpacity
                    onPress={() => { this._ButtonTouched() }}
                    style={{ height: '10%', width: '50%', height: 40, flexDirection: 'row', marginVertical: 5, backgroundColor: '#573c65', alignSelf: 'center', borderRadius: 20, elevation: 5, alignItems: 'center', justifyContent: 'space-around' }}>
                    <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 14, marginHorizontal: 10 }}>{this.state.buttonSelected == 0 ? 'ادامه' : this.state.buttonSelected == 1 ? 'ارسال کد فعالسازی' : 'ارسال مجدد کد فعالسازی'}</Text>
                    {this.state.buttonSelected == 0 ? <Icon style={{ color: 'white', fontSize: 14 }} type='FontAwesome5' name="check" /> : <Icon style={{ color: 'white', fontSize: 14 }} type='FontAwesome5' name="key" />}
                </TouchableOpacity>
            </View>
        );
    }
}
