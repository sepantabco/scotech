import React, { Component } from 'react'
import { Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, FlatList, AsyncStorage, Linking } from 'react-native'
import Swiper from 'react-native-swiper'
import { Icon, Textarea, Toast, Root, Spinner } from 'native-base'
import CountDown from 'react-native-countdown-component'
import GroupADsHeader from '../Headers/GroupADsHeader'
import { P_URL } from '../PUBLICURLs'
import get_key from '../../libraries/Auth'
import Share from 'react-native-share';
export class GroupADs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabSelected: 0,
            TxtExpanded: false,
            TxtIconHandleName: 'arrow-dropdown-circle',
            advetData: {},
            Txt: [],
            username: "",
            dataLoaded: false,
            pic_links: [],
            related: [],
            offset: 0,
            commentEntry: [],
            comments: [],
            updatedRate: 0,
            title: "",
            ad_id: this.props.navigation.getParam('ad_id'),
            ad_link: "",
            scoin_available: 0,
            min_level: 0,
            level: 0,
        }
        this.props.navigation.setParams({
            get_title: this._get_title.bind(this)
        });
    }
    _tabSelected(tab) {
        this.setState({ tabSelected: tab })
    }

    _renderTxtHandle() {
        let TxtExpanded = this.state.TxtExpanded
        if (TxtExpanded == false) {
            var TxtIconHandleName = 'arrow-dropup-circle'
        } else {
            var TxtIconHandleName = 'arrow-dropdown-circle'

        }
        this.setState({ TxtExpanded: !TxtExpanded, TxtIconHandleName: TxtIconHandleName })
    }
    _renderTxt() {
        if (!this.state.TxtExpanded) {
            return (
                <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 12 }}>{this.state.Txt[this.state.tabSelected].substring(0, 200)}...</Text>
            )
        } else {
            return (
                <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 12 }}>{this.state.Txt[this.state.tabSelected]}</Text>
            )

        }

    }
    update_star(rate) {
        this.setState({
            updatedRate: rate
        })
    }
    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: <GroupADsHeader navigation={navigation} />,
            headerStyle: {
                backgroundColor: '#573c65',
            }
        }
    };
    _getFirst5Comment() {
        let ad_id = this.props.navigation.getParam('ad_id')
        console.log(ad_id)
        fetch(P_URL + 'receive_comments?ad_id=' + ad_id + '&offset=' + this.state.offset, { headers: { Authorization: get_key() } }).then((response) => {
            response.json().then((responseJson) => {
                this.setState({ comments: responseJson.comments })
                console.table(this.state.comments)
            })
        });
    }
    _toastShow(text) {
        Toast.show({
            text: text,
            buttonText: ''
        })
    }
    async _submitComment(commentEntry) {
        let username = await this.getUsername();
        let ad_id = this.props.navigation.getParam('ad_id')
        fetch(P_URL + 'comment?cm=' + commentEntry + '&ad_id=' + ad_id + '&username=' + username, { headers: { Authorization: get_key() } }).then((response) => {
            this._toastShow('نظر شما با موفقیت ثبت شد')

        });
    }
    async getUsername() {
        try {
            let token = await AsyncStorage.getItem('username');
            this.setState({ username: token });
            return token;
        } catch (error) {
            Alert.alert(error.toString());
        }
    }
    comments_view() {
        var newoffset = (this.state.offset + 1);
        let ad_id = this.props.navigation.getParam('ad_id')
        this.setState({ offset: newoffset });
        fetch(P_URL + 'receive_comments?ad_id=' + ad_id + '&offset=' + newoffset, { headers: { Authorization: get_key() } }).then((response) => {
            response.json().then((responseJson) => {
                let newcomments = this.state.comments.concat(responseJson.comments);
                this.setState({
                    comments: newcomments,
                })
            })
        })
    }
    fetch_data(ad_id) {
        this._getFirst5Comment();
        this.setState({ ad_id: ad_id, dataLoaded: false })
        fetch(P_URL + 'ad_info?ad_id=' + ad_id, { headers: { Authorization: get_key() } }).then(response => {
            response.json().then(responseJson => {
                responseJson.pic_links.map(item => {
                    this.state.pic_links.push(<Image style={{ height: '80%' }} source={{ uri: item.url }}></Image>)
                });
                this.setState({
                    advetData: responseJson, dataLoaded: true, related: responseJson.related, title: responseJson.title,
                    Txt: [responseJson.features, responseJson.pay_way, responseJson.description], ad_link: responseJson.ad_link,
                    scoin_available: responseJson.Scoin_available, min_level: responseJson.min_level
                });
            })
        })
    }
    _get_title() {
        return this.state.title;
    }
    onShare() {
        const shareOptions = {
            title: 'اشتراک فایل از اپلیکیشن اسکوین',
            message: 'تبلیغ : ' + this.state.title + ' لینک:' + this.state.ad_link
        };
        return Share.open(shareOptions);
    }
    bookmark() {
        fetch(P_URL + 'save_ad?username=' + this.state.username + '&ad_id=' + this.state.ad_id, { headers: { Authorization: get_key() } }).then((response) => {
            response.json().then(responseJson => {
                this._toastShow('تبلیغ ذخیره شد');
            });
        });
    }
    _getUserLevel() {
        fetch(P_URL + 'userData?username=' + this.state.username, { headers: { Authorization: get_key() } })
            .then((response) => response.json()
                .then((responseJson) => {
                    this.setState({
                        level: responseJson.level
                    })
                }, function () {
                }).catch((error) => {
                    Alert.alert(error.toString())
                })
            ).catch((error) => {
                Alert.alert(error.toString())
            });
    }
    componentDidMount() {
        this.getUsername();
        let ad_id = this.props.navigation.getParam('ad_id')
        this.fetch_data(ad_id)
        this._getUserLevel()
    }
    async _submitStarRate(rate) {
        let username = await this.getUsername();
        let ad_id = this.props.navigation.getParam('ad_id')
        fetch(P_URL + 'set_rate?ad_id=' + ad_id + '&rate=' + rate + '&username' + username, { headers: { Authorization: get_key() } }).then((response) => {
            response.json().then((responseJson) => {
                this._toastShow('امتیاز شما با موفقیت ثبت شد')

            }).catch((err) => Alert.alert(err.toString()))
        }).catch((err) => Alert.alert(err.toString()))
    }
    render() {
        return (
            <Root>
                <SafeAreaView style={{ flex: 1 }}>
                    {this.state.dataLoaded ?
                        <ScrollView>
                            <Swiper
                                height={250}
                                activeDotColor={'#573c65'}
                                dot={<View style={{ backgroundColor: '#827086', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />}
                                loop={true}
                                autoplay={true}
                                showsButtons={true}
                                nextButton={<Icon style={{ color: '#573c65' }} name='arrow-dropright-circle' />}
                                prevButton={<Icon style={{ color: '#573c65' }} name='arrow-dropleft-circle' />}
                            >
                                {this.state.pic_links}
                            </Swiper>
                            <View style={{ elevation: 6, width: '95%', minHeight: 70, backgroundColor: '#827086', alignSelf: 'center', borderRadius: 8, padding: 15 }}>
                                <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 12 }}>{this.state.advetData.short_description}</Text>
                            </View>
                            <View style={{ height: 140, width: '98%', elevation: 2, borderRadius: 8, marginTop: 5, alignSelf: 'center', alignItems: 'center' }}>
                                <View style={{ flex: 1, paddingHorizontal: 5, borderBottomWidth: 1, borderBottomColor: '#8f8f8f', borderStyle: 'dotted', width: '95%', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11, color: '#8f8f8f' }}>قیمت قدیم: {this.state.advetData.old_cost},000 تومان</Text>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11 }}>قیمت جدید: {this.state.advetData.cost},000 تومان</Text>
                                </View>
                                <View style={{ flex: 1, paddingHorizontal: 5, borderBottomWidth: 1, borderBottomColor: '#8f8f8f', borderStyle: 'dotted', width: '95%', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11, color: '#8f8f8f' }}>مقدار SCoin مورد نیاز: {this.state.advetData.Scoin_cost} <Icon style={{ fontSize: 11, color: '#8f8f8f' }} name='logo-usd' /></Text>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11 }}>{this.state.advetData.off}% تخفیف</Text>
                                </View>
                                <View style={{ flex: 2, paddingHorizontal: 5, borderBottomWidth: 1, borderBottomColor: '#8f8f8f', borderStyle: 'dotted', width: '95%', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flex: 1 }}>
                                        <View style={{ flexDirection: 'row-reverse', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11 }}>امتیاز:</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '40%' }} >
                                                <View >
                                                    <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star' />
                                                </View>
                                                <View >
                                                    {parseInt(this.state.advetData.rate) >= 2 ?
                                                        <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star' /> :
                                                        <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star-outline' />}
                                                </View>
                                                <View>
                                                    {parseInt(this.state.advetData.rate) >= 3 ?
                                                        <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star' /> :
                                                        <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star-outline' />}
                                                </View>
                                                <View>
                                                    {parseInt(this.state.advetData.rate) >= 4 ?
                                                        <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star' /> :
                                                        <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star-outline' />}
                                                </View>
                                                <View>
                                                    {parseInt(this.state.advetData.rate) == 5 ?
                                                        <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star' /> :
                                                        <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star-outline' />}
                                                </View>
                                            </View>
                                            <View style={{ height: 20, width: 35, backgroundColor: '#573c65', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11, color: 'white' }}>{this.state.advetData.rate}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ height: 25, width: 100, borderWidth: 1, borderRadius: 10, borderColor: '#f7bfe2', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11 }}>تعداد خرید: {this.state.advetData.bought}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <View style={{ height: 25, width: 120, borderColor: 'gray', borderWidth: 1, borderRadius: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                            <Icon name="ios-timer" style={{ fontSize: 18, marginRight: 5 }} />
                                            <CountDown
                                                size={5}
                                                until={parseInt(this.state.advetData.timer)}
                                                digitStyle={{ backgroundColor: '#FFF' }}
                                                digitTxtStyle={{ color: 'black', fontSize: 8, fontFamily: 'IRANSans(FaNum)' }}
                                                separatorStyle={{ color: 'black' }}
                                                timeToShow={['D', 'H', 'M', 'S']}
                                                timeLabels={{ m: null, s: null }}
                                                showSeparator
                                            />
                                        </View>
                                    </View>
                                </View>

                            </View>
                            <View style={{ marginTop: 5, width: '95%', height: 70, alignSelf: 'center', borderRadius: 8, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-around' }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity style={{ height: 25, width: 100, borderRadius: 10, backgroundColor: '#573c65', justifyContent: 'center', alignItems: 'center', flexDirection: 'row-reverse' }}
                                        onPress={() => this.onShare()}>
                                        <Icon style={{ fontSize: 12, color: 'white' }} name='share' />
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white', marginRight: 5 }}>اشتراک گذاری</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (this.state.scoin_available) {
                                            this.props.navigation.navigate('webview', { url: P_URL + 'Buy?ad_id=' + this.state.ad_id + '&userID=' + this.state.username })
                                        } else {
                                            if (this.state.min_level <= this.state.level) {
                                                Linking.canOpenURL(this.state.ad_link.toString()).then(supported => {
                                                    if (supported) {
                                                        Linking.openURL(this.state.ad_link.toString());
                                                    } else {
                                                        alert("امکان بازکردن مرورگر وجود ندارد لطفا این دسترسی را برای اپلیکیشن تنظیم کنید.")
                                                    }
                                                });
                                            } else
                                                this._toastShow(" شما هنوز به سطح " + this.state.min_level.toString() + " نرسیده اید.")
                                        }
                                    }}
                                    style={{ flex: 1, height: 40, width: 120, borderRadius: 20, backgroundColor: '#5daa2c', justifyContent: 'center', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                    <Icon style={{ fontSize: 18, color: 'white' }} name='basket' />
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 18, color: 'white', marginRight: 5 }}>خرید</Text>
                                </TouchableOpacity>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity style={{ height: 25, width: 100, borderRadius: 10, backgroundColor: '#573c65', justifyContent: 'center', alignItems: 'center', flexDirection: 'row-reverse' }}
                                        onPress={() => this.bookmark()}>
                                        <Icon style={{ fontSize: 12, color: 'white' }} name='archive' />
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white', marginRight: 5 }}>آرشیو</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ height: 35, width: "97%", alignSelf: 'center', marginTop: 5, elevation: 2, flexDirection: 'row-reverse', backgroundColor: 'white', borderRadius: 5, justifyContent: 'space-around' }}>
                                <TouchableOpacity
                                    onPress={() => this._tabSelected(0)}
                                    style={{ flex: 1, borderBottomRightRadius: 5, borderTopRightRadius: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row-reverse', backgroundColor: (this.state.tabSelected === 0) ? '#573c65' : 'white' }}>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: (this.state.tabSelected == 0) ? 'white' : '#a6a6a6' }}>ویژگی ها</Text>
                                </TouchableOpacity>
                                <View style={{ backgroundColor: 'gray', height: '100%', width: .4 }}></View>
                                <TouchableOpacity
                                    onPress={() => this._tabSelected(1)}
                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: (this.state.tabSelected === 1) ? '#573c65' : 'white' }}>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: (this.state.tabSelected == 1) ? 'white' : '#a6a6a6' }}>شرایط استفاده</Text>
                                </TouchableOpacity>
                                <View style={{ backgroundColor: 'gray', height: '100%', width: .4 }}></View>
                                <TouchableOpacity
                                    onPress={() => this._tabSelected(2)}
                                    style={{ flex: 1, borderBottomLeftRadius: 5, borderTopLeftRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: (this.state.tabSelected === 2) ? '#573c65' : 'white' }}>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: (this.state.tabSelected == 2) ? 'white' : '#a6a6a6' }}>توضیحات</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ padding: 20, width: "97%", alignSelf: 'center', marginVertical: 10, backgroundColor: '#827086', borderRadius: 5, justifyContent: 'space-around' }}>
                                {this.state.dataLoaded && <View>{this._renderTxt()}</View>}
                                <Icon onPress={() => { this._renderTxtHandle() }} style={{ color: '#573c65', position: 'absolute', bottom: -20, marginBottom: 10, alignSelf: 'center' }} name={this.state.TxtIconHandleName} />
                            </View>
                            <View style={{ flexDirection: 'row-reverse', marginTop: 10, marginHorizontal: '1.5%', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>تخفیف های مشابه گروهی</Text>
                                </View>
                            </View>
                            <FlatList
                                horizontal
                                inverted
                                showsHorizontalScrollIndicator={false}
                                data={this.state.related}
                                renderItem={({ item }) =>
                                    <TouchableOpacity onPress={() => this.fetch_data(item.ad_id)}
                                        style={{ height: 180, width: 320, marginTop: 10, marginBottom: 20, marginHorizontal: 5, elevation: 2, borderRadius: 10 }}>
                                        <View style={{ flex: 2, flexDirection: 'row-reverse' }}>
                                            <View style={{ flex: 1.2, justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={{ height: 20, width: 20, backgroundColor: '#573C65', position: 'absolute', zIndex: 1, right: '5%', top: '5%', borderTopRightRadius: 5, borderBottomLeftRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 9, color: 'white' }}>{item.off}%</Text>
                                                </View>
                                                <Image resizeMode='cover' style={{ height: '90%', width: '90%', borderRadius: 5 }} source={{ uri: item.pic }} />
                                            </View>
                                            <View style={{ flex: 2, padding: 10, justifyContent: 'space-around', borderBottomWidth: .5, borderStyle: 'dotted', borderColor: 'gray' }}>
                                                <View><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>{item.title}</Text></View>
                                                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.old_cost},000 تومان</Text>
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.cost},000 تومان</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                    <View style={{ height: 20, minWidth: 80, borderColor: '#F7BFE2', borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5 }}>
                                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>تعداد خرید: {item.bought}</Text>
                                                    </View>

                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1.2, padding: 10, justifyContent: 'space-around' }}>
                                            <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <View style={{ height: 25, width: 100, borderColor: '#F7BFE2', borderWidth: 1, borderRadius: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                                    <Icon name="ios-timer" style={{ fontSize: 18, marginRight: 5 }} />
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
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: '#573c65' }}>ستارخان</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row-reverse' }}>
                                                <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}>مقدار SCoin مورد نیاز</Text>
                                                    <Icon style={{ fontSize: 12, marginStart: 2 }} name='logo-steam' />
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}>{item.Scoin_cost}</Text>
                                                </View>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}>امتیاز: {item.rate}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                } />
                            <View style={{ width: '95%', height: 70, alignSelf: 'center', marginBottom: 10, flexDirection: 'row-reverse', }}>
                                <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 5 }}>
                                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                                        <Icon style={{ fontSize: 12, color: '#573c65' }} type='MaterialIcons' name='comment' />
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: '#573c65', }}>ثبت نظر و دادن امتیاز:</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={{ height: 20, width: 35, backgroundColor: '#573c65', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11, color: 'white' }}>{this.state.updatedRate}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '40%' }} >
                                            <TouchableOpacity onPress={() => this.update_star(1)}>
                                                <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star' />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.update_star(2)}>
                                                {parseInt(this.state.updatedRate) >= 2 ?
                                                    <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star' /> :
                                                    <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star-outline' />}
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.update_star(3)}>
                                                {parseInt(this.state.updatedRate) >= 3 ?
                                                    <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star' /> :
                                                    <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star-outline' />}
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.update_star(4)}>
                                                {parseInt(this.state.updatedRate) >= 4 ?
                                                    <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star' /> :
                                                    <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star-outline' />}
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.update_star(5)}>
                                                {parseInt(this.state.updatedRate) == 5 ?
                                                    <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star' /> :
                                                    <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star-outline' />}
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ height: 20, width: 35, backgroundColor: '#573c65', borderRadius: 5, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                                        <Text
                                            onPress={() => this._submitStarRate(this.state.updatedRate)}
                                            style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 12 }}>ثبت</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 2, padding: 5 }}>
                                    <View style={{ minHeight: 70, backgroundColor: '#827086', borderRadius: 8, }}>
                                        <Textarea
                                            onChangeText={
                                                (Txt) => {
                                                    this.setState({
                                                        commentEntry: Txt
                                                    })
                                                }
                                            }
                                            placeholder='نظر خود را بنویسید' placeholderTextColor='white' style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11, color: 'white' }}></Textarea>
                                        <Text
                                            onPress={() => this._submitComment(this.state.commentEntry)}
                                            style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 12, textAlign: 'left', left: 10, bottom: 10 }}>ثبت</Text>
                                    </View>
                                </View>
                            </View>
                            <FlatList
                                data={this.state.comments}
                                renderItem={({ item }) =>
                                    <View style={{ elevation: 6, width: '90%', minHeight: 70, backgroundColor: '#827086', alignSelf: 'flex-end', borderRadius: 8, padding: 15, marginRight: '2.5%', marginTop: 10 }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11, color: 'white', textAlign: 'right' }}>{item.username}</Text>

                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 12, textAlign: 'right' }}>{item.comment}</Text>
                                    </View>
                                }
                            />

                            <TouchableOpacity onPress={() => { this.comments_view() }} style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', width: 120, alignSelf: 'flex-end', marginVertical: 10, marginLeft: '2.5%' }}>
                                <View style={{ height: 20, width: 100, backgroundColor: '#573c65', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11, color: 'white', }}>مشاهده نظرات بیشتر</Text>
                                </View>
                                <Icon style={{ fontSize: 18, color: '#573c65' }} name='arrow-dropdown-circle' />
                            </TouchableOpacity>
                        </ScrollView> :
                        <View style={{ alignSelf: 'center', flex: 1, position: 'absolute' }}>
                            <Spinner color='red' />
                            <Spinner color='green' />
                            <Spinner color='blue' />
                        </View>
                    }
                </SafeAreaView >
            </Root>
        )
    }
}

export default GroupADs
