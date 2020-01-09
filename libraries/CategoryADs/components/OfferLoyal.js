import React, { Component } from 'react'
import { Text, View, FlatList, Image, AsyncStorage, ActivityIndicator } from 'react-native'
import { Icon } from 'native-base';
import CountDown from 'react-native-countdown-component';
import convertCost from '../../external/convert_cost'
import { L_URL, I_URL, S_URL } from '../../PUBLICURLs';
import { TouchableOpacity } from 'react-native-gesture-handler';

export class CustomerClub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            loaded: true,
            dataEnded: false,
            OfferLoyalData: [

            ]

        }
    }
    buy_from_loyality_club = (product_id, shop_id) => {
        fetch(L_URL + 'addorder',{method: 'post', headers: {'Authorization': this.state.loyality_token, 'content-type': 'application/json'}, 
        body : JSON.stringify({product_id: product_id, number: 1})}).then(response => {
            response.json().then(responseJson => {
                this.props.navigation.navigate('webview',{type_of_webview: 1, token: this.state.loyality_token, 
                    url: S_URL + shop_id, title: 'صفحه فروشگاه'});
            });
        });
    }
    async fetch_new_data() {
        let token = await AsyncStorage.getItem('loyality_token');
        if (!this.state.dataEnded) {
            this.setState({ loaded: true });
            fetch(L_URL + 'GetOffers?label=' + this.props.cid + '&offset=' + this.state.offset, {
                method: 'post', headers: {
                    'content-type': 'application/json',
                    'Authorization': token
                }
            }).then(response => {
                response.json().then(responseJson => {
                    responseJson.result.offers.map(item =>
                        this.state.OfferLoyalData.push(
                            { title: item.product.title, short_description: item.shop_info.description == null ? '' : item.shop_info.description, address: item.shop_info.address, old_cost: parseInt(item.product.price) / 1000, new_cost: item.product.offers.percentage * (parseInt(item.product.price) / 1000) / 100, bought: '', s_cost: item.product.offers.coin, time: item.product.offers.end_time, pic_link: I_URL + item.product.picture + '/', ad_id: item.product.id, shipPrice: 'رایگان',
                        shop_id: item.shop_info.id, product_id: item.product.id }
                        )
                    )
                    if (responseJson.result.offers.length == 0) {
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
                <FlatList
                    keyExtractor={(item, index) => { return index.toString() }}
                    data={this.state.OfferLoyalData}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                        onPress={() => this.buy_from_loyality_club(item.product_id, item.shop_id)} style={{ width: '97%', height: 110, backgroundColor: '#ffffff', alignSelf: 'center', elevation: 10, marginVertical: 10, flexDirection: 'row-reverse' }}>
                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                                <Image resizeMode='cover' style={{ height: '90%', width: '90%', borderRadius: 5 }} source={{ uri: item.pic_link }} />
                            </View>
                            <View style={{ flex: 4 }}>
                                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-around' }}>
                                    <View style={{ flex: 1, justifyContent: 'space-around', padding: 6, height: '100%' }}>
                                        <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 11 }}>{item.title}</Text>
                                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                            <View style={{ height: 25, width: 100, borderColor: '#F7BFE2', borderWidth: 1, borderRadius: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                                <Icon name="ios-timer" style={{ fontSize: 18, marginRight: 5 }} />
                                                <CountDown
                                                    size={5}
                                                    until={'5255585'}
                                                    digitStyle={{ backgroundColor: '#FFF' }}
                                                    digitTxtStyle={{ color: 'black', fontSize: 8, fontFamily: 'IRANSans(FaNum)' }}
                                                    separatorStyle={{ color: 'black' }}
                                                    timeToShow={['D', 'H', 'M', 'S']}
                                                    timeLabels={{ m: null, s: null }}
                                                    showSeparator
                                                />
                                            </View>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: '#8f8f8f', textDecorationLine: 'line-through' }}>{item.old_cost} تومان</Text>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.new_cost} تومان</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: '#8f8f8f' }}>موجودی : 10</Text>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: '#8f8f8f' }}>هزینه ارسال: {item.shipPrice}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>امتیاز مخصوص کافه سپنتاب مورد نیاز: <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../../../images/logos/coinloyalpurpule.png')} /> {item.s_cost}</Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </TouchableOpacity>
                    } />
                {(this.state.loaded === true) && <ActivityIndicator />}
            </View>
        )
    }
}

export default CustomerClub

