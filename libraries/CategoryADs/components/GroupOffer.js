import React, { Component } from 'react'
import { Text, View, Image, FlatList } from 'react-native'
import { Icon } from 'native-base';
export class GroupOffer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            GroupOfferData: [
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
            <View style={{ flex: 1, marginTop: 10 }}>
                <FlatList
                    keyExtractor={(item, index) => { return index.toString() }}
                    data={this.state.GroupOfferData}
                    renderItem={({ item }) =>
                        <View style={{ height: 150, width: '97%', backgroundColor: '#ffffff', alignSelf: 'center', elevation: 10, marginVertical: 10, }}>
                            <View style={{ flex: 3, flexDirection: 'row-reverse' }}>
                                <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image resizeMode='cover' style={{ height: '90%', width: '90%', borderRadius: 5 }} source={item.pic_link.require} />
                                </View>
                                <View style={{ flex: 4 }}>
                                    <View style={{ flex: 3, flexDirection: 'row-reverse' }}>
                                        <View style={{ flex: 1, justifyContent: 'space-around', padding: 6 }}>
                                            <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 11 }}>{item.title}</Text>
                                            <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 10 }}> غذای دریایی و ماهی تازه در فیش لند چیپس غذای دریایی و ماهی تازه در فیش اند چیپس</Text>
                                        </View>

                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', padding: 6 }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>بلوار آفریقا </Text>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>50,000 تومان</Text>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>25,100 تومان</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row-reverse', padding: 6, justifyContent: 'space-between' }}>
                                <View style={{ justifyContent: 'space-around' }}>
                                    <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 10 }}>تعداد خرید: 5109 </Text>
                                    <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 10 }}>مقدار Scoin مورد نیاز: <Icon style={{ fontSize: 10 }} name='logo-usd' /> 0</Text>
                                </View>
                                <View style={{flex:1,justifyContent:'center'}}>
                                <View style={{ height: 20, width: 80, borderColor: 'gray', borderWidth: 1, borderRadius: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                    <Icon name="ios-timer" style={{ fontSize: 18, marginRight: 5 }} />
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>1:10:24:23</Text>
                                </View>
                                </View>
                            </View>
                        </View>
                    } />
            </View>
        )
    }
}

export default GroupOffer
