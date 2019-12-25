import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView, FlatList } from 'react-native'
import { Icon, Textarea } from 'native-base'
import FooterViewI from '../FooterViewI';
import LoyalityClubMainPageHeader from '../Headers/LoyalityClubMainPageHeader'

export class LoyalityClubMainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LoyalityData: [
                { pic: { link: require('../../images/sample_adv.jpg') }, title: 'کافه رستوران علی و عباس', Scoin: 1000 },
                { pic: { link: require('../../images/sample_adv.jpg') }, title: 'کافه رستوران علی و عباس', Scoin: 1000 },
                { pic: { link: require('../../images/sample_adv.jpg') }, title: 'کافه رستوران علی و عباس', Scoin: 1000 },
                { pic: { link: require('../../images/sample_adv.jpg') }, title: 'کافه رستوران علی و عباس', Scoin: 1000 },
                { pic: { link: require('../../images/sample_adv.jpg') }, title: 'کافه رستوران علی و عباس', Scoin: 1000 },
                { pic: { link: require('../../images/sample_adv.jpg') }, title: 'کافه رستوران علی و عباس', Scoin: 1000 },
                { pic: { link: require('../../images/sample_adv.jpg') }, title: 'کافه رستوران علی و عباس', Scoin: 1000 },
            ]
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <LoyalityClubMainPageHeader navigation={navigation} />,
            headerLeft: null,
            headerStyle: {
                backgroundColor: '#573c65',
            }
        }
    };
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F3F3' }}>
                <ScrollView>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row-reverse' }}>
                        <View style={{ backgroundColor: '#FDD93C', width: '80%', height: 40, alignSelf: 'center', marginTop: 8, borderRadius: 40, alignItems: 'center', justifyContent: 'center' }} >
                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 16 }}>یافتن باشگاه مشتریان (S-Beacon)</Text>

                        </View>
                        <TouchableOpacity>
                            <Icon name='help-circle' style={{ fontSize: 25, marginRight: 5, transform: [{ scaleX: -1 }] }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center', marginTop: 20, marginLeft: '2.5%' }}>
                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>نزدیک‌‌ ترین باشگاه مشتریان</Text>
                        <Icon name='help-circle' style={{ fontSize: 20, marginRight: 5, transform: [{ scaleX: -1 }] }} />
                    </View>
                    <View style={{ width: '90%', flexDirection: 'row-reverse', alignItems: 'center', height: 40, elevation: 5, marginHorizontal: '5%', marginVertical: 10, backgroundColor: 'white', borderRadius: 20, paddingLeft: 25 }}>
                        <Icon name='search' style={{ fontSize: 30, marginLeft: 10, color: '#c4c4c4' }} />
                        <View style={{ width: '70%', height: 40, }}>
                            <Textarea placeholderTextColor='#c4c4c4' placeholder='جست‌وجو در باشگاه‌های مشتریان' style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 14, color: '#c4c4c4' }} />
                        </View>
                    </View>
                    <View style={{ marginTop: 5, paddingHorizontal: '5%', flex: 1 }}>
                        <FlatList
                        numColumns={2}
                            data={this.state.LoyalityData}
                            renderItem={({ item }) =>
                                <View style={{ width: '47%', marginHorizontal: '1.5%', height: 140, borderRadius: 20, alignItems: 'center',marginTop:15 }}>
                                    <Image resizeMode='cover' style={{ height: '100%', width: '100%', borderRadius: 20 }} source={item.pic.link} />
                                    <View style={{ position: 'absolute', bottom: 35, height: 20, width: '90%', backgroundColor: '#827086', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'white' }}>{item.title}</Text>
                                    </View>
                                    <View style={{ position: 'absolute', bottom: 12, height: 15, width: '75%', backgroundColor: '#827086', borderRadius: 7.5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 9, color: 'white' }}> :موجودی باشگاه مشتریان <Icon style={{ fontSize: 8, color: 'white' }} name='logo-usd' /> {item.Scoin}</Text>
                                    </View>
                                </View>}
                        />
                    </View>
                </ScrollView>
                <FooterViewI menu={3} navigation={this.props.navigation}/>

            </SafeAreaView>
        )
    }
}

export default LoyalityClubMainPage
