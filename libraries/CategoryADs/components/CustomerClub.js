import React, { Component } from 'react'
import { Text, View, FlatList,Image } from 'react-native'
import { Icon } from 'native-base';

export class CustomerClub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CustomerClubData: [
                { pic_link: { require: require('../../../images/sample_adv.jpg') }, title: 'کترینگ سپنتاب', address: 'چهارراه ولیصر', type: 'ایرانی سنتی', stock: '1,000', shipPrice: '4,000', percent: '4.2', comment: '1622' },
                { pic_link: { require: require('../../../images/sample_adv.jpg') }, title: 'کترینگ سپنتاب', address: 'چهارراه ولیصر', type: 'ایرانی سنتی', stock: '1,000', shipPrice: '4,000', percent: '4.2', comment: '1622' },
                { pic_link: { require: require('../../../images/sample_adv.jpg') }, title: 'کترینگ سپنتاب', address: 'چهارراه ولیصر', type: 'ایرانی سنتی', stock: '1,000', shipPrice: '4,000', percent: '4.2', comment: '1622' },
                { pic_link: { require: require('../../../images/sample_adv.jpg') }, title: 'کترینگ سپنتاب', address: 'چهارراه ولیصر', type: 'ایرانی سنتی', stock: '1,000', shipPrice: '4,000', percent: '4.2', comment: '1622' },
                { pic_link: { require: require('../../../images/sample_adv.jpg') }, title: 'کترینگ سپنتاب', address: 'چهارراه ولیصر', type: 'ایرانی سنتی', stock: '1,000', shipPrice: '4,000', percent: '4.2', comment: '1622' },
                { pic_link: { require: require('../../../images/sample_adv.jpg') }, title: 'کترینگ سپنتاب', address: 'چهارراه ولیصر', type: 'ایرانی سنتی', stock: '1,000', shipPrice: '4,000', percent: '4.2', comment: '1622' },
                { pic_link: { require: require('../../../images/sample_adv.jpg') }, title: 'کترینگ سپنتاب', address: 'چهارراه ولیصر', type: 'ایرانی سنتی', stock: '1,000', shipPrice: '4,000', percent: '4.2', comment: '1622' },
                { pic_link: { require: require('../../../images/sample_adv.jpg') }, title: 'کترینگ سپنتاب', address: 'چهارراه ولیصر', type: 'ایرانی سنتی', stock: '1,000', shipPrice: '4,000', percent: '4.2', comment: '1622' },
                { pic_link: { require: require('../../../images/sample_adv.jpg') }, title: 'کترینگ سپنتاب', address: 'چهارراه ولیصر', type: 'ایرانی سنتی', stock: '1,000', shipPrice: '4,000', percent: '4.2', comment: '1622' },
                { pic_link: { require: require('../../../images/sample_adv.jpg') }, title: 'کترینگ سپنتاب', address: 'چهارراه ولیصر', type: 'ایرانی سنتی', stock: '1,000', shipPrice: '4,000', percent: '4.2', comment: '1622' },
                { pic_link: { require: require('../../../images/sample_adv.jpg') }, title: 'کترینگ سپنتاب', address: 'چهارراه ولیصر', type: 'ایرانی سنتی', stock: '1,000', shipPrice: '4,000', percent: '4.2', comment: '1622' },
                { pic_link: { require: require('../../../images/sample_adv.jpg') }, title: 'کترینگ سپنتاب', address: 'چهارراه ولیصر', type: 'ایرانی سنتی', stock: '1,000', shipPrice: '4,000', percent: '4.2', comment: '1622' },
                { pic_link: { require: require('../../../images/sample_adv.jpg') }, title: 'کترینگ سپنتاب', address: 'چهارراه ولیصر', type: 'ایرانی سنتی', stock: '1,000', shipPrice: '4,000', percent: '4.2', comment: '1622' },
                { pic_link: { require: require('../../../images/sample_adv.jpg') }, title: 'کترینگ سپنتاب', address: 'چهارراه ولیصر', type: 'ایرانی سنتی', stock: '1,000', shipPrice: '4,000', percent: '4.2', comment: '1622' },
            ]
            
        }
    }
    render() {
        return (
            <View style={{flex:1,marginTop:10}}>
                <FlatList
                    keyExtractor={(item, index) => { return index.toString() }}
                    data={this.state.CustomerClubData}
                    renderItem={({ item }) =>
                        <View style={{ width: '97%', height: 110, backgroundColor: '#ffffff', alignSelf: 'center', elevation: 10, marginVertical: 10, flexDirection: 'row-reverse' }}>
                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                                <Image resizeMode='cover' style={{ height: '90%', width: '90%', borderRadius: 5 }} source={item.pic_link.require} />
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
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 8, textAlign: 'left' }}>{item.comment} نظر</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', padding: 6 }}>
                                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>موجودی باشگاه مشتریان: </Text>
                                        <Icon style={{ fontSize: 10 }} name='logo-usd' />
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 9 }}>{item.stock} </Text>
                                    </View>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>هزینه ارسال:{item.shipPrice} تومان</Text>
                                </View>
                            </View>
                        </View>
                    } />
            </View>
        )
    }
}

export default CustomerClub

