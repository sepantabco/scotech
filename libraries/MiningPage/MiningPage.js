import React, { Component } from 'react'
import { Text, View, ScrollView, Image, FlatList } from 'react-native'
import FooterViewI from '../FooterViewI'

export class MiningPage extends Component {
    constructor() {
        super();
        this.state = {
            leagueData: [
                { id: 1, day: 2, hour: 8, minute: 24, second: 20, gameName: 'PacMan', Moon: 'شهریورماه' },

            ],
            gameData: [
                { id: 1, title: 'Mario' }
            ]
        }
    }
    componentDidMount
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                    {/* فلکس آواتار و امتیاز */}
                    <View style={{ height: 280, borderBottomWidth: .5, borderColor: 'black' }}>
                        {/* فلکس آواتار و اسم */}
                        <View style={{ flex: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ height: 100, width: 100 }} source={require('./../../images/person.png')} />
                            <View style={{ justifyContent: 'center', alignItems: 'center', height: 15, width: 30, backgroundColor: "#9720d2", borderRadius: 10, marginTop: -7.5 }}><Text style={{ fontFamily: 'IRANSans(FaNum)' }}>12</Text></View>
                            <Text style={{ fontSize: 16 }}>NickName</Text>
                        </View>
                        {/*end فلکس آواتار و اسم */}
                        {/* فلکس امتیازات و دکمه های مدال و جدول */}
                        <View style={{ flex: 2 }}>
                            {/* فکلس امتیازات */}
                            <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                <View style={{ flex: 1.2, alignItems: 'center', paddingTop: 6 }}>
                                    <View style={{ flexDirection: 'row-reverse', height: 30, width: '90%', backgroundColor: '#ffd83b', borderRadius: 15, justifyContent: 'space-around', alignItems: 'center' }}>
                                        <Image style={{ height: 15, width: 15 }} source={require('../../images/logos/starpoint.png')}></Image>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 14, color: 'black' }}>8000</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 2.8, paddingTop: 6, alignItems: 'center' }}>
                                    <View style={{ height: 30, width: '90%', backgroundColor: '#e6e6e6', borderRadius: 15, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={{ height: 30, width: '70%', backgroundColor: "#9720d2", borderRadius: 15, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', position: "absolute" }}></View>
                                        <Text style={{ marginHorizontal: 8, fontFamily: 'IRANSans(FaNum)', fontSize: 14, color: 'white' }}>12</Text>
                                        <Text style={{ marginHorizontal: 8, fontFamily: 'IRANSans(FaNum)', fontSize: 14, color: 'black' }}>13</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row-reverse' }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 14, color: '#9720d2' }}>3000 امتیاز</Text>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 14, color: '#858585' }}> تا مرحله 13</Text>
                                    </View>
                                </View>
                            </View>
                            {/*end فکلس امتیازات */}
                            {/* فلکس دکمه های مدال و جدول */}
                            <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-around', alignItems: 'center' }}>
                                <View style={{ height: 35, width: '45%', borderRadius: 12, borderWidth: .5, borderColor: 'black', justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontFamily: 'IRANSansMobile', fontSize: 14 }}>جدول امتیازات</Text></View>
                                <View style={{ height: 35, width: '45%', borderRadius: 12, borderWidth: .5, borderColor: 'black', justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontFamily: 'IRANSansMobile', fontSize: 14 }}>مدال‌ها</Text></View>
                            </View>
                            {/*end فلکس دکمه های مدال و جدول */}
                        </View>
                        {/*end فلکس امتیازات و دکمه های مدال و جدول */}
                    </View>
                    {/*end فلکس آواتار و امتیاز */}
                    {/* تیتر حفاری */}
                    <View style={{ height: 50, justifyContent: 'center' }}><Text style={{ marginHorizontal: 15, color: 'black', fontFamily: 'IRANSansMobile', fontSize: 25 }}>حفاری</Text></View>
                    {/*end تیتر حفاری */}
                    {/* فلکس لیگها */}
                    <View>
                        <View style={{ height: 50, justifyContent: 'center' }}><Text style={{ color: 'black', marginHorizontal: 15, fontFamily: 'IRANSansMobile', fontSize: 18 }}>لیگ‌ها</Text></View>
                        {/* فلکس کارتهای لیگ */}
                        <FlatList
                            data={this.state.leagueData}
                            horizontal
                            renderItem={({ item }) =>
                                <View>
                                    <View style={{ flex: 1, height: 200, width: 250, backgroundColor: 'white', borderRadius: 20, borderWidth: 1, borderColor: '#e4e4e4', marginEnd: 20 }}>
                                        {/* بالای کارت */}
                                        <View style={{ flex: 3, backgroundColor: '#e4e4e4', borderTopEndRadius: 20, borderTopStartRadius: 20 }}></View>
                                        {/*end بالای کارت */}
                                        {/* پایین کارت */}
                                        <View style={{ flex: 2, paddingHorizontal: 20, justifyContent: 'space-around' }}>
                                            <View><Text style={{ fontFamily: 'IRANSansMobile', fontSize: 14 }}>لیگ {item.Moon} {item.gameName}</Text></View>
                                            {/* زمان باقیمانده */}
                                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-around' }}>
                                                <View style={{ flex: 1 }}>
                                                    <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 14 }}>زمان باقیمانده</Text>
                                                </View>
                                                <View style={{ flex: 2, flexDirection: 'row-reverse', justifyContent: 'space-around' }}>
                                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 14 }}>ثانیه</Text>
                                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 14 }}>{item.second}</Text>
                                                    </View>
                                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 14 }}>دقیقه</Text>
                                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 14 }}>{item.minute}</Text>
                                                    </View>
                                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 14 }}>ساعت</Text>
                                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 14 }}>{item.hour}</Text>
                                                    </View>
                                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 14 }}>روز</Text>
                                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 14 }}>{item.day}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            {/*end زمان باقیمانده */}
                                        </View>
                                        {/*end پایین کارت */}
                                    </View>
                                </View>
                            } />
                        {/*end فلکس کارتهای لیگ */}
                    </View>
                    {/*end فلکس لیگها */}
                    {/* فلکس بازیها */}
                    <View>
                        <View style={{ height: 50, justifyContent: 'center' }}><Text style={{ color: 'black', marginHorizontal: 15, fontFamily: 'IRANSansMobile', fontSize: 18 }}>بازی‌ها</Text></View>
                        {/* فلکس کارتهای بازی */}
                        <FlatList
                            data={this.state.gameData}
                            renderItem={({ item }) =>
                                <View>
                                    <View style={{ flex: 1, height: 200, width: 200, backgroundColor: 'white', borderRadius: 20, borderWidth: 1, borderColor: '#e4e4e4', marginEnd: 20 }}>
                                        {/* بالای کارت */}
                                        <View style={{ flex: 3, backgroundColor: '#e4e4e4', borderTopEndRadius: 20, borderTopStartRadius: 20 }}></View>
                                        {/*end بالای کارت */}
                                        {/* پایین کارت */}
                                        <View style={{ flex: 1, paddingHorizontal: 20, justifyContent: 'space-around' }}>
                                            <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 14 }}>{item.title}</Text>
                                        </View>
                                        {/*end پایین کارت */}

                                    </View>
                                </View>
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
