import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Dimensions, PixelRatio, SafeAreaView, FlatList, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import Styles from "./css/CompleteHomePage.css";
import { Icon } from "native-base";
import { P_URL } from '../PUBLICURLs';
import CountDown from 'react-native-countdown-component';
export default class CompleteHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offerItemDataClustered: [],
            bannerDataLoaded: false,
            bannersData: [],
            scoinAds: [],
            bestAds: [],
            dataFetched: false,
            pointItemData: [
                { title: 'رستوران 1', address: 'چهارراه ولیعصر', type: 'ایرانی سنتی', shopPoint: '1000', pointPercent: '4.9', pic_link: '', shipPrice: '2,000' },
                { title: 'رستوران 2', address: 'چهارراه ولیعصر', type: 'ایرانی سنتی', shopPoint: '1000', pointPercent: '4.9', pic_link: '', shipPrice: '2,000' },
                { title: 'رستوران 3', address: 'چهارراه ولیعصر', type: 'ایرانی سنتی', shopPoint: '1000', pointPercent: '4.9', pic_link: '', shipPrice: '2,000' },
                { title: 'رستوران 4', address: 'چهارراه ولیعصر', type: 'ایرانی سنتی', shopPoint: '1000', pointPercent: '4.9', pic_link: '', shipPrice: '2,000' },
                { title: 'رستوران 5', address: 'چهارراه ولیعصر', type: 'ایرانی سنتی', shopPoint: '1000', pointPercent: '4.9', pic_link: '', shipPrice: '2,000' },
                { title: 'رستوران 6', address: 'چهارراه ولیعصر', type: 'ایرانی سنتی', shopPoint: '1000', pointPercent: '4.9', pic_link: '', shipPrice: '2,000' },
                { title: 'رستوران 7', address: 'چهارراه ولیعصر', type: 'ایرانی سنتی', shopPoint: '1000', pointPercent: '4.9', pic_link: '', shipPrice: '2,000' },
                { title: 'رستوران 8', address: 'چهارراه ولیعصر', type: 'ایرانی سنتی', shopPoint: '1000', pointPercent: '4.9', pic_link: '', shipPrice: '2,000' },
                { title: 'رستوران 9', address: 'چهارراه ولیعصر', type: 'ایرانی سنتی', shopPoint: '1000', pointPercent: '4.9', pic_link: '', shipPrice: '2,000' },
                //{ title: 'رستوران 9', address: 'چهارراه ولیعصر', type: 'ایرانی سنتی', shopPoint: '1000', pointPercent: '4.9', pic_link: '', shipPrice: '2,000' },

            ],
            offerItemData: [
                { item: 'پاستا پنه 1', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
                { item: 'پاستا پنه 2', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
                { item: 'پاستا پنه 3', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
                { item: 'پاستا پنه 4', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
                { item: 'پاستا پنه 5', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
                { item: 'پاستا پنه 6', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
                { item: 'پاستا پنه 7', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
                { item: 'پاستا پنه 8', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
                { item: 'پاستا پنه 9', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
                { item: 'پاستا پنه 10', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
                { item: 'پاستا پنه 11', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
                { item: 'پاستا پنه 12', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
                { item: 'پاستا پنه 13', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
            ]
        };


    }
    async _getBannersData() {
        var username = await this.getUsername()
        fetch(P_URL + 'get_homepage_banners?username=' + username).then(response => {
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
    _set_ads_state(s, b, d) {
        console.table(s + 'scoin')
        this.setState({ scoinAds: s, bestAds: b, dataFetched: d });

    }
    async componentDidMount() {
        let username = await this.getUsername();
        fetch(P_URL + 'homepage?username=' + username).then(response => {
            response.json().then(responseJson => {
                this._set_ads_state(responseJson.scoinAds, responseJson.best, true);
            });
        });
        this._getBannersData();
        for (let i = 0; i < this.state.offerItemData.length - 1; i += 2) {
            this.state.offerItemDataClustered.push([this.state.offerItemData[i], this.state.offerItemData[i + 1]]);
        }
        if (this.state.offerItemData.length % 2 != 0)
            this.state.offerItemDataClustered.push([this.state.offerItemData[this.state.offerItemData.length - 1]])

    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView style={{ flex: 1, backgroundColor: '#F3F3F3' }}>
                    {/* شانس امروز */}
                    <View style={{ backgroundColor: '#FDD93C', width: '97%', height: 60, alignSelf: 'center', marginTop: 8, borderRadius: 6, alignItems: 'center', justifyContent: 'center' }} >
                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 16, fontWeight: '900' }}>شانس امروزتو امتحان کن!</Text>
                    </View>
                    {/*end شانس امروز */}
                    {/* عنوان امتیازات باشگاه مشتریان */}
                    <View style={Styles.titles.View}>
                        <View style={Styles.titles.Right.View}>
                            <Text style={Styles.titles.Txt} >امتیازات باشگاه مشتریان</Text>
                            <Icon name='help-circle-outline' style={Styles.titles.Right.Icon} />
                        </View>
                        <View style={Styles.titles.Left.View}>
                            <Text style={Styles.titles.Txt}>نمایش همه</Text>
                            <Icon name="chevron-left" type='EvilIcons' style={Styles.titles.Left.Icon} />
                        </View>
                    </View>
                    {/* end عنوان متیازات باشگاه مشتریان */}
                    {/* کارد امتیازات باشگاه مشتریان  */}
                    <View style={{ marginHorizontal: '1.5%' }}>
                        <FlatList
                            inverted
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={this.state.pointItemData}
                            keyExtractor={(item, index) => { return index.toString() }}
                            renderItem={({ item }) =>
                                <View>
                                    <View style={Styles.customClub.Main}>
                                        <View style={Styles.customClub.Label.View}>
                                            <Text style={Styles.customClub.Label.Txt}>{item.pointPercent}</Text>
                                        </View>
                                        <View style={Styles.customClub.Header.View}>
                                            <Image resizeMode='cover' style={Styles.customClub.Header.Image} source={require('../../images/sample_adv.jpg')} />
                                        </View>
                                        <View style={Styles.customClub.Body.View}>
                                            <Text style={Styles.customClub.Body.topTxt}>{item.title}</Text>
                                            <Text style={Styles.customClub.Body.middleTxt}>{item.address}</Text>
                                            <Text style={Styles.customClub.Body.bottomTxt}>{item.type}</Text>
                                        </View>
                                        <View style={Styles.customClub.Footer.View}>
                                            <Text style={Styles.customClub.Footer.TxtRight}>موجودی باشگاه مشتریان:</Text>
                                            <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                                                <Icon style={{ fontSize: 10,color:'#573c65' }} name="sellcast" type='FontAwesome5' />
                                                <Text style={Styles.customClub.Footer.Txt}>{item.shopPoint} </Text>
                                            </View>
                                        </View>
                                    </View>

                                </View>
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
                            <Icon name='help-circle-outline' style={Styles.titles.Right.Icon} />
                        </View>
                        <View style={Styles.titles.Left.View}>
                            <Text style={Styles.titles.Txt}>نمایش همه</Text>
                            <Icon name="chevron-left" type='EvilIcons' style={Styles.titles.Left.Icon} />
                        </View>
                    </View>
                    {/* end عنوان پیشنهادات باشگاه مشتریان */}
                    {/* کارد پیشنهادات باشگاه مشتریان */}
                    <View style={{ marginHorizontal: '1.5%' }}>
                        <FlatList
                            inverted
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={this.state.offerItemDataClustered}
                            keyExtractor={(item, index) => { return index.toString() }}
                            renderItem={({ item }) =>
                                <View>
                                    <View style={Styles.offerCustom.View}>
                                        <View style={Styles.offerCustom.Top.View}>
                                            <View style={Styles.offerCustom.Top.Right.View}>
                                                <View style={{ height: 20, width: 20, backgroundColor: '#573C65', opacity: .7, position: 'absolute', zIndex: 1, right: '5%', top: '5%', borderTopRightRadius: 5, borderBottomLeftRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 8, color: 'white' }}>{item[0].pointPercent}</Text>
                                                </View>
                                                <Image resizeMode='cover' style={{ height: '90%', width: '90%', borderRadius: 5 }} source={require('../../images/sample_adv.jpg')} />
                                            </View>
                                            <View style={{ flex: 2, padding: 10, justifyContent: 'space-around', borderBottomWidth: .5, borderStyle: 'dotted', borderColor: 'gray' }}>
                                                <View><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, }}>{item[0].item}</Text></View>
                                                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item[0].currentPrice} تومان</Text>
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item[0].lastPrice} تومان</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                    <View style={{ height: 20, width: 80, borderColor: 'gray', borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>موجودی: {item[0].stock}</Text>
                                                    </View>
                                                    <Icon name="ios-add-circle-outline" style={{ fontSize: 20, marginRight: 5 }} />
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1.2, padding: 10, justifyContent: 'space-around' }}>
                                            <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <View style={{ height: 20, minWidth: 80, borderColor: 'gray', borderWidth: 1.5, borderRadius: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                                    <Icon name="ios-timer" style={{ fontSize: 18, marginRight: 5, color: '#573c65' }} />
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item[0].timeRemain}</Text>
                                                </View>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>هزینه ارسال:{item[0].shipPrice} تومان</Text>
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11, marginStart: 5 }}>امتیاز مورد نیاز مخصوص کافه سپنتاب:</Text>
                                                <Icon style={{ fontSize: 12, marginStart: 2 }} name="sellcast" type='FontAwesome5' />
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginEnd: 5 }}>{item[0].pointNeed}</Text>
                                            </View>
                                        </View>

                                    </View>
                                    {item.length > 1 &&
                                        <View style={Styles.offerCustom.View}>
                                            <View style={Styles.offerCustom.Top.View}>
                                                <View style={Styles.offerCustom.Top.Right.View}>
                                                    <View style={{ height: 20, width: 20, backgroundColor: '#573C65', opacity: .7, position: 'absolute', zIndex: 1, right: '5%', top: '5%', borderTopRightRadius: 5, borderBottomLeftRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 8, color: 'white' }}>{item[1].pointPercent}</Text>
                                                    </View>
                                                    <Image resizeMode='cover' style={{ height: '90%', width: '90%', borderRadius: 5 }} source={require('../../images/sample_adv.jpg')} />
                                                </View>
                                                <View style={{ flex: 2, padding: 10, justifyContent: 'space-around', borderBottomWidth: .5, borderStyle: 'dotted', borderColor: 'gray' }}>
                                                    <View><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>{item[1].item}</Text></View>
                                                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item[1].currentPrice} تومان</Text>
                                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item[1].lastPrice} تومان</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                        <View style={{ height: 20, width: 80, borderColor: 'gray', borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>موجودی: {item[1].stock}</Text>
                                                        </View>
                                                        <Icon name="ios-add-circle-outline" style={{ fontSize: 20, marginRight: 5 }} />
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1.2, padding: 10, justifyContent: 'space-around' }}>
                                                <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <View style={{ height: 20, minWidth: 80, borderColor: 'gray', borderWidth: 1.5, borderRadius: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                                        <Icon name="ios-timer" style={{ fontSize: 18, marginRight: 5,color: '#573c65' }} />
                                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item[1].timeRemain}</Text>
                                                    </View>
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>هزینه ارسال:{item[1].shipPrice} تومان</Text>
                                                </View>
                                                <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11, marginStart: 2 }}>امتیاز مورد نیاز مخصوص کافه سپنتاب:</Text>
                                                    <Icon style={{ fontSize: 12, marginStart: 2 }} name="sellcast" type='FontAwesome5' />
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}>{item[1].pointNeed}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    }
                                </View>
                            } />
                    </View>
                    {/*end کارد پیشنهادات باشگاه مشتریان */}
                    {this.state.bannerDataLoaded && <TouchableOpacity style={{ maxHeight: 120, width: '97%', alignSelf: 'center', marginVertical: 15, elevation: 5 }} onPress={() => this._bannerEvent(1)} >
                        <Image resizeMode='stretch' style={{ width: '100%', height: '100%' }} source={{ uri: this.state.bannersData[0].src }} />
                    </TouchableOpacity>}
                    {this.state.bannerDataLoaded && <TouchableOpacity style={{ maxHeight: 120, width: '97%', alignSelf: 'center', marginVertical: 15, elevation: 5 }} onPress={() => this._bannerEvent(2)} >
                        <Image resizeMode='stretch' style={{ width: '100%', height: '100%' }} source={{ uri: this.state.bannersData[0].src }} />
                    </TouchableOpacity>
                    }
                    {/* عنوان نزدیک‌‌ ترین باشگاه مشتریان */}
                    <View style={{ flexDirection: 'row-reverse', marginTop: 10, marginHorizontal: '1.5%', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>نزدیک‌‌ ترین باشگاه مشتریان</Text>
                            <Icon name='help-circle-outline' style={{ fontSize: 20, marginRight: 5, transform: [{ scaleX: -1 }] }} />
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
                                <View style={{ height: 210, width: 170, marginTop: 10, marginHorizontal: 5, borderRadius: 6, elevation: 2 }}>
                                    <View style={{ position: 'absolute', zIndex: 1, width: 35, height: 20, backgroundColor: '#573C65', opacity: .7, borderTopLeftRadius: 6, borderBottomRightRadius: 6, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white' }}>{item.pointPercent}</Text>
                                    </View>
                                    <View style={{ flex: 4, borderTopRightRadius: 6, borderTopLeftRadius: 6, overflow: 'hidden' }}>
                                        <Image resizeMode='cover' style={{ height: '100%', width: '100%', borderTopRightRadius: 6, borderTopLeftRadius: 6 }} source={require('../../images/sample_adv.jpg')} />
                                    </View>
                                    <View style={{ flex: 2, padding: 5 }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>{item.title}</Text>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.address}</Text>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.type}</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', paddingHorizontal: 5, alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>هزینه ارسال:{item.shipPrice} تومان</Text>
                                    </View>
                                </View>
                            } />
                    </View>
                    {/*end کارد نزدیک‌‌ ترین باشگاه مشتریان  */}

                    {/* با SCoin عنوان */}
                    <View style={{ flexDirection: 'row-reverse', marginTop: 10, marginHorizontal: '1.5%', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>با SCoin</Text>
                            <Icon name='help-circle-outline' style={{ fontSize: 20, marginRight: 5, transform: [{ scaleX: -1 }] }} />
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
                                    style={{ height: 180, width: 320, marginTop: 10, marginBottom: 5, marginHorizontal: 5, elevation: 2, borderRadius: 10 }}>
                                    <View style={{ flex: 2, flexDirection: 'row-reverse' }}>
                                        <View style={{ flex: 1.2, justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ height: 20, width: 20, backgroundColor: '#573C65', opacity: .7, position: 'absolute', zIndex: 1, right: '5%', top: '5%', borderTopRightRadius: 5, borderBottomLeftRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 8, color: 'white' }}>{item.off}</Text>
                                            </View>
                                            <Image resizeMode='cover' style={{ height: '90%', width: '90%', borderRadius: 5 }} source={{ uri: item.pic_link }} />
                                        </View>
                                        <View style={{ flex: 2, padding: 10, justifyContent: 'space-around', borderBottomWidth: .5, borderStyle: 'dotted', borderColor: 'gray' }}>
                                            <View><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>{item.title}</Text></View>
                                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.new_cost},000 تومان</Text>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.old_cost},000 تومان</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                <View style={{ height: 20, width: 80, borderColor: '#F7BFE2', borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>تعداد خرید: {item.bought}</Text>
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
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>هزینه ارسال:{item.post_cost} تومان</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row-reverse' }}>
                                            <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}>مقدار SCoin مورد نیاز</Text>
                                                <Icon style={{ fontSize: 12, marginStart: 2 }} name='logo-steam' />
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}>{item.s_cost}</Text>
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
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>برترین تخفیف‌ها</Text>
                            <Icon name='help-circle-outline' style={{ fontSize: 20, marginRight: 5, transform: [{ scaleX: -1 }] }} />
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
                                    style={{ height: 180, width: 320, marginTop: 10, marginBottom: 5, marginHorizontal: 5, elevation: 2, borderRadius: 10 }}>
                                    <View style={{ flex: 2, flexDirection: 'row-reverse' }}>
                                        <View style={{ flex: 1.2, justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ height: 20, width: 20, backgroundColor: '#573C65', opacity: .7, position: 'absolute', zIndex: 1, right: '5%', top: '5%', borderTopRightRadius: 5, borderBottomLeftRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 8, color: 'white' }}>{item.off}</Text>
                                            </View>
                                            <Image resizeMode='cover' style={{ height: '90%', width: '90%', borderRadius: 5 }} source={{ uri: item.pic_link }} />
                                        </View>
                                        <View style={{ flex: 2, padding: 10, justifyContent: 'space-around', borderBottomWidth: .5, borderStyle: 'dotted', borderColor: 'gray' }}>
                                            <View><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>{item.title}</Text></View>
                                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.new_cost},000 تومان</Text>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.old_cost},000 تومان</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                <View style={{ height: 20, width: 80, borderColor: '#F7BFE2', borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>تعداد خرید: {item.bought}</Text>
                                                </View>

                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1.2, padding: 10, justifyContent: 'space-around' }}>
                                        <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{ height: 25, minWidth: 80, borderColor: '#F7BFE2', borderWidth: 1.5, borderRadius: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                                <Icon name="ios-timer" style={{ fontSize: 18, marginRight: 5,color: '#573c65' }} />
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
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}>مقدار SCoin مورد نیاز</Text>
                                                <Icon style={{ fontSize: 12, marginStart: 2 }} name='logo-steam' />
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}>{item.s_cost}</Text>
                                            </View>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}>امتیاز: {item.rate.toFixed(1)}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            } />
                    </View>
                    {/* end  کارد برترین تخفیفها*/}
                    {this.state.bannerDataLoaded && <TouchableOpacity style={{ maxHeight: 120, width: '97%', alignSelf: 'center', marginVertical: 15, elevation: 5 }} onPress={() => this._bannerEvent(3)} >
                        <Image resizeMode='stretch' style={{ width: '100%', height: '100%' }} source={{ uri: this.state.bannersData[0].src }} />
                    </TouchableOpacity>}
                    {this.state.bannerDataLoaded && <TouchableOpacity style={{ maxHeight: 120, width: '97%', alignSelf: 'center', marginVertical: 15, elevation: 5 }} onPress={() => this._bannerEvent(4)} >
                        <Image resizeMode='stretch' style={{ width: '100%', height: '100%' }} source={{ uri: this.state.bannersData[0].src }} />
                    </TouchableOpacity>
                    }
                </ScrollView>
            </SafeAreaView>
        );
    }
}

