import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Dimensions, PixelRatio, SafeAreaView, FlatList, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import Styles from "./css/CompleteHomePage.css";
import { Icon } from "native-base";
import { P_URL, L_URL, I_URL, S_URL } from '../PUBLICURLs';
import CountDown from 'react-native-countdown-component';
import get_key from '../Auth';
import { convertCost } from '../external/convert_cost';
export default class CompleteHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offerItemDataClustered: [],
            bannerDataLoaded: false,
            bannersData: [],
            myClubDataLoaded: false,
            scoinAds: [],
            bestAds: [],
            dataFetched: false,
            loyalDataLoaded: false,
            pointItemData: [],
            offerItemData: [],
            loyality_token: ''
        };
    }
    buy_from_loyality_club = (product_id, shop_id) => {
        fetch(L_URL + 'addorder',{method: 'post', headers: {'Authorization': this.state.loyality_token, 'content-type': 'application/json'}, 
        body : JSON.stringify({product_id: product_id, number: 1})}).then(response => {
            response.json().then(responseJson => {
                console.log(responseJson , ' order log');
                this.props.navigation.navigate('webview',{type_of_webview: 1, token: this.state.loyality_token, 
                    url: S_URL + shop_id, title: 'صفحه فروشگاه'});
            });
        });
    }
    go_shop = (shop_id) => {
        this.props.navigation.navigate('webview',{type_of_webview: 1, token: this.state.loyality_token, 
            url: S_URL + shop_id, title: 'صفحه فروشگاه'});
    }
    async get_loyality_token() {

        const username = await this.getUsername();
        // if (token != '')
        await fetch(P_URL + 'userData?userID=' + username).then(response => {
            response.json().then(async responseJson => {
                await fetch(L_URL + 'login', {
                    method: 'post', body: JSON.stringify({ username: responseJson.phonenumber, password: 'SUPERPASSWORD' }), headers: {
                        'content-type': 'application/json'
                    }
                }).then(response2 => {
                    response2.json().then(async responseJson2 => {
                        this.setState({loyality_token: 'Bearer ' + responseJson2.result.token});
                        await AsyncStorage.setItem('loyality_token', 'Bearer ' + responseJson2.result.token);
                        let token = 'Bearer ' + responseJson2.result.token;
                        fetch(L_URL + 'GetMyOffers    ', { method: 'post', headers: { 'content-type': 'application/json', 'Authorization': token } }).then(response => {
                            response.json().then(responseJson => {
                                console.log(responseJson)
                                responseJson.result.offers.map(offer => {
                                    offer.products.map(item => {
                                        let new_price = parseInt(item.price) - (parseInt(item.price) * item.offers.percentage / 100)
                                    // { item: 'پاستا پنه 13', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
                                    var date = new Date(item.offers.end_time);                                    
                                    var hours = date.getHours();
                                    var minutes = date.getMinutes();
                                    var seconds = date.getSeconds();
                                    let d = new Date(0);
                                    let utc = d.getTime() + (d.getTimezoneOffset() * 60);
                                    let nd = new Date(utc)
                                    console.log();//(hours - currentHour)*3600 + (minutes - currentMinute)*60 + seconds - currentSeconds);
                                    this.state.offerItemData.push({
                                        item: item.title, currentPrice: new_price, lastPrice: item.price, timeRemain:
                                        10,
                                        shipPrice: 'رایگان', pointNeed: item.offers.coin, pointPercent: item.offers.percentage.toString() + '%',
                                        pic_link: I_URL + item.picture + '/', product_id: item.id, shop_id: item.shop_id
                                    })
                                    })
                                });
                                for (let i = 0; i < this.state.offerItemData.length - 1; i += 2) {
                                    this.state.offerItemDataClustered.push([this.state.offerItemData[i], this.state.offerItemData[i + 1]]);
                                }
                                if (this.state.offerItemData.length % 2 != 0)
                                    this.state.offerItemDataClustered.push([this.state.offerItemData[this.state.offerItemData.length - 1]]);
                                this.setState({ loyalDataLoaded: true });
                            });
                        });
                        fetch(L_URL + 'GetMyClubs', { method: 'post', headers: { 'content-type': 'application/json', 'Authorization': token } }).then(response => {
                            response.json().then(responseJson => {
                                console.log(responseJson,'fgfgfgfgfgf')
                                responseJson.result.clubs.map(i => {
                                    let item = i.shop_info
                                    this.state.pointItemData.push({ title: item.shop_name, address: item.neighbourhood, type: item.labels[0].label, shopPoint: i.score, pointPercent: item.stars, pic_link:I_URL + item.picture + '/', shipPrice: 'رایگان', shop_id:i.shop_info.id });
                                });
                                this.setState({ myClubDataLoaded: true });
                            });
                        });
                    })
                }).catch(err => { console.log(err) })
            });
        });
    }
    async _getBannersData() {
        var username = await this.getUsername()
        fetch(P_URL + 'get_homepage_banners?username=' + username, { headers: { Authorization: get_key() } }).then(response => {
            response.json().then(responseJson => {
                responseJson.map(item => {
                    this.state.bannersData.push({ banner_id: item.banner_id, type_of: item.type_of, src: item.src, args: JSON.parse(item.args) })
                });
                this.setState({ bannerDataLoaded: true });
            });
        }
        )
    }
    _bannerEvent(i) {
        this.props.navigation.navigate('GroupADs', this.state.bannersData[i].args);
    }

    async getUsername() {
        try {
            let token = await AsyncStorage.getItem('username');
            return token;
        } catch (error) {
            Alert.alert(error.toString());
        }
    }
    async getToken() {
        try {
            let token = await AsyncStorage.getItem('loyality_token');
            return token;
        } catch (error) {
            Alert.alert(error.toString());
        }
    }
    _set_ads_state(s, b, d) {
        this.setState({ scoinAds: s, bestAds: b, dataFetched: d });

    }
    async componentDidMount() {
        let token = await this.get_loyality_token();
        let username = await this.getUsername();
        fetch(P_URL + 'homepage?username=' + username, { headers: { Authorization: get_key() } }).then(response => {
            response.json().then(responseJson => {
                this._set_ads_state(responseJson.scoinAds, responseJson.best, true);
            });
        });
        this._getBannersData();


    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView style={{ flex: 1, backgroundColor: '#F3F3F3' }}>

                    {/* عنوان امتیازات باشگاه مشتریان */}
                    <View style={Styles.titles.View}>
                        <View style={Styles.titles.Right.View}>
                            <Text style={Styles.titles.Txt} >امتیازات باشگاه مشتریان</Text>
                            <Icon
                                onPress={() => this.props.navigation.navigate('Guide', { id: 1 })}
                                name='help-circle-outline' style={Styles.titles.Right.Icon} />
                        </View>
                        <TouchableOpacity style={Styles.titles.Left.View}
                        onPress={() => this.props.navigation.navigate('ShowAll', { cid: -2 })}>
                            <Text style={Styles.titles.Txt}>نمایش همه</Text>
                            <Icon
                                name="chevron-left" type='EvilIcons' style={Styles.titles.Left.Icon} />
                        </TouchableOpacity>
                    </View>
                    {/* end عنوان متیازات باشگاه مشتریان */}
                    {/* کارد امتیازات باشگاه مشتریان  */}
                    <View style={{ marginHorizontal: '1.5%' }}>
                        <FlatList
                            inverted
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            extraData={this.state.myClubDataLoaded}
                            data={this.state.pointItemData}
                            keyExtractor={(item, index) => { return index.toString() }}
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress = {() => this.go_shop(item.shop_id)}>
                                    <View style={Styles.customClub.Main}>
                                        {item.pointPercent && <View style={Styles.customClub.Label.View}>
                                            <Text style={Styles.customClub.Label.Txt}>{item.pointPercent}</Text>
                                        </View>}
                                        <View style={Styles.customClub.Header.View}>
                                            <Image resizeMode='cover' style={Styles.customClub.Header.Image} source={{uri: item.pic_link}} />
                                        </View>
                                        <View style={Styles.customClub.Body.View}>
                                            <Text style={Styles.customClub.Body.topTxt}>{item.title}</Text>
                                            <Text style={Styles.customClub.Body.middleTxt}>{item.address}</Text>
                                            <Text style={Styles.customClub.Body.bottomTxt}>{item.type}</Text>
                                        </View>
                                        <View style={Styles.customClub.Footer.View}>
                                            <Text style={Styles.customClub.Footer.TxtRight}>موجودی باشگاه مشتریان:</Text>
                                            <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                                                <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../../images/logos/coinloyalpurpule.png')} />
                                                <Text style={Styles.customClub.Footer.Txt}>{item.shopPoint} </Text>
                                            </View>
                                        </View>
                                    </View>

                                </TouchableOpacity>
                            } />
                    </View>
                    {/*end کارد امتیازات باشگاه مشتریان  */}
                    {this.state.bannerDataLoaded && <TouchableOpacity style={{ maxHeight: 120, width: '97%', alignSelf: 'center', marginVertical: 15, elevation: 5 }} onPress={() => this._bannerEvent(0)} >
                        <Image resizeMode='stretch' style={{ width: '100%', height: '100%' }} source={{ uri: this.state.bannersData[0].src }} />
                    </TouchableOpacity>}

                    {/* عنوان پیشنهادات باشگاه مشتریان */}
                    <View style={Styles.titles.View}>
                        <View style={Styles.titles.Right.View}>
                            <Text style={Styles.titles.Txt}>پیشنهادات باشگاه مشتریان</Text>
                            <Icon
                                onPress={() => this.props.navigation.navigate('Guide', { id: 2 })}
                                name='help-circle-outline' style={Styles.titles.Right.Icon} />
                        </View>
                        <TouchableOpacity style={Styles.titles.Left.View}
                        onPress={() => this.props.navigation.navigate('ShowAll', { cid: -3 })}>
                            <Text style={Styles.titles.Txt}>نمایش همه</Text>
                            <Icon name="chevron-left" type='EvilIcons' style={Styles.titles.Left.Icon} />
                        </TouchableOpacity>
                    </View>
                    {/* end عنوان پیشنهادات باشگاه مشتریان */}
                    {/* کارد پیشنهادات باشگاه مشتریان */}
                    <View style={{ marginHorizontal: '1.5%' }}>
                        <FlatList
                            inverted
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={this.state.offerItemDataClustered}
                            extraData={this.state.loyalDataLoaded}
                            keyExtractor={(item, index) => { return index.toString() }}
                            renderItem={({ item }) =>
                                <View>
                                    <TouchableOpacity 
                                    onPress={() => this.buy_from_loyality_club(item[0].product_id, item[0].shop_id)}
                                    style={Styles.offerCustom.View}>
                                        <View style={Styles.offerCustom.Top.View}>
                                            <View style={Styles.offerCustom.Top.Right.View}>
                                                <View style={{ height: 20, width: 20, backgroundColor: '#573C65', position: 'absolute', zIndex: 1, right: '5%', top: '5%', borderTopRightRadius: 5, borderBottomLeftRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 8, color: 'white' }}>{item[0].pointPercent}</Text>
                                                </View>
                                                <Image resizeMode='cover' style={{ height: '90%', width: '90%', borderRadius: 5 }} source={{ uri: item[0].pic_link }} />
                                            </View>
                                            <View style={{ flex: 2, padding: 10, justifyContent: 'space-around', borderBottomWidth: .5, borderStyle: 'dotted', borderColor: 'gray' }}>
                                                <View><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, }}>{item[0].item}</Text></View>
                                                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, textDecorationLine: 'line-through', color: 'gray' }}>{item[0].lastPrice} تومان</Text>
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item[0].currentPrice} تومان</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                    <View style={{ height: 20, minWidth: 80, borderColor: 'gray', borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'gray' }}>موجودی: {item[0].stock}</Text>
                                                    </View>
                                                    <Icon name="basket" style={{ fontSize: 20, marginRight: 5, color: '#573c65' }} />
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1.2, padding: 10, justifyContent: 'space-around' }}>
                                            <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <View style={{ height: 20, minWidth: 80, borderColor: '#f7bfe2', borderWidth: 1.5, borderRadius: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                                    <Icon name="ios-timer" style={{ fontSize: 18, marginRight: 5, color: '#573c65' }} />
                                                    <CountDown
                                                        size={5}
                                                        until={parseInt(item[0].timeRemain)}
                                                        digitStyle={{ backgroundColor: '#FFF' }}
                                                        digitTxtStyle={{ color: 'black', fontSize: 8, fontFamily: 'IRANSans(FaNum)' }}
                                                        separatorStyle={{ color: 'black' }}
                                                        timeToShow={['D', 'H', 'M', 'S']}
                                                        timeLabels={{ m: null, s: null }}
                                                        showSeparator
                                                    />
                                                </View>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: '#8f8f8f' }}>هزینه ارسال:{item[0].shipPrice} تومان</Text>
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11, marginStart: 5 }}>امتیاز مورد:</Text>
                                                <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../../images/logos/coinloyalpurpule.png')} />
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginEnd: 5 }}>{item[0].pointNeed}</Text>
                                            </View>
                                        </View>

                                    </TouchableOpacity>
                                    {item.length > 1 &&
                                        <TouchableOpacity
                                        onPress = {() => this.buy_from_loyality_club(item[1].product_id, item[1].shop_id)}
                                        style={Styles.offerCustom.View}>
                                            <View style={Styles.offerCustom.Top.View}>
                                                <View style={Styles.offerCustom.Top.Right.View}>
                                                    <View style={{ height: 20, width: 20, backgroundColor: '#573C65', position: 'absolute', zIndex: 1, right: '5%', top: '5%', borderTopRightRadius: 5, borderBottomLeftRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 8, color: 'white' }}>{item[1].pointPercent}</Text>
                                                    </View>
                                                    <Image resizeMode='cover' style={{ height: '90%', width: '90%', borderRadius: 5 }} source={{uri: item[1].pic_link}} />
                                                </View>
                                                <View style={{ flex: 2, padding: 10, justifyContent: 'space-around', borderBottomWidth: .5, borderStyle: 'dotted', borderColor: 'gray' }}>
                                                    <View><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>{item[1].item}</Text></View>
                                                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, textDecorationLine: 'line-through', color: 'gray' }}>{item[1].lastPrice} تومان</Text>
                                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item[1].currentPrice} تومان</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                        <View style={{ height: 20, width: 80, borderColor: 'gray', borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'gray' }}>موجودی: {item[1].stock}</Text>
                                                        </View>
                                                        <Icon name="basket" style={{ fontSize: 20, marginRight: 5, color: '#573c65' }} />
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1.2, padding: 10, justifyContent: 'space-around' }}>
                                                <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <View style={{ height: 20, minWidth: 80, borderColor: '#f7bfe2', borderWidth: 1.5, borderRadius: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                                        <Icon name="ios-timer" style={{ fontSize: 18, marginRight: 5, color: '#573c65' }} />
                                                        <CountDown
                                                        size={5}
                                                        until={parseInt(item[1].timeRemain)}
                                                        digitStyle={{ backgroundColor: '#FFF' }}
                                                        digitTxtStyle={{ color: 'black', fontSize: 8, fontFamily: 'IRANSans(FaNum)' }}
                                                        separatorStyle={{ color: 'black' }}
                                                        timeToShow={['D', 'H', 'M', 'S']}
                                                        timeLabels={{ m: null, s: null }}
                                                        showSeparator
                                                    />
                                                    </View>
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: '#8f8f8f' }}>هزینه ارسال:{item[1].shipPrice} تومان</Text>
                                                </View>
                                                <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11, marginStart: 2 }}> امتیاز مورد نیاز مخصوص کافه سپنتاب:</Text>
                                                    <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../../images/logos/coinloyalpurpule.png')} />
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}>{item[1].pointNeed} </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    }
                                </View>
                            } />
                    </View>
                    {/*end کارد پیشنهادات باشگاه مشتریان */}
                    {this.state.bannerDataLoaded && <TouchableOpacity style={{ maxHeight: 120, width: '97%', alignSelf: 'center', marginVertical: 15, elevation: 5 }} onPress={() => this._bannerEvent(1)} >
                        <Image resizeMode='stretch' style={{ width: '100%', height: '100%' }} source={{ uri: this.state.bannersData[1].src }} />
                    </TouchableOpacity>}
                    {this.state.bannerDataLoaded && <TouchableOpacity style={{ maxHeight: 120, width: '97%', alignSelf: 'center', marginVertical: 15, elevation: 5 }} onPress={() => this._bannerEvent(2)} >
                        <Image resizeMode='stretch' style={{ width: '100%', height: '100%' }} source={{ uri: this.state.bannersData[2].src }} />
                    </TouchableOpacity>
                    }
                    {/* عنوان نزدیک‌‌ ترین باشگاه مشتریان */}
                    <View style={{ flexDirection: 'row-reverse', marginTop: 10, marginHorizontal: '1.5%', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 13 }}>نزدیک‌‌ ترین باشگاه مشتریان</Text>
                            <Icon
                                onPress={() => this.props.navigation.navigate('Guide', { id: 3 })}
                                name='help-circle-outline' style={{ fontSize: 20, marginRight: 5, transform: [{ scaleX: -1 }], color: '#a5a5a5' }} />
                        </View>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>نمایش همه</Text>
                            <Icon name="chevron-left" type='EvilIcons' style={{ fontSize: 20, marginRight: 5 }} />
                        </View>
                    </View>
                    {/* end عنوان نزدیک‌‌ ترین باشگاه مشتریان */}
                    {/* کارد نزدیک‌‌ ترین باشگاه مشتریان  */}
                    <View style={{ marginHorizontal: '1.5%' }}>
                        <FlatList
                            inverted
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={this.state.pointItemData}
                            keyExtractor={(item, index) => { return index.toString() }}
                            renderItem={({ item }) =>
                                <View style={{ height: 210, width: 170, marginTop: 10, marginHorizontal: 5, borderRadius: 6, elevation: 5, marginBottom: 5, backgroundColor: 'white' }}>
                                    <View style={{ position: 'absolute', zIndex: 1, width: 35, height: 20, backgroundColor: '#573C65', borderTopLeftRadius: 6, borderBottomRightRadius: 6, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white' }}>{item.pointPercent}</Text>
                                    </View>
                                    <View style={{ flex: 4, borderTopRightRadius: 6, borderTopLeftRadius: 6, overflow: 'hidden' }}>
                                        <Image resizeMode='cover' style={{ height: '100%', width: '100%', borderTopRightRadius: 6, borderTopLeftRadius: 6 }} source={require('../../images/sample_adv.jpg')} />
                                    </View>
                                    <View style={{ flex: 2, padding: 5 }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>{item.title}</Text>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: '#8f8f8f' }}>{item.address}</Text>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: '#8f8f8f' }}>{item.type}</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', paddingHorizontal: 5, alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: '#8f8f8f' }}>هزینه ارسال:{item.shipPrice} تومان</Text>
                                    </View>
                                </View>
                            } />
                    </View>
                    {/*end کارد نزدیک‌‌ ترین باشگاه مشتریان  */}

                    {/* با SCoin عنوان */}
                    <View style={{ flexDirection: 'row-reverse', marginTop: 10, marginHorizontal: '1.5%', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 13 }}>با SCoin</Text>
                            <Icon
                                onPress={() => this.props.navigation.navigate('Guide', { id: 4 })}
                                name='help-circle-outline' style={{ fontSize: 20, marginRight: 5, transform: [{ scaleX: -1 }], color: '#a1a1a1' }} />
                        </View>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('ShowAll', { cid: 52 })}
                            style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>نمایش همه</Text>
                            <Icon name="chevron-left" type='EvilIcons' style={{ fontSize: 20, marginRight: 5 }} />
                        </TouchableOpacity>
                    </View>
                    {/* end با SCoin عنوان*/}
                    {/*  با SCoin کارد*/}
                    <View style={{ marginHorizontal: '1.5%' }}>
                        <FlatList
                            inverted
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            extraData={this.state.dataFetched}
                            data={this.state.scoinAds}
                            keyExtractor={(item, index) => { return index.toString() }}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    onPress={() => { this.props.navigation.navigate('GroupADs', { ad_id: item.ad_id }) }}
                                    style={{ height: 180, width: 320, marginTop: 10, marginBottom: 5, marginHorizontal: 5, elevation: 5, borderRadius: 10, backgroundColor: 'white' }}>
                                    <View style={{ flex: 2, flexDirection: 'row-reverse' }}>
                                        <View style={{ flex: 1.2, justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ height: 20, minWidth: 20, backgroundColor: '#573C65', position: 'absolute', zIndex: 1, right: '5%', top: '5%', borderTopRightRadius: 5, borderBottomLeftRadius: 5, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 2 }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 8, color: 'white' }}>{item.off}</Text>
                                            </View>
                                            <Image resizeMode='cover' style={{ height: '90%', width: '90%', borderRadius: 5 }} source={{ uri: item.pic_link }} />
                                        </View>
                                        <View style={{ flex: 2, padding: 10, justifyContent: 'space-around', borderBottomWidth: .5, borderStyle: 'dotted', borderColor: 'gray' }}>
                                            <View><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>{item.title}</Text></View>
                                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'gray', textDecorationLine: 'line-through' }}>{convertCost(item.old_cost)},000 تومان</Text>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{convertCost(item.new_cost)},000 تومان</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                <View style={{ height: 20, width: 80, borderColor: '#F7BFE2', borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: '#8f8f8f' }}>تعداد خرید: {item.bought}</Text>
                                                </View>

                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1.2, padding: 10, justifyContent: 'space-around' }}>
                                        <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{ height: 25, minWidth: 100, borderColor: '#F7BFE2', borderWidth: 1.5, borderRadius: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                                <Icon name="ios-timer" style={{ fontSize: 18, marginRight: 5, color: '#573c65' }} />
                                                <CountDown
                                                    size={5}
                                                    until={parseInt(item.time)}
                                                    digitStyle={{ backgroundColor: '#FFF' }}
                                                    digitTxtStyle={{ color: 'black', fontSize: 8, fontFamily: 'IRANSans(FaNum)' }}
                                                    separatorStyle={{ color: 'black' }}
                                                    timeToShow={['D', 'H', 'M', 'S']}
                                                    timeLabels={{ m: null, s: null }}
                                                    showSeparator
                                                />
                                            </View>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: '#8f8f8f' }}>هزینه ارسال:{item.post_cost} </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row-reverse' }}>
                                            <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}> :مقدار SCoin مورد نیاز</Text>
                                                <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../../images/logos/scoin_purpule.png')} />
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}>{item.s_cost} </Text>
                                            </View>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}>امتیاز: {item.rate.toFixed(1)}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            } />
                    </View>
                    {/*end  با SCoin کارد*/}
                    {/* عنوان برترین تخفیف‌ها*/}
                    <View style={{ flexDirection: 'row-reverse', marginTop: 10, marginHorizontal: '1.5%', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 13 }}>برترین تخفیف‌ها</Text>
                            <Icon
                                onPress={() => this.props.navigation.navigate('Guide', { id: 5 })}
                                name='help-circle-outline' style={{ fontSize: 20, marginRight: 5, transform: [{ scaleX: -1 }], color: '#a1a1a1' }} />
                        </View>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('ShowAll', { cid: -1 })}
                            style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>نمایش همه</Text>
                            <Icon name="chevron-left" type='EvilIcons' style={{ fontSize: 20, marginRight: 5 }} />
                        </TouchableOpacity>
                    </View>
                    {/*end عنوان برترین تخفیف‌ها*/}
                    {/*   کارد برترین تخفیفها*/}
                    <View style={{ marginHorizontal: '1.5%' }}>
                        <FlatList
                            inverted
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            extraData={this.state.dataFetched}
                            data={this.state.bestAds}
                            keyExtractor={(item, index) => { return index.toString() }}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    onPress={() => { this.props.navigation.navigate('GroupADs', { ad_id: item.ad_id }) }}
                                    style={{ height: 180, width: 320, marginTop: 10, marginBottom: 5, marginHorizontal: 5, elevation: 5, borderRadius: 10, backgroundColor: 'white' }}>
                                    <View style={{ flex: 2, flexDirection: 'row-reverse' }}>
                                        <View style={{ flex: 1.2, justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ height: 20, minWidth: 20, backgroundColor: '#573C65', position: 'absolute', zIndex: 1, right: '5%', top: '5%', borderTopRightRadius: 5, borderBottomLeftRadius: 5, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 2 }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 8, color: 'white' }}>{item.off}</Text>
                                            </View>
                                            <Image resizeMode='cover' style={{ height: '90%', width: '90%', borderRadius: 5 }} source={{ uri: item.pic_link }} />
                                        </View>
                                        <View style={{ flex: 2, padding: 10, justifyContent: 'space-around', borderBottomWidth: .5, borderStyle: 'dotted', borderColor: 'gray' }}>
                                            <View><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>{item.title}</Text></View>
                                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'gray', textDecorationLine: 'line-through' }}>{convertCost(item.old_cost)},000 تومان</Text>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{convertCost(item.new_cost)},000 تومان</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                <View style={{ height: 20, width: 80, borderColor: '#F7BFE2', borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: '#8f8f8f' }}>تعداد خرید: {item.bought}</Text>
                                                </View>

                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1.2, padding: 10, justifyContent: 'space-around' }}>
                                        <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{ height: 25, minWidth: 80, borderColor: '#F7BFE2', borderWidth: 1.5, borderRadius: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                                <Icon name="ios-timer" style={{ fontSize: 18, marginRight: 5, color: '#573c65' }} />
                                                <CountDown
                                                    size={5}
                                                    until={parseInt(item.time)}
                                                    digitStyle={{ backgroundColor: '#FFF' }}
                                                    digitTxtStyle={{ color: 'black', fontSize: 8, fontFamily: 'IRANSans(FaNum)' }}
                                                    separatorStyle={{ color: 'black' }}
                                                    timeToShow={['D', 'H', 'M', 'S']}
                                                    timeLabels={{ m: null, s: null }}
                                                    showSeparator
                                                />
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row-reverse' }}>
                                            <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}>مقدار  SCoin مورد نیاز</Text>
                                                <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../../images/logos/scoin_purpule.png')} />
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}>{item.s_cost} </Text>
                                            </View>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}>امتیاز: {item.rate.toFixed(1)}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            } />
                    </View>
                    {/* end  کارد برترین تخفیفها*/}
                    {this.state.bannerDataLoaded && <TouchableOpacity style={{ maxHeight: 120, width: '97%', alignSelf: 'center', marginVertical: 15, elevation: 5 }} onPress={() => this._bannerEvent(3)} >
                        <Image resizeMode='stretch' style={{ width: '100%', height: '100%' }} source={{ uri: this.state.bannersData[3].src }} />
                    </TouchableOpacity>}
                    {this.state.bannerDataLoaded && <TouchableOpacity style={{ maxHeight: 120, width: '97%', alignSelf: 'center', marginVertical: 15, elevation: 5 }} onPress={() => this._bannerEvent(4)} >
                        <Image resizeMode='stretch' style={{ width: '100%', height: '100%' }} source={{ uri: this.state.bannersData[4].src }} />
                    </TouchableOpacity>
                    }
                </ScrollView>
            </SafeAreaView>
        );
    }
}

