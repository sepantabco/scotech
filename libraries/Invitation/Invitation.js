import React, {Component} from 'react';
import {
    Alert,
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image,
    AsyncStorage,
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';
import FooterView from "../FooterViewI";

export default class Invitation extends Component {
    async getUsername() {
        try {
            let token = await AsyncStorage.getItem('username');
            return token;
        } catch (error) {
            Alert.alert(error.toString());
        }
    }

    _setStateUsername(user) {
        this.setState({username: user})
    }

    async componentDidMount() {
        const user = await this.getUsername();
        console.log(user);
        this._setStateUsername(user);
    }

    constructor() {
        super();
        this.state = {timer: 0, phoneNumber: '', sentBool: false, token: '', res: '', username: ''};
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
            this.setState({res: responseJson, token: responseJson.TokenKey});
            this.addcontact();
            this.setState({sentBool: true})
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
            <View style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                    <Input
                        style={{padding: 20}}
                        placeholder='Ex. 09xxxxxxxxx'
                        onChangeText={(phone) => {
                            this.setState({phoneNumber: phone})
                        }}
                        leftIcon={
                            <Icon
                                name='user'
                                size={24}
                                color='black'
                            />
                        }
                    />
                    < Button
                        style={{margin: 15}}
                        title="Send SMS"
                        type="clear"
                        onPress={() => this.pressed()}
                    />
                </ScrollView>
                <FooterView menu={5} navigation={this.props.navigation}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    footerViews: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    scroll: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
