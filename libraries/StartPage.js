import React, { Component, PureComponent } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ImageBackground,
    AsyncStorage,
    Alert,
    TouchableOpacity,
    ScrollView,
    SafeAreaView
} from 'react-native'
import FadeInView from './FadeInView';
import { Button } from 'react-native-elements';
import { Icon } from 'native-base';
import Confirm_User from './Confirm_User';
import GetPhonenumber from './GetPhonenumber';
let username = "";
let goHomepage = false;
export default class StartPage extends Component {
    static navigationOptions = ({ navigation }) => {
                return {
                    header: null,
                    headerLeft: null
                }
            };
    constructor() {
        super();
        this.state = {
            tabSelected: 0
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
                <View style={{ flex: 1 }}>
                    <Image resizeMode='cover' style={{ width: '100%', height: '100%' }} source={require('../images/startpage2.gif')} />
                    <View style={{ width: '65%', height: 50, flexDirection: 'row-reverse', position: 'absolute', zIndex: 1, bottom: -25, alignSelf: 'center', borderRadius: 20, elevation: 5 }}>
                        <TouchableOpacity onPress={() => { this.setState({ tabSelected: 0 }) }}
                            style={{ flex: 1, backgroundColor: this.state.tabSelected == 0 ? '#573c65' : 'white', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 20, borderBottomRightRadius: 20 }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', color: this.state.tabSelected == 0 ? 'white' : '#573c65', fontSize: 20, marginHorizontal: 10 }}>ثبت نام</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.setState({ tabSelected: 1 }) }}
                            style={{ flex: 1, backgroundColor: this.state.tabSelected == 1 ? '#573c65' : 'white', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', color: this.state.tabSelected == 1 ? 'white' : '#573c65', fontSize: 20, marginHorizontal: 10 }}>ورود</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 2, backgroundColor: '#f5f5f5' }}>
                    {this.state.tabSelected == 0 ? (<Confirm_User />) : (<GetPhonenumber navigation={this.props.navigation}/>)}
                </View>


            </SafeAreaView>
        )
    }
}