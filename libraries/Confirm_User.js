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
    ScrollView,
    ActivityIndicator
} from 'react-native'
import get_key from "./Auth";
import { P_URL } from "./PUBLICURLs";
import { Icon } from 'native-base';
import Overlay from 'react-native-modal-overlay';

export default class Confirm_User extends Component {
    
    constructor() {
        super();
        this.state = {
            clickedToken: false,
            clickedOnRegister: false,
            termOverlay: false,
            phonenumber: "",
            name: "",
            family_name: "",
            username: "",
            reagent: "",
            sex: null,
            buttonSelected: 0,
            usernameError: false,
            family_nameError: false,
            phonenumberError: false,
            sexError: false,
            timer: 0,
            usernameExists: false,
            termAccepted: false,
            token: "",
            userToken : ''
        };
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

    async storeUsername(username) {
        await AsyncStorage.setItem('username', username);
    }
    async _submitData() {
        this.setState({clickedToken: true});
        await this.storeUsername(this.state.username);
        let page_url = P_URL + "register" +
            "?phonenumber=" + this.state.phonenumber + "&name=" + this.state.name + "." + this.state.family_name +
            "&username=" + this.state.username + "&sex=" + this.state.sex + "&reagent=" + this.state.reagent;
        fetch(page_url, { headers: { Authorization: get_key() } })
            .then((response) => { }).catch((error) => {
                Alert.alert(error.toString())
            });
        this.props.navigation.navigate('Firstpage');
    }

    _renderTimer() {
        setInterval(() => {
            this.setState({ timer: this.state.timer + 1 })
            console.log(this.state.timer)
        }, 1000)

    }

    _sexSelected(sex) {
        this.setState({
            sex: sex,
            sexError: false
        })
    }
    async _check_username_exist() {
        await fetch(P_URL + 'check_user_exist?username=' + this.state.username, { headers: { Authorization: get_key() } })
            .then((response) => response.json())
            .then((responseJson) => {
                let exists = responseJson.exists
                this.setState({ usernameExists: exists })
            }, function () {
            }).catch((error) => {
                Alert.alert(error.toString())
            });
    }
    async _checkFormData() {
        this.setState({clickedOnRegister: true});
        await this._check_username_exist();
        if (this.state.username.length == 0 || this.state.family_name.length == 0 || this.state.phonenumber.length == 0 || this.state.sex == null ||
            !this.state.termAccepted || this.state.usernameExists) {
            if (this.state.username.length == 0) {
                this.setState({ usernameError: true })
            } if (this.state.phonenumber == 0) {
                this.setState({ phonenumberError: true })
            } if (this.state.family_name == 0) {
                this.setState({ family_nameError: true })
            } if (this.state.sex == null) {
                this.setState({ sexError: true })
            } if (!this.state.termAccepted) {
                this.setState({termOverlay: true})   
            }
            this.setState({clickedOnRegister: false});
        }
        else {
            this._sendSms();
            this.setState({ buttonSelected: 1, usernameError: false, phonenumberError: false, family_nameError: false, sexError: false })
            console.log(this.state.family_name, this.state.name, this.state.phonenumber, this.state.reagent, this.state.sex, this.state.username);
        }


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
                console.log(responseJson);
            });
        });
    }
    _ButtonTouched() {
        switch (this.state.buttonSelected) {
            case 0:
                this._checkFormData()
                break;
            case 1:
                if (this.state.smsToken.toString() == this.state.userToken)
                    this._submitData();
                else
                    Alert.alert('کد وارد شده صحیح نمی باشد');
                break;
        }
    }
    onClose = () => {this.setState({termOverlay: false})}
    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#f5f5f5', marginTop: 25 }}>
                <Overlay visible={this.state.termOverlay} onClose={this.onClose} closeOnTouchOutside
                animationType="zoomIn"
                childrenWrapperStyle={{ backgroundColor: '#DDDDDD' }}
                animationDuration={500}>
                    {!this.state.termAccepted && <Text>لطفا قوانین را مطالعه و تایید کنید</Text>}
                    {this.state.usernameExists && <Text>نام کاربری قبلا ثبت شده است</Text>}
                </Overlay>
                <View style={{ flex: 1 }}>
                    {this.state.buttonSelected == 0 ?
                        (
                            <ScrollView>
                                <View style={{ flex: 1, width: '75%', flexDirection: 'row', height: '95%', backgroundColor: 'white', marginTop: 10, alignSelf: 'center', elevation: 3, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%' }}>
                                    <TextInput
                                        onChangeText={(name) => {
                                            this.setState({ name: name })
                                        }}
                                        placeholder='نام خود را وارد کنید' numberOfLines={1} style={{ width: '85%', fontFamily: 'IRANSans(FaNum)', fontSize: 10 }} />
                                    <Icon style={{ color: '#573c65', fontSize: 15 }} type='FontAwesome5' name="user-alt" />
                                </View>
                                <View style={{ flex: 1, width: '75%', flexDirection: 'row', height: '95%', backgroundColor: 'white', marginTop: 10, alignSelf: 'center', elevation: 3, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%' }}>
                                    <TextInput
                                        onChangeText={(family_name) => {
                                            this.setState({ family_name: family_name })
                                        }}
                                        placeholder='نام خانوادگی خود را وارد کنید' placeholderTextColor={this.state.family_nameError == true ? 'red' : 'gray'} numberOfLines={1} style={{ width: '85%', fontFamily: 'IRANSans(FaNum)', fontSize: 10 }} />
                                    <Icon style={{ color: '#573c65', fontSize: 15 }} type='FontAwesome5' name="user" />
                                </View>
                                <View style={{ flex: 1, width: '75%', flexDirection: 'row', height: '95%', backgroundColor: 'white', marginTop: 10, alignSelf: 'center', elevation: 3, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%' }}>
                                    <TextInput
                                        onChangeText={(username) => {
                                            this.setState({ username: username })
                                        }}
                                        placeholder='نام کاربری خود را وارد کنید' placeholderTextColor={this.state.usernameError == true ? 'red' : 'gray'} numberOfLines={1} style={{ width: '85%', fontFamily: 'IRANSans(FaNum)', fontSize: 10 }} />
                                    <Icon style={{ color: '#573c65', fontSize: 15 }} type='FontAwesome5' name="user-tag" />
                                </View>
                                <View style={{ flex: 1, width: '75%', flexDirection: 'row', height: '95%', backgroundColor: 'white', marginTop: 10, alignSelf: 'center', elevation: 3, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%' }}>
                                    <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => { this._sexSelected(0) }}
                                            style={{ width: 34, height: 34, borderWidth: 2, borderColor: this.state.sex == 0 ? '#573c65' : 'gray', borderRadius: 17, justifyContent: 'center', alignItems: 'center', marginRight: '7%' }}>
                                            <Icon style={{ color: this.state.sex == 0 ? '#573c65' : 'gray', fontSize: 25, }} type='FontAwesome5' name="male" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { this._sexSelected(1) }}
                                            style={{ width: 34, height: 34, borderWidth: 2, borderColor: this.state.sex == 1 ? '#573c65' : 'gray', borderRadius: 17, justifyContent: 'center', alignItems: 'center', }}>
                                            <Icon style={{ color: this.state.sex == 1 ? '#573c65' : 'gray', fontSize: 25 }} type='FontAwesome5' name="female" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 2, alignItems: 'center', flexDirection: 'row-reverse' }}>
                                        <Icon style={{ color: '#573c65', fontSize: 15, }} type='FontAwesome5' name="venus-mars" />
                                        <TextInput editable={false} placeholder='جنسیت خود را انتخاب کنید' placeholderTextColor={this.state.sexError == true ? 'red' : 'gray'} numberOfLines={1} style={{ width: '70%', fontFamily: 'IRANSans(FaNum)', fontSize: 10, marginRight: '13%' }} />
                                    </View>
                                </View>
                                <View style={{ flex: 1, width: '75%', flexDirection: 'row', height: '95%', backgroundColor: 'white', marginTop: 10, alignSelf: 'center', elevation: 3, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%' }}>
                                    <TextInput
                                        onChangeText={(phonenumber) => {
                                            this.setState({ phonenumber: phonenumber })
                                        }}
                                        placeholder='شماره موبایل خود را وارد کنید' placeholderTextColor={this.state.phonenumberError == true ? 'red' : 'gray'} numberOfLines={1} style={{ width: '85%', fontFamily: 'IRANSans(FaNum)', fontSize: 10 }} />
                                    <Icon style={{ color: '#573c65', fontSize: 15 }} type='FontAwesome5' name="phone" />
                                </View>
                                <View style={{ flex: 1, width: '75%', flexDirection: 'row', height: '95%', backgroundColor: 'white', marginTop: 10, alignSelf: 'center', elevation: 3, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%' }}>
                                    <TextInput
                                        onChangeText={(reagent) => {
                                            this.setState({ reagent: reagent })
                                        }}
                                        placeholder='نام کاربری معرف را وارد کنید' numberOfLines={1} style={{ width: '85%', fontFamily: 'IRANSans(FaNum)', fontSize: 10 }} />
                                    <Icon style={{ color: '#573c65', fontSize: 15 }} type='FontAwesome5' name="user-friends" />
                                </View>
                                <View style={{ flex: 1, width: '75%', flexDirection: 'row', height: '95%', backgroundColor: 'white', marginVertical: 10, paddingVertical: '2%', alignSelf: 'center', elevation: 3, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%' }}>
                                    <TouchableOpacity style={{width:'80%'}} onPress={() => {this.setState({termOverlay: true})}}>
                                    <Text style={{ width: '85%', fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'blue', textDecorationLine:'underline' }} >شرایط استفاده را قبول دارم</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => { this.setState({ termAccepted: !this.state.termAccepted}) }}
                                        style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#573c65', borderRadius: 15 }}>
                                       {this.state.termAccepted && <Icon style={{ color: '#573c65', fontSize: 15 }} type='FontAwesome5' name="check" />}
                                    </TouchableOpacity>
                                </View>
                                {!this.state.clickedOnRegister && <TouchableOpacity
                                    onPress={() => { this._ButtonTouched() }}
                                    style={{ flex: 1, width: '50%', height: 40, flexDirection: 'row', marginVertical: 5, backgroundColor: '#573c65', alignSelf: 'center', borderRadius: 20, elevation: 5, alignItems: 'center', justifyContent: 'space-around' }}>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 14, marginHorizontal: 10 }}>{this.state.buttonSelected == 0 ? 'ادامه' : this.state.buttonSelected == 1 ? 'ارسال کد فعالسازی' : 'ارسال مجدد کد فعالسازی'}</Text>
                                    {this.state.buttonSelected == 0 ? <Icon style={{ color: 'white', fontSize: 14 }} type='FontAwesome5' name="check" /> : <Icon style={{ color: 'white', fontSize: 14 }} type='FontAwesome5' name="key" />}
                                </TouchableOpacity>}
                                {this.state.clickedOnRegister && <ActivityIndicator />}
                            </ScrollView>
                        )
                        :
                        (
                            <ScrollView>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ flex: 1, width: '75%', flexDirection: 'row', height: '15%', backgroundColor: 'white', marginVertical: 10, elevation: 1, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, paddingHorizontal: '5%', justifyContent: 'space-between', alignItems: 'center', marginTop: 100 }}>
                                        <TextInput onChangeText={(text) => {this.setState({userToken: text})}} placeholder='کد فعال سازی را وارد کنید' numberOfLines={1} style={{ width: '85%', fontFamily: 'IRANSans(FaNum)', fontSize: 10 }} />
                                        <Icon style={{ color: 'gray', fontSize: 15 }} type='FontAwesome5' name="user" />
                                    </View>
                                </View>
                                {!this.state.clickedToken && <TouchableOpacity
                                    onPress={() => { this._ButtonTouched() }}
                                    style={{ flex: 1, width: '50%', height: 40, flexDirection: 'row', marginVertical: 50, backgroundColor: '#573c65', alignSelf: 'center', borderRadius: 20, elevation: 5, alignItems: 'center', justifyContent: 'space-around' }}>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 14, marginHorizontal: 10 }}>{this.state.buttonSelected == 0 ? 'ادامه' : 'تکمیل ثبت نام' }</Text>
                                    {this.state.buttonSelected == 0 ? <Icon style={{ color: 'white', fontSize: 14 }} type='FontAwesome5' name="check" /> : <Icon style={{ color: 'white', fontSize: 14 }} type='FontAwesome5' name="key" />}
                                </TouchableOpacity>}
                                {this.state.clickedToken && <ActivityIndicator />}
                                {/* {this._renderTimer()} */}
                            </ScrollView>
                        )
                    }
                </View>
            </View>
        );
    }
}
