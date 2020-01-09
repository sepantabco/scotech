import React, { Component } from 'react'
import { Text, View, ScrollView, Image, FlatList, Alert, AsyncStorage, TouchableOpacity, Modal } from 'react-native'
import FooterViewI from '../FooterViewI'
import { P_URL } from '../PUBLICURLs';
import get_key from "../Auth";
import CountDown from 'react-native-countdown-component'
import Leagues from './Leagues';
import { Icon } from 'native-base';

export class MiningPage extends Component {
    constructor() {
        super();
        this.state = {
            dataLoaded: false,
            leagueData: [],
            gameData: [],
            user_data: { total_rate: 0, id: 0, level: 0, nextlevel: 0, next_level_grow: 0, level_grow_total: 0, point_need: 0, percent: 0, username: '' },
            modalVisible: false,
            leagueId: '',
            username: ''
        }
    }
    async getUsername() {
        try {
            let token = await AsyncStorage.getItem('username');
            return token;
        } catch (error) {
            Alert.alert(error.toString());
        }
    }
    async _getGamesData() {
        const username = await this.getUsername();
        this.setState({ username: username });
        console.log(username)
        fetch(P_URL + 'games?username=' + username, { headers: { Authorization: get_key() } }).then(response => {
            response.json().then(responseJson => {
                let level = parseInt(responseJson.level);
                let nextlevel = level + 1;
                let id = responseJson.id;
                let next_level_grow = parseInt(responseJson.next_level_grow);
                let level_grow_total = 1000 * ((1.6) ** level);
                let point_need = level_grow_total - next_level_grow;
                percent = (next_level_grow / level_grow_total) * 100;
                this.setState({
                    user_data: {
                        id: id, username: username, level: level, nextlevel: nextlevel, next_level_grow: next_level_grow, level_grow_total: level_grow_total, point_need: parseInt(point_need), percent: percent,
                        total_rate: responseJson.total_rate
                    },
                })
                // responseJson.events.map(item => {
                //     let title = item.title;
                //     let pic_link = item.pic_link;
                //     let end_time = parseInt(item.end_time)
                //     this.state.leagueData.push({ title: title, end_time: end_time, id: item.id, pic_link: pic_link.toString() })
                // })
                console.log(responseJson, 'games');
                responseJson.games.map(item => {
                    let game_name = item.name
                    let pic_link = item.pic_link
                    this.state.gameData.push({ game_name: game_name, pic_link: pic_link })
                })
                this.setState({ dataLoaded: true });
                console.log(this.state.gameData);

            });
        });
    }
    async componentDidMount() {
        this._getGamesData()
    }
    _openModal(set, leagueId) {
        this.setState({ modalVisible: set, leagueId: leagueId })
    }
    render() {

        return (
            <View style={{ flex: 1 }}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}>

                    <Leagues
                        leagueId={this.state.leagueId}
                    />
                    <TouchableOpacity style={{ backgroundColor: '#573c65', flex: .05, borderRadius: 10 }} onPress={() => this._openModal(false)}>
                        <View  >
                            <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>خروج</Text>
                        </View>
                    </TouchableOpacity>

                </Modal>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', paddingBottom: 10 }}>
                    {/* فلکس آواتار و امتیاز */}
                    <View style={{ height: 280, borderBottomWidth: .5, borderColor: 'black' }}>
                        {/* فلکس آواتار و اسم */}
                        <View style={{ flex: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ height: 100, width: 100 }} source={require('./../../images/person.png')} />
                            <View style={{ justifyContent: 'center', alignItems: 'center', height: 20, width: 30, backgroundColor: "#573c65", borderRadius: 10, marginTop: -7.5 }}><Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white' }}>{this.state.user_data.level}</Text></View>
                            <Text style={{ fontSize: 16 }}>{this.state.user_data.username}</Text>
                        </View>
                        {/*end فلکس آواتار و اسم */}
                        {/* فلکس امتیازات و دکمه های مدال و جدول */}
                        <View style={{ flex: 2 }}>
                            {/* فکلس امتیازات */}
                            <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                <View style={{ flex: 1.5, alignItems: 'center', paddingTop: 6, justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row-reverse', height: 30, width: '90%', backgroundColor: '#ffd83b', borderRadius: 15, justifyContent: 'space-around', alignItems: 'center' }}>
                                        <Image style={{ height: 15, width: 15 }} source={require('../../images/logos/starpoint.png')}></Image>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 14, color: 'black' }}>{this.state.user_data.total_rate}</Text>
                                    </View>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 14, color: '#573c65' }}> مجموع امتیازات بازی‌ها</Text>
                                </View>
                                <View style={{ flex: 2, paddingTop: 6, alignItems: 'center' }}>
                                    <View style={{ height: 30, width: '90%', backgroundColor: '#e6e6e6', borderRadius: 15, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={{ height: 30, width: this.state.user_data.percent.toString() + '%', backgroundColor: "#573c65", borderRadius: 15, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', position: "absolute" }}></View>
                                        <Text style={{ marginHorizontal: 8, fontFamily: 'IRANSans(FaNum)', fontSize: 14, color: 'white' }}>{this.state.user_data.level}</Text>
                                        <Text style={{ marginHorizontal: 8, fontFamily: 'IRANSans(FaNum)', fontSize: 14, color: 'black' }}>{this.state.user_data.nextlevel}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row-reverse' }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 14, color: '#573c65' }}>{this.state.user_data.point_need} امتیاز</Text>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 14, color: '#858585' }}> تا مرحله {this.state.user_data.nextlevel}</Text>
                                    </View>
                                </View>
                            </View>
                            {/*end فکلس امتیازات */}
                            {/* فلکس دکمه های مدال و جدول */}
                            <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-around', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ScoreBoards')} style={{ height: 35, width: '45%', borderRadius: 12, borderWidth: .5, borderColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
                                    <View ><Text style={{ fontFamily: 'IRANSansMobile', fontSize: 14 }}>جدول رتبه‌بندی</Text></View>
                                </TouchableOpacity >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Medals')} style={{ height: 35, width: '45%', borderRadius: 12, borderWidth: .5, borderColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
                                    <View >
                                        <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 14 }}>مدال‌ها</Text></View>
                                </TouchableOpacity>
                            </View>
                            {/*end فلکس دکمه های مدال و جدول */}
                        </View>
                        {/*end فلکس امتیازات و دکمه های مدال و جدول */}
                    </View>
                    {/*end فلکس آواتار و امتیاز */}
                    {/* تیتر حفاری */}
                    <View style={{ height: 50, justifyContent: 'flex-start', flexDirection: 'row-reverse', alignItems: 'center' }}><Text style={{ marginHorizontal: 15, color: 'black', fontFamily: 'IRANSansMobile', fontSize: 25 }}>حفاری</Text>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Guide', { id: 6 })}
                        >
                            <Icon name='help-circle-outline' style={{ fontSize: 20, marginRight: 5, color: 'gray', transform: [{ scaleX: -1 }] }} />
                        </TouchableOpacity>
                    </View>
                    {/*end تیتر حفاری */}
                    {/* فلکس لیگها */}
                    {/* <View>
                        <View style={{ height: 50, justifyContent: 'center' }}><Text style={{ color: 'black', marginHorizontal: 15, fontFamily: 'IRANSansMobile', fontSize: 18 }}>لیگ‌ها</Text></View> */}
                    {/* فلکس کارتهای لیگ */}
                    {/* <FlatList
                            data={this.state.leagueData}
                            extraData={this.state.dataLoaded}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => { return index.toString() }}
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress={() => { this._openModal(true, item.id) }}>
                                    <View style={{ flex: 1, height: 200, width: 250, backgroundColor: 'white', borderRadius: 20, borderWidth: 1, borderColor: '#e4e4e4', marginStart: 20 }}> */}
                    {/* بالای کارت */}
                    {/* <View style={{ flex: 3, backgroundColor: '#e4e4e4', borderTopEndRadius: 20, borderTopStartRadius: 20 }}>
                                            <Image resizeMode='stretch' style={{ height: '100%', width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }} source={item.pic_link} />
                                        </View> */}
                    {/*end بالای کارت */}
                    {/* پایین کارت */}
                    {/* <View style={{ flex: 2, paddingHorizontal: 20, justifyContent: 'space-around' }}>
                                            <View><Text style={{ fontFamily: 'IRANSansMobile', fontSize: 14 }}> {item.title}</Text></View> */}
                    {/* زمان باقیمانده */}
                    {/* <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-around' }}>
                                                <View style={{ flex: 1.5 }}>
                                                    <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 14 }}>زمان باقیمانده</Text>
                                                </View>
                                                <View style={{ flex: 2, justifyContent: 'space-around' }}>
                                                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-around' }}>
                                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>ثانیه</Text>
                                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>دقیقه</Text>
                                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>ساعت</Text>
                                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>روز</Text>
                                                    </View>

                                                    <View>
                                                        <CountDown
                                                            size={10}
                                                            until={item.end_time}
                                                            digitStyle={{ backgroundColor: '#FFF', marginHorizontal: 2 }}
                                                            digitTxtStyle={{ color: 'black' }}
                                                            separatorStyle={{ color: 'black' }}
                                                            timeToShow={['D', 'H', 'M', 'S']}
                                                            timeLabels={{ m: null, s: null }}
                                                            showSeparator
                                                        />
                                                    </View>
                                                </View>
                                            </View> */}
                    {/*end زمان باقیمانده */}
                    {/* </View> */}
                    {/*end پایین کارت */}
                    {/* </View> */}
                    {/* </TouchableOpacity> */}
                    {/* } /> */}
                    {/*end فلکس کارتهای لیگ */}
                    {/* </View> */}
                    {/*end فلکس لیگها */}
                    {/* فلکس بازیها */}
                    <View>
                        <View style={{ height: 50, justifyContent: 'center' }}><Text style={{ color: 'black', marginHorizontal: 15, fontFamily: 'IRANSansMobile', fontSize: 18 }}>بازی‌ها</Text></View>
                        {/* فلکس کارتهای بازی */}
                        <FlatList
                            data={this.state.gameData}
                            extraData={this.state.dataLoaded}

                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => { return index.toString() }}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => this.props.navigation.navigate('GamesWebView', { 'url': 'http://beacongameserver.ir/1' + index + '/?username=' + this.state.username })}>
                                    <View style={{ flex: 1, height: 120, width: 120, backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#e4e4e4', marginStart: 20 }}>
                                        {/* بالای کارت */}
                                        <View style={{ flex: 3, backgroundColor: '#e4e4e4', borderTopEndRadius: 12, borderTopStartRadius: 12 }}>
                                            <Image resizeMode='stretch' style={{ height: '100%', width: '100%', borderTopLeftRadius: 12, borderTopRightRadius: 12 }} source={{ uri: item.pic_link }} />
                                        </View>
                                        {/*end بالای کارت */}
                                        {/* پایین کارت */}
                                        <View style={{ flex: 1, paddingHorizontal: 20, justifyContent: 'space-around' }}>
                                            <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 12, textAlign: 'center' }}>{item.game_name}</Text>
                                        </View>
                                        {/*end پایین کارت */}

                                    </View>
                                </TouchableOpacity>
                                // {/*end فلکس کارتهای بازی */}
                            }
                        />
                    </View>
                    {/*end فلکس بازیها */}
                </ScrollView >
                <FooterViewI menu={4} navigation={this.props.navigation} />
            </View >
        )
    }
}

export default MiningPage
