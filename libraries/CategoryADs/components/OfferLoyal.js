import React, { Component } from 'react'
import { Text, View, FlatList, Image } from 'react-native'
import { Icon } from 'native-base';
import CountDown from 'react-native-countdown-component';

export class CustomerClub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            OfferLoyalData: [
                { pic_link: { require: require('../../../images/sample_adv.jpg') }, title: 'پاستا پنه آلفردو', address: 'چهارراه ولیصر', type: 'ایرانی سنتی', stock: '1,000', shipPrice: '4,000', percent: '4.2', comment: '1622' },
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
            <View style={{ flex: 1, marginTop: 10 }}>
                <FlatList
                    keyExtractor={(item, index) => { return index.toString() }}
                    data={this.state.OfferLoyalData}
                    renderItem={({ item }) =>
                        <View style={{ width: '97%', height: 110, backgroundColor: '#ffffff', alignSelf: 'center', elevation: 10, marginVertical: 10, flexDirection: 'row-reverse' }}>
                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                                <Image resizeMode='cover' style={{ height: '90%', width: '90%', borderRadius: 5 }} source={item.pic_link.require} />
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
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>50,000 تومان</Text>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>25,100 تومان</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>موجودی : 10</Text>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>هزینه ارسال: 3,000 تومان</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>امتیاز مخصوص کافه سپنتاب مورد نیاز: <Icon style={{ fontSize: 10 }} name='logo-usd' />1,000</Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </View>
                    } />
            </View>
        )
    }
}

export default CustomerClub

