import React, { Component } from 'react';
import {
    Alert,
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image,
    AsyncStorage,
    Text,
    TextInput,
    SafeAreaView
} from 'react-native';
import { Icon } from 'native-base';
import InvitationHeader from '../Headers/InvitationHeader';
export default class Invitation extends Component {
    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: <InvitationHeader navigation={navigation} />,
            headerStyle: {
                backgroundColor: '#573c65',
            }
        }
    };
    async getUsername() {
        try {
            let token = await AsyncStorage.getItem('username');
            return token;
        } catch (error) {
            Alert.alert(error.toString());
        }
    }

    _setStateUsername(user) {
        this.setState({ username: user })
    }

    async componentDidMount() {
        const user = await this.getUsername();
        console.log(user);
        this._setStateUsername(user);
    }

    constructor() {
        super();
        this.state = { timer: 0, phoneNumber: '', sentBool: false, token: '', res: '', username: '' };
    }



    pressed() {
        fetch('https://api.sms.ir/users/v1/Token/GetToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "UserApiKey": "824886d191ce42937e1cd2aa",
                "SecretKey": "*$fy7!$T2N&k@3i"
            }),
        }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson);
            this.setState({ res: responseJson, token: responseJson.TokenKey });
            this.addcontact();
            this.setState({ sentBool: true })
        });
    }

    addcontact() {
        fetch('https://api.sms.ir/users/v1/Contacts/AddContacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-sms-ir-secure-token': this.state.token,
            },
            body: JSON.stringify({
                "ContactsDetails": [
                    {
                        "Mobile": this.state.phoneNumber,
                    }
                ],
                "GroupId": 37320
            }),
        }).then((response) => {
            this.sendsms(this.state.phoneNumber);
        });
    }

    sendsms() {
        const messagetosend = "سلام! دوست شما با نام کاربری:" + this.state.username + ' شما را به اپلیکیشن Sکوین دعوت کرده است. لینک دانلود اپلیکیشن: ' + "LINK";
        fetch('https://api.sms.ir/users/v1/Message/SendByMobileNumbers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-sms-ir-secure-token': this.state.token,
            },
            body: JSON.stringify({
                "Message": messagetosend,
                "MobileNumbers": [this.state.phoneNumber],
                "CanContinueInCaseOfError": true
            }),
        }).then((response) => {
            response.json().then((message) => {
                if (!message.IsSuccessful) {
                    Alert.alert("مشکلی در ارسال پیامک پیش آمده، لطفا دوباره تلاش کنید.")
                }
                Alert.alert('دعوت شما با موفقیت به دست دوستتان رسید ;)');
                this.props.navigation.navigate('profile')
            })
        });
    }

    render() {

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView >
                    <View style={{ flex: 1, width: '75%', flexDirection: 'row', height: '5%', backgroundColor: 'white', alignSelf: 'center', elevation: 3, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%', marginVertical: 50 }}>
                        <TextInput
                            onChangeText={(name) => {
                                this.setState({ name: name })
                            }}
                            placeholder='شماره دوست خود را وارد کنید' numberOfLines={1} style={{ width: '85%', fontFamily: 'IRANSans(FaNum)', fontSize: 12 }} />
                        <Icon style={{ color: '#573c65', fontSize: 15 }} name="mail" />
                    </View>
                    <TouchableOpacity
                        onPress={() => { this.pressed() }}
                        style={{ height: '10%', width: '50%', height: 40, flexDirection: 'row', marginVertical: 50, backgroundColor: '#573c65', alignSelf: 'center', borderRadius: 20, elevation: 5, alignItems: 'center', justifyContent: 'space-around' }}>
                        <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 14, marginHorizontal: 10 }}>ارسال پیامک</Text>
                        <Icon style={{ color: 'white', fontSize: 14 }} name="send" />
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>

        );
    }
}
