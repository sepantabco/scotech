import React, { Component } from 'react'
import { Text, View, Image, ScrollView } from 'react-native'
import CountDown from 'react-native-countdown-component'
import { P_URL } from '../PUBLICURLs'
import { FlatList } from 'react-native-gesture-handler';


export class Leagues extends Component {
    constructor() {
        super();
        this.state = {
            leagueData: {},
            leagueDescription: []
        }
    }
    componentDidMount() {
        let leagueId = this.props.leagueId
        fetch(P_URL + 'get_event_data?event_id=' + leagueId, { headers: { Authorization: get_key() } }).then(response => {
            response.json().then(responseJson => {
                let description = JSON.parse(responseJson.description)
                description.map(item => {
                    let rank = item.rank
                    let prize = item.prize
                    let medal = item.medal
                    this.state.leagueDescription.push({ rank: rank, prize: prize, medal: medal })
                })
                let title = responseJson.title
                let cost = responseJson.cost
                let participants_count = responseJson.participants_count
                let end_time = parseInt(responseJson.end_time)
                let pic_link = responseJson.pic_link
                this.setState({
                    leagueData: {
                        title: title, cost: cost, participants_count: participants_count, end_time: end_time, pic_link: pic_link
                    }
                })
                console.log(this.state.leagueDescription)
            })
        })
    }
    render() {
        return (
            <View style={{ flex: 1, }}>
                {/* قسمت خاکستری بالا */}
                <View style={{ height: 150, backgroundColor: '#e9e9e9', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <View style={{ height: 90, width: 90, elevation: 5, backgroundColor: 'white', marginBottom: -45, borderRadius: 12 }}>
                        <Image resizeMode='stretch' style={{ height: 90, width: 90, borderRadius: 24 }} source={{ uri: this.state.leagueData.pic_link }} />
                    </View>
                </View>
                {/*end قسمت خاکستری بالا */}
                <View style={{ marginTop: 50, alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'black', fontSize: 15 }}>{this.state.leagueData.title}</Text>
                    {/* دکمه لیگ */}
                    <View style={{ width: '75%', height: 35, backgroundColor: '#9720d2', marginTop: 10, borderRadius: 12, flexDirection: 'row-reverse' }}>
                        <View style={{ flex: 2.8, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 15, color: 'white' }}>ورود به لیگ</Text>
                        </View>
                        <View style={{ height: 28, width: 1, backgroundColor: 'white', marginVertical: 3.5 }}></View>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'row-reverse', justifyContent: 'space-around' }}>
                            <Image style={{ height: 20, width: 20 }} source={require('../../images/medals/a1_1.png')}></Image>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 15, color: 'white' }}>{this.state.leagueData.cost}</Text>
                        </View>
                    </View>
                    {/*end دکمه لیگ */}
                    <ScrollView style={{ width: '100%' }}>
                        {/* مشخصات لیگ */}
                        <View style={{ width: '75%', height: 110, marginTop: 20, alignSelf: 'center' }}>
                            <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', paddingHorizontal: 5 }}>
                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 13, color: 'black' }}>تعداد شرکت کنندگان</Text>
                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 13, color: 'black' }}>{this.state.leagueData.participants_count} نفر</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', paddingHorizontal: 5 }}>
                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 13, color: 'black' }}>ورودی لیگ:</Text>
                                <View style={{ flexDirection: 'row-reverse', justifyContent: 'center' }}>
                                    <Image style={{ height: 15, width: 15 }} source={require('../../images/medals/a1_1.png')}></Image>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 13, color: 'black' }}>100</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flex: 1 }}><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 13, color: 'black' }}>زمان باقیمانده:</Text></View>
                                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                                    <View>
                                        <CountDown
                                            size={15}
                                            until={this.state.leagueData.end_time}
                                            digitStyle={{ backgroundColor: '#FFF', marginHorizontal: 5 }}
                                            digitTxtStyle={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'black' }}
                                            separatorStyle={{ color: 'white' }}
                                            timeToShow={['D', 'H', 'M', 'S']}
                                            timeLabels={{ m: 'دقیقه', s: 'ثانیه', h: 'ساعت', d: 'روز' }}
                                            showSeparator
                                        />
                                    </View>
                                </View>
                            </View>

                        </View>
                        {/*end مشخصات لیگ */}
                        <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'black', marginTop: 20, alignSelf: 'center' }}>جوایز</Text>

                        {/* جوایز */}
                        <View style={{ width: '75%', borderColor: '#e7e7e7', borderWidth: 1, borderRadius: 20, marginTop: 20, alignSelf: 'center' }}>
                            <View style={{ flex: 1, height: 30, borderColor: '#e7e7e7', borderBottomWidth: 1, justifyContent: 'space-around', flexDirection: 'row-reverse' }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 13, color: 'black' }}>رتبه</Text></View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 13, color: 'black' }}>مدال</Text></View>
                                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 13, color: 'black' }}>جوایز</Text></View>
                            </View>
                            <FlatList
                                data={this.state.leagueDescription}
                                keyExtractor={(item, index) => { return index.toString() }}
                                renderItem={({ item }) =>
                                    <View style={{ flex: 1, justifyContent: 'space-around', flexDirection: 'row-reverse', height: 35 }}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 13, color: 'black' }}>{item.rank}</Text></View>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Image resizeMode='contain' style={{ height: 20, width: 20 }} source={{ uri: item.medal }} />
                                        </View>
                                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 13, color: 'black' }}>{item.prize}</Text></View>
                                    </View>
                                }
                            />


                        </View>
                        {/*end جوایز */}
                        <View style={{ height: 250 }}></View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

export default Leagues
