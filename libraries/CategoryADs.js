import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, FlatList } from 'react-native';
import { Icon } from 'native-base';
import Categories_Data from './CategoryPage/ImageProfile';

class CategoryADs extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ backgroundColor: '#F3F3F3' }}>
                    <FlatList
                    
                    
                    />
                    <View style={{ width: '97%', height: 100, backgroundColor: '#ffffff', alignSelf: 'center', elevation: 10, marginVertical: 10, flexDirection: 'row-reverse' }}>
                        <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                            <Image resizeMode='cover' style={{ height: '90%', width: '90%', borderRadius: 5 }} source={require('../images/sample_adv.jpg')} />
                        </View>
                        <View style={{ flex: 4 }}>
                            <View style={{ flex: 3, flexDirection: 'row-reverse' }}>
                                <View style={{ flex: 1, justifyContent: 'space-around', padding: 6 }}>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11 }}>کیترینگ سپنتاب</Text>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>چهارراه ولیعصر</Text>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 8 }}>ایرانی-سنتی</Text>
                                </View>
                                <View style={{ flex: 1, padding: 6, justifyContent: 'center' }}>
                                    <View style={{ height: 22, width: 30, backgroundColor: 'green', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white' }}>4.2</Text>
                                    </View>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 8, textAlign: 'left' }}>166 نظر</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', padding: 6 }}>
                                <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>موجودی باشگاه مشتریان: </Text>
                                    <Icon style={{ fontSize: 10 }} name='logo-usd' />
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 9 }}>1000 </Text>
                                </View>
                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>هزینه ارسال:20,000 تومان</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default CategoryADs;
