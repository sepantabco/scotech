import React, { Component } from 'react'
import { Text, View, FlatList, Image, AsyncStorage, ActivityIndicator } from 'react-native'
import { Icon } from 'native-base';
import { L_URL, I_URL, S_URL } from '../../PUBLICURLs';
import { TouchableOpacity } from 'react-native-gesture-handler';

export class CustomerClub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            loaded: true,
            dataEnded: false,
            CustomerClubData: [],
            loyality_token: ''

        }
    }
    navigate_shop = (shop_id) => {
        this.props.navigation.navigate('webview', {
            type_of_webview: 1, token: this.state.loyality_token,
            url: S_URL + shop_id, title: 'صفحه فروشگاه'
        });
    }
    async fetch_new_data() {
        let token = await AsyncStorage.getItem('loyality_token');
        this.setState({ loyality_token: token });
        if (!this.state.dataEnded) {
            this.setState({ loaded: true });
            console.log(L_URL + 'GetClubs?label=' + this.props.cid + '&offset=' + this.state.offset)
            fetch(L_URL + 'GetClubs?label=' + this.props.cid + '&offset=' + this.state.offset, {
                method: 'post', headers: {
                    'content-type': 'application/json',
                    'Authorization': token
                }
            }).then(response => {
                response.json().then(responseJson => {
                    responseJson.result.clubs.map(item => {
                        this.state.CustomerClubData.push(
                            {
                                title: item.shop_info.Shop_name, address: item.shop_info.neighbourhood, type: item.shop_info.labels[0].label, pic_link: I_URL + item.shop_info.picture + '/', shipPrice: 'رایگان', score: item.score, percent: item.shop_info.stars,
                                shop_id: item.shop_info.id
                            }
                        )
                    }
                    )
                    if (responseJson.result.clubs.length == 0) {
                        this.setState({ dataEnded: true });
                    }
                    let newOffSet = this.state.offset + 1
                    this.setState({ offset: newOffSet, loaded: false })
                }).catch(err => { console.log(err) });
            })
        }
    }

    async componentDidMount() {
        this.fetch_new_data();
    }
    render() {
        return (
            <View style={{ flex: 1, marginTop: 10 }}>
                {!this.state.CustomerClubData.length == 0 ?
                    <FlatList
                        extraData={this.state.loaded}
                        keyExtractor={(item, index) => { return index.toString() }}
                        data={this.state.CustomerClubData}
                        onEndReachedThreshold={0.01}
                        onEndReached={() => { this.fetch_new_data() }}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                onPress={() => this.navigate_shop(item.shop_id)} style={{ width: '97%', height: 110, backgroundColor: 'white', alignSelf: 'center', elevation: 5, marginVertical: 10, flexDirection: 'row-reverse' }}>
                                <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image resizeMode='cover' style={{ height: '90%', width: '90%', borderRadius: 5 }} source={{ uri: item.pic_link }} />
                                </View>
                                <View style={{ flex: 4 }}>
                                    <View style={{ flex: 3, flexDirection: 'row-reverse' }}>
                                        <View style={{ flex: 1, justifyContent: 'space-around', padding: 6 }}>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11 }}>{item.title}</Text>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.address}</Text>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 8 }}>{item.type}</Text>
                                        </View>
                                        <View style={{ flex: 1, padding: 6, justifyContent: 'center' }}>
                                            <View style={{ height: 22, width: 30, backgroundColor: 'green', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white' }}>{item.percent}</Text>
                                            </View>
                                            {/* <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 8, textAlign: 'left' }}>{item.comment} نظر</Text> */}
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', padding: 6 }}>
                                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>موجودی باشگاه مشتریان: {item.score}</Text>
                                            <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../../../images/logos/coinloyalpurpule.png')} />
                                            {/* <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 9 }}>{item.stock} </Text> */}
                                        </View>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: '#8f8f8f' }}>هزینه ارسال:{item.shipPrice} </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        } /> : !this.state.loaded && <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 25, textAlign: 'center', marginTop: 100, marginHorizontal: 20, color: '#573c65' }}>آگهی تخفیفی برای این دسته در باشگاه مشتریان موجود نیست!</Text>}
                {(this.state.loaded === true) && <ActivityIndicator />}

            </View >
        )
    }
}

export default CustomerClub

