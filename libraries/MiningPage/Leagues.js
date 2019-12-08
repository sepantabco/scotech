import React, { Component } from 'react'
import { Text, View, Image, ScrollView } from 'react-native'
import CountDown from 'react-native-countdown-component'


export class Leagues extends Component {
    render() {
        return (
            <View style={{ flex: 1, }}>
                {/* قسمت خاکستری بالا */}
                <View style={{ height: 150, backgroundColor: '#e9e9e9', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <View style={{ height: 80, width: 80, elevation: 5, backgroundColor: 'white', marginBottom: -40, borderRadius: 12 }}></View>
                </View>
                {/*end قسمت خاکستری بالا */}
                <View style={{ marginTop: 50, alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'black' }}>لیگ شهریور PacMan</Text>
                    {/* دکمه لیگ */}
                    <View style={{ width: '75%', height: 35, backgroundColor: '#9720d2', marginTop: 10, borderRadius: 12, flexDirection: 'row-reverse' }}>
                        <View style={{ flex: 2.8, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white' }}>ورود به لیگ</Text>
                        </View>
                        <View style={{ height: 28, width: 1, backgroundColor: 'white', marginVertical: 3.5 }}></View>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'row-reverse', justifyContent: 'space-around' }}>
                            <Image style={{ height: 20, width: 20 }} source={require('../../images/medals/a1_1.png')}></Image>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white' }}>100</Text>
                        </View>
                    </View>
                    {/*end دکمه لیگ */}
                        <ScrollView style={{width:'100%'}}>
                            {/* مشخصات لیگ */}
                            <View style={{ width: '75%', height: 110, marginTop: 20, alignSelf: 'center' }}>
                                <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', paddingHorizontal: 5 }}>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'black' }}>تعداد شرکت کنندگان</Text>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'black' }}>3242345 نفر</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', paddingHorizontal: 5 }}>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'black' }}>ورودی لیگ:</Text>
                                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'center' }}>
                                        <Image style={{ height: 15, width: 15 }} source={require('../../images/medals/a1_1.png')}></Image>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'black' }}>100</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', paddingHorizontal: 5, alignItems: 'center' }}>
                                    <View style={{ flex: 1 }}><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'black' }}>زمان باقیمانده:</Text></View>
                                    <View style={{ flex: 1, justifyContent: 'space-around' }}>
                                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'black' }}>ثانیه</Text>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'black' }}>دقیقه</Text>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'black' }}>ساعت</Text>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'black' }}>روز</Text>
                                        </View>

                                        <View>
                                            <CountDown
                                                size={10}
                                                until={3000000}
                                                digitStyle={{ backgroundColor: '#FFF', marginHorizontal: 8 }}
                                                digitTxtStyle={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'black' }}
                                                separatorStyle={{ color: 'white' }}
                                                timeToShow={['D', 'H', 'M', 'S']}
                                                timeLabels={{ m: null, s: null }}
                                                showSeparator
                                            />
                                        </View>
                                    </View>
                                </View>

                            </View>
                            {/*end مشخصات لیگ */}
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'black', marginTop: 20, alignSelf: 'center' }}>جوایز</Text>

                            {/* جوایز */}
                            <View style={{ width: '75%', height: 150, borderColor: '#e7e7e7', borderWidth: 1, borderRadius: 20, marginTop: 20, alignSelf: 'center' }}>
                                <View style={{flex:1,borderColor:'#e7e7e7',borderBottomWidth:1,justifyContent:'space-around',flexDirection:'row-reverse'}}>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'black' }}>رتبه</Text></View>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'black' }}>مدال</Text></View>
                                    <View style={{flex:3,justifyContent:'center',alignItems:'center'}}><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'black' }}>جوایز</Text></View>
                                </View>
                                <View style={{flex:1,justifyContent:'space-around',flexDirection:'row-reverse'}}>
                                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'black' }}>اول</Text></View>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'black' }}>مدال</Text></View>
                                    <View style={{flex:3,justifyContent:'center',alignItems:'center'}}><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'black' }}>یک دستگاه ps4</Text></View>
                                </View>
                                <View style={{flex:1,justifyContent:'space-around',flexDirection:'row-reverse'}}>
                                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'black' }}>دوم</Text></View>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'black' }}>مدال</Text></View>
                                    <View style={{flex:3,justifyContent:'center',alignItems:'center'}}><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'black' }}>یک دستگاه ps4</Text></View>
                                </View>
                                <View style={{flex:1,justifyContent:'space-around',flexDirection:'row-reverse'}}>
                                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'black' }}>سوم</Text></View>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'black' }}>مدال</Text></View>
                                    <View style={{flex:3,justifyContent:'center',alignItems:'center'}}><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'black' }}>یک دستگاه ps4</Text></View>
                                </View>
                            </View>
                            {/*end جوایز */}
                    <View style={{height:300}}></View>
                        </ScrollView>
                </View>
            </View>
        )
    }
}

export default Leagues
