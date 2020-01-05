import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
    AsyncStorage,
    StyleSheet
} from 'react-native'
import Share from 'react-native-share';
import CountDown from 'react-native-countdown-component';
import HeaderView from "../HeaderView";
import Slider from "../Slider"
import MostPopularItems from "../Texts/MostPopularItems";
import FooterView from "../FooterViewI";
import { P_URL } from "../PUBLICURLs";
import { Icon } from 'native-base';
import AdsArchiveHeader from '../Headers/AdsArchiveHeader';


export default class AdsArchive extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <AdsArchiveHeader navigation={navigation} />,
            headerStyle: {
                backgroundColor: '#573c65',
            }
        }
    };

    constructor() {
        super();
        this.state = {
            adsShow: false,
            ads: [],
            username: '',
            adsDay: [],
            adsWeek: [],
            adsOthers: []
        }

    }

    addResponseToArr(r) {
        this.setState({ ads: r })
    }

    async componentDidMount() {
        const username = await AdsArchive.getUsername();
        this._setUsername(username);
        this.getAds();
    }

    static async getUsername() {
        try {
            return await AsyncStorage.getItem('username');
        } catch (error) {
            Alert.alert(error.toString());
        }
    }

    _setUsername(user) {
        this.setState({ username: user });
    }

    getAds() {
        return fetch(P_URL + 'get_saved_ads?username=' + this.state.username)
            .then((response) => response.json())
            .then((responseJson) => {
                this.addResponseToArr(responseJson);
                this.splitAds();
                this.setState({ adsShow: true })
            })
            .catch((error) => {
                alert.error(error.toString());
            })
            .catch(error => console.log(error.toString()));
    }

    static setStatus(s) {
        let temp = s.split(" ");
        let temp2 = temp[0] + "T" + temp[1];
        let dateS = new Date(temp2);
        let date = new Date(Date());
        let selector = 0;
        if (((date - dateS) / (3600000 * 24)) < 1) {
            selector = 1
        } else if (((date - dateS) / (3600000 * 24)) < 7) {
            selector = 2
        } else {
            selector = 3
        }
        return selector
    }

    splitAds() {
        for (let i = 0; i < this.state.ads.length; i++) {
            if (AdsArchive.setStatus(this.state.ads[i].saved_time) === 1) {
                this.state.adsDay.push(this.state.ads[i])
            } else if (AdsArchive.setStatus(this.state.ads[i].saved_time) === 2) {
                this.state.adsWeek.push(this.state.ads[i])
            } else if (AdsArchive.setStatus(this.state.ads[i].saved_time) === 3) {
                this.state.adsOthers.push(this.state.ads[i])
            }
        }
        for (let i = 0; i < this.state.adsDay.length; i++) {
            console.log(this.state.adsDay[i])
        }
        for (let i = 0; i < this.state.adsWeek.length; i++) {
            console.log(this.state.adsWeek[i])
        }
        for (let i = 0; i < this.state.adsOthers.length; i++) {
            console.log(this.state.adsOthers[i])
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row-reverse', marginTop: 20, paddingHorizontal: 20 }}>
                        <View style={{ justifyContent: "flex-end", flexDirection: 'row', width: '70%', alignItems: 'center' }}>
                            <Text style={{ fontSize: 15, marginRight: 10, fontFamily: 'IRANSansMobile', }}>آرشیو
                                روز اخیر</Text>
                            <Icon style={{ color: 'black', fontSize: 20, }} name="archive" />
                        </View>
                    </View>
                    {this.state.adsShow &&
                        <Slider data={this.state.adsDay} sliderWidth={200} sliderHeight={150}
                            navigation={this.props.navigation} />
                    }

                    <View style={{ flexDirection: 'row-reverse', marginTop: 20, paddingHorizontal: 20 }}>
                        <View style={{ justifyContent: "flex-end", flexDirection: 'row', width: '70%', alignItems: 'center' }}>
                            <Text style={{ fontSize: 15,  marginRight: 10, fontFamily: 'IRANSansMobile', }}>آرشیو
                               هفته گذشته</Text>
                            <Icon style={{ color: 'black', fontSize: 20, }} name="archive" />
                        </View>
                    </View>
                    {this.state.adsShow &&
                        <Slider data={this.state.adsWeek} sliderWidth={200} sliderHeight={150}
                            navigation={this.props.navigation} />
                    }

                    <View style={{ flexDirection: 'row-reverse', marginTop: 20, paddingHorizontal: 20 }}>
                        <View style={{ justifyContent: "flex-end", flexDirection: 'row', width: '70%', alignItems: 'center' }}>
                            <Text style={{ fontSize: 15,  marginRight: 10, fontFamily: 'IRANSansMobile', }}>آرشیو
                               قدیمی‌تر</Text>
                            <Icon style={{ color: 'black', fontSize: 20, }} name="archive" />
                        </View>
                    </View>
                    {this.state.adsShow &&
                        <Slider data={this.state.adsOthers} sliderWidth={200} sliderHeight={150}
                            navigation={this.props.navigation} />
                    }
                </ScrollView>
                <FooterView menu={2} navigation={this.props.navigation} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    footerViews: {
        alignItems: 'center',
        justifyContent: 'center'
    },
});