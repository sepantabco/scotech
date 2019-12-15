import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Dimensions, PixelRatio, SafeAreaView, FlatList } from 'react-native';
import { Icon } from "native-base";
class CompleteHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pointItemData: [
                { title: 'رستوران سپنتاب', address: 'چهارراه ولیعصر', type: 'ایرانی سنتی', shopPoint: '1000', pointPercent: '4.9', pic_link: '', shipPrice: '2,000' },
                { title: 'رستوران سپنتاب', address: 'چهارراه ولیعصر', type: 'ایرانی سنتی', shopPoint: '1000', pointPercent: '4.9', pic_link: '', shipPrice: '2,000' },
                { title: 'رستوران سپنتاب', address: 'چهارراه ولیعصر', type: 'ایرانی سنتی', shopPoint: '1000', pointPercent: '4.9', pic_link: '', shipPrice: '2,000' },
                { title: 'رستوران سپنتاب', address: 'چهارراه ولیعصر', type: 'ایرانی سنتی', shopPoint: '1000', pointPercent: '4.9', pic_link: '', shipPrice: '2,000' },
                { title: 'رستوران سپنتاب', address: 'چهارراه ولیعصر', type: 'ایرانی سنتی', shopPoint: '1000', pointPercent: '4.9', pic_link: '', shipPrice: '2,000' },
                { title: 'رستوران سپنتاب', address: 'چهارراه ولیعصر', type: 'ایرانی سنتی', shopPoint: '1000', pointPercent: '4.9', pic_link: '', shipPrice: '2,000' },
                { title: 'رستوران سپنتاب', address: 'چهارراه ولیعصر', type: 'ایرانی سنتی', shopPoint: '1000', pointPercent: '4.9', pic_link: '', shipPrice: '2,000' },
                { title: 'رستوران سپنتاب', address: 'چهارراه ولیعصر', type: 'ایرانی سنتی', shopPoint: '1000', pointPercent: '4.9', pic_link: '', shipPrice: '2,000' },
                { title: 'رستوران سپنتاب', address: 'چهارراه ولیعصر', type: 'ایرانی سنتی', shopPoint: '1000', pointPercent: '4.9', pic_link: '', shipPrice: '2,000' },
                { title: 'رستوران سپنتاب', address: 'چهارراه ولیعصر', type: 'ایرانی سنتی', shopPoint: '1000', pointPercent: '4.9', pic_link: '', shipPrice: '2,000' },

            ],
            offerItemData: [
                { item: 'پاستا پنه آلفردوچیکن', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
                { item: 'پاستا پنه آلفردوچیکن', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
                { item: 'پاستا پنه آلفردوچیکن', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
                { item: 'پاستا پنه آلفردوچیکن', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
                { item: 'پاستا پنه آلفردوچیکن', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
                { item: 'پاستا پنه آلفردوچیکن', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
                { item: 'پاستا پنه آلفردوچیکن', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
                { item: 'پاستا پنه آلفردوچیکن', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
                { item: 'پاستا پنه آلفردوچیکن', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
                { item: 'پاستا پنه آلفردوچیکن', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
                { item: 'پاستا پنه آلفردوچیکن', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
                { item: 'پاستا پنه آلفردوچیکن', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
                { item: 'پاستا پنه آلفردوچیکن', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
                { item: 'پاستا پنه آلفردوچیکن', currentPrice: '25,100', lastPrice: '30,000', timeRemain: '02:3:10', stock: '10', shipPrice: '10,000', pointNeed: '1000', pointPercent: '30%' },
            ]
        };
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: '#F3F3F3' }}>
                    {/* شانس امروز */}
                    <View style={{ backgroundColor: '#FDD93C', width: '97%', height: 60, alignSelf: 'center', marginTop: 8, borderRadius: 6, alignItems: 'center', justifyContent: 'center' }} >
                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 25 }}>شانس امروزتو امتحان کن!</Text>
                    </View>
                    {/*end شانس امروز */}
                    {/* عنوان امتیازات باشگاه مشتریان */}
                    <View style={{ flexDirection: 'row-reverse', marginTop: 10, marginHorizontal: '1.5%', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>امتیازات باشگاه مشتریان</Text>
                            <Icon name='help-circle-outline' style={{ fontSize: 20, marginRight: 5, transform: [{ scaleX: -1 }] }} />
                        </View>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>نمایش همه</Text>
                            <Icon name="chevron-left" type='EvilIcons' style={{ fontSize: 20, marginRight: 5 }} />
                        </View>
                    </View>
                    {/* end عنوان متیازات باشگاه مشتریان */}
                    {/* کارد امتیازات باشگاه مشتریان  */}
                    <View style={{ marginHorizontal: '1.5%' }}>
                        <FlatList
                            inverted
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={this.state.pointItemData}
                            renderItem={({ item }) =>
                                <View style={{ height: 210, width: 170, marginTop: 10, marginHorizontal: 5, borderRadius: 6, elevation: 2 }}>
                                    <View style={{ position: 'absolute', zIndex: 1, width: 35, height: 20, backgroundColor: '#573C65', opacity: .7, borderTopLeftRadius: 6, borderBottomRightRadius: 6, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white' }}>{item.pointPercent}</Text>
                                    </View>
                                    <View style={{ flex: 4, borderTopRightRadius: 6, borderTopLeftRadius: 6, overflow: 'hidden' }}>
                                        <Image resizeMode='cover' style={{ height: '100%', width: '100%', borderTopRightRadius: 6, borderTopLeftRadius: 6 }} source={require('../../images/sample_adv.jpg')} />
                                    </View>
                                    <View style={{ flex: 2, padding: 5, borderBottomWidth: .5, borderStyle: 'dotted', borderColor: 'gray' }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>{item.title}</Text>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.address}</Text>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.type}</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', paddingHorizontal: 5, alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>موجودی باشگاه مشتریان:</Text>
                                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                                            <Icon style={{ fontSize: 12 }} name='logo-usd' />
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>{item.shopPoint} </Text>
                                        </View>
                                    </View>
                                </View>
                            } />
                    </View>
                    {/*end کارد امتیازات باشگاه مشتریان  */}
                    <Image resizeMode='stretch' style={{ maxHeight: 120, width: '97%', alignSelf: 'center', marginVertical: 15, elevation: 5 }} source={require('../../images/mainpagebannertop.jpeg')} />
                    {/* عنوان پیشنهادات باشگاه مشتریان */}
                    <View style={{ flexDirection: 'row-reverse', marginTop: 10, marginHorizontal: '1.5%', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>پیشنهادات باشگاه مشتریان</Text>
                            <Icon name='help-circle-outline' style={{ fontSize: 20, marginRight: 5, transform: [{ scaleX: -1 }] }} />
                        </View>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>نمایش همه</Text>
                            <Icon name="chevron-left" type='EvilIcons' style={{ fontSize: 20, marginRight: 5 }} />
                        </View>
                    </View>
                    {/* end عنوان پیشنهادات باشگاه مشتریان */}
                    {/* کارد پیشنهادات باشگاه مشتریان */}
                    <View style={{ marginHorizontal: '1.5%' }}>
                        <FlatList
                            inverted
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={this.state.offerItemData}
                            renderItem={({ item }) =>
                                <View style={{ height: 180, width: 320, marginTop: 10, marginBottom: 5, marginHorizontal: 5, elevation: 2, borderRadius: 10 }}>
                                    <View style={{ flex: 2, flexDirection: 'row-reverse' }}>
                                        <View style={{ flex: 1.2, justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ height: 20, width: 20, backgroundColor: '#573C65', opacity: .7, position: 'absolute', zIndex: 1, right: '5%', top: '5%', borderTopRightRadius: 5, borderBottomLeftRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 8, color: 'white' }}>{item.pointPercent}</Text>
                                            </View>
                                            <Image resizeMode='cover' style={{ height: '90%', width: '90%', borderRadius: 5 }} source={require('../../images/sample_adv.jpg')} />
                                        </View>
                                        <View style={{ flex: 2, padding: 10, justifyContent: 'space-around', borderBottomWidth: .5, borderStyle: 'dotted', borderColor: 'gray' }}>
                                            <View><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>{item.item}</Text></View>
                                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.currentPrice} تومان</Text>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.lastPrice} تومان</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                <View style={{ height: 20, width: 80, borderColor: 'gray', borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>موجودی: {item.stock}</Text>
                                                </View>
                                                <Icon name="ios-add-circle-outline" style={{ fontSize: 20, marginRight: 5 }} />
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1.2, padding: 10, justifyContent: 'space-around' }}>
                                        <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{ height: 20, width: 80, borderColor: 'gray', borderWidth: 1, borderRadius: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                                <Icon name="ios-timer" style={{ fontSize: 18, marginRight: 5 }} />
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.timeRemain}</Text>
                                            </View>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>هزینه ارسال:{item.shipPrice} تومان</Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}>امتیاز مورد نیاز مخصوص کافه سپنتاب:</Text>
                                            <Icon style={{ fontSize: 12, marginStart: 2 }} name='logo-usd' />
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}>{item.pointNeed}</Text>
                                        </View>
                                    </View>

                                </View>
                            } />
                    </View>
                    {/*end کارد پیشنهادات باشگاه مشتریان */}
                    <Image resizeMode='stretch' style={{ maxHeight: 120, width: '97%', alignSelf: 'center', marginTop: 15, elevation: 5 }} source={require('../../images/mainpagebannertop.jpeg')} />
                    <Image resizeMode='stretch' style={{ maxHeight: 120, width: '97%', alignSelf: 'center', marginTop: 1, elevation: 5 }} source={require('../../images/mainpagebannerbottom.jpeg')} />
                    {/* عنوان نزدیک‌‌ ترین باشگاه مشتریان */}
                    <View style={{ flexDirection: 'row-reverse', marginTop: 10, marginHorizontal: '1.5%', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>نزدیک‌‌ ترین باشگاه مشتریان</Text>
                            <Icon name='help-circle-outline' style={{ fontSize: 20, marginRight: 5, transform: [{ scaleX: -1 }] }} />
                        </View>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>نمایش همه</Text>
                            <Icon name="chevron-left" type='EvilIcons' style={{ fontSize: 20, marginRight: 5 }} />
                        </View>
                    </View>
                    {/* end عنوان نزدیک‌‌ ترین باشگاه مشتریان */}
                    {/* کارد نزدیک‌‌ ترین باشگاه مشتریان  */}
                    <View style={{ marginHorizontal: '1.5%' }}>
                        <FlatList
                            inverted
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={this.state.pointItemData}
                            renderItem={({ item }) =>
                                <View style={{ height: 210, width: 170, marginTop: 10, marginHorizontal: 5, borderRadius: 6, elevation: 2 }}>
                                    <View style={{ position: 'absolute', zIndex: 1, width: 35, height: 20, backgroundColor: '#573C65', opacity: .7, borderTopLeftRadius: 6, borderBottomRightRadius: 6, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white' }}>{item.pointPercent}</Text>
                                    </View>
                                    <View style={{ flex: 4, borderTopRightRadius: 6, borderTopLeftRadius: 6, overflow: 'hidden' }}>
                                        <Image resizeMode='cover' style={{ height: '100%', width: '100%', borderTopRightRadius: 6, borderTopLeftRadius: 6 }} source={require('../../images/sample_adv.jpg')} />
                                    </View>
                                    <View style={{ flex: 2, padding: 5 }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>{item.title}</Text>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.address}</Text>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.type}</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', paddingHorizontal: 5, alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>هزینه ارسال:{item.shipPrice} تومان</Text>
                                    </View>
                                </View>
                            } />
                    </View>
                    {/*end کارد نزدیک‌‌ ترین باشگاه مشتریان  */}
                    <Image resizeMode='stretch' style={{ maxHeight: 120, width: '97%', alignSelf: 'center', marginTop: 15, elevation: 5 }} source={require('../../images/mainpagebannertop.jpeg')} />
                    {/* با SCoin عنوان */}
                    <View style={{ flexDirection: 'row-reverse', marginTop: 10, marginHorizontal: '1.5%', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>با SCoin</Text>
                            <Icon name='help-circle-outline' style={{ fontSize: 20, marginRight: 5, transform: [{ scaleX: -1 }] }} />
                        </View>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>نمایش همه</Text>
                            <Icon name="chevron-left" type='EvilIcons' style={{ fontSize: 20, marginRight: 5 }} />
                        </View>
                    </View>
                    {/* end با SCoin عنوان*/}
                    {/*  با SCoin کارد*/}
                    <View style={{ marginHorizontal: '1.5%' }}>
                        <FlatList
                            inverted
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={this.state.offerItemData}
                            renderItem={({ item }) =>
                                <View style={{ height: 180, width: 320, marginTop: 10, marginBottom: 5, marginHorizontal: 5, elevation: 2, borderRadius: 10 }}>
                                    <View style={{ flex: 2, flexDirection: 'row-reverse' }}>
                                        <View style={{ flex: 1.2, justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ height: 20, width: 20, backgroundColor: '#573C65', opacity: .7, position: 'absolute', zIndex: 1, right: '5%', top: '5%', borderTopRightRadius: 5, borderBottomLeftRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 8, color: 'white' }}>{item.pointPercent}</Text>
                                            </View>
                                            <Image resizeMode='cover' style={{ height: '90%', width: '90%', borderRadius: 5 }} source={require('../../images/sample_adv.jpg')} />
                                        </View>
                                        <View style={{ flex: 2, padding: 10, justifyContent: 'space-around', borderBottomWidth: .5, borderStyle: 'dotted', borderColor: 'gray' }}>
                                            <View><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>{item.item}</Text></View>
                                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.currentPrice} تومان</Text>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.lastPrice} تومان</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                <View style={{ height: 20, width: 80, borderColor: '#F7BFE2', borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>تعداد خرید: {item.stock}</Text>
                                                </View>
                                                <Icon name="ios-add-circle-outline" style={{ fontSize: 20, marginRight: 5 }} />
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1.2, padding: 10, justifyContent: 'space-around' }}>
                                        <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{ height: 20, width: 80, borderColor: '#F7BFE2', borderWidth: 1, borderRadius: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                                <Icon name="ios-timer" style={{ fontSize: 18, marginRight: 5 }} />
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.timeRemain}</Text>
                                            </View>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>هزینه ارسال:{item.shipPrice} تومان</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row-reverse' }}>
                                            <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}>مقدار SCoin مورد نیاز</Text>
                                                <Icon style={{ fontSize: 12, marginStart: 2 }} name='logo-steam' />
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}>{item.pointNeed}</Text>
                                            </View>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}>امتیاز: 3.2</Text>
                                        </View>
                                    </View>
                                </View>
                            } />
                    </View>
                    {/*end  با SCoin کارد*/}
                    {/* عنوان برترین تخفیف‌ها*/}
                    <View style={{ flexDirection: 'row-reverse', marginTop: 10, marginHorizontal: '1.5%', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>برترین تخفیف‌ها</Text>
                            <Icon name='help-circle-outline' style={{ fontSize: 20, marginRight: 5, transform: [{ scaleX: -1 }] }} />
                        </View>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>نمایش همه</Text>
                            <Icon name="chevron-left" type='EvilIcons' style={{ fontSize: 20, marginRight: 5 }} />
                        </View>
                    </View>
                    {/*end عنوان برترین تخفیف‌ها*/}
                    {/*   کارد برترین تخفیفها*/}
                    <View style={{ marginHorizontal: '1.5%' }}>
                        <FlatList
                            inverted
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={this.state.offerItemData}
                            renderItem={({ item }) =>
                                <View style={{ height: 180, width: 320, marginTop: 10, marginBottom: 5, marginHorizontal: 5, elevation: 2, borderRadius: 10 }}>
                                    <View style={{ flex: 2, flexDirection: 'row-reverse' }}>
                                        <View style={{ flex: 1.2, justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ height: 20, width: 20, backgroundColor: '#573C65', opacity: .7, position: 'absolute', zIndex: 1, right: '5%', top: '5%', borderTopRightRadius: 5, borderBottomLeftRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 8, color: 'white' }}>{item.pointPercent}</Text>
                                            </View>
                                            <Image resizeMode='cover' style={{ height: '90%', width: '90%', borderRadius: 5 }} source={require('../../images/sample_adv.jpg')} />
                                        </View>
                                        <View style={{ flex: 2, padding: 10, justifyContent: 'space-around', borderBottomWidth: .5, borderStyle: 'dotted', borderColor: 'gray' }}>
                                            <View><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>{item.item}</Text></View>
                                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.currentPrice} تومان</Text>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.lastPrice} تومان</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                <View style={{ height: 20, width: 80, borderColor: '#F7BFE2', borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>تعداد خرید: {item.stock}</Text>
                                                </View>
                                                <Icon name="ios-add-circle-outline" style={{ fontSize: 20, marginRight: 5 }} />
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1.2, padding: 10, justifyContent: 'space-around' }}>
                                        <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{ height: 20, width: 80, borderColor: '#F7BFE2', borderWidth: 1, borderRadius: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                                <Icon name="ios-timer" style={{ fontSize: 18, marginRight: 5 }} />
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.timeRemain}</Text>
                                            </View>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>هزینه ارسال:{item.shipPrice} تومان</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row-reverse' }}>
                                            <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}>مقدار SCoin مورد نیاز</Text>
                                                <Icon style={{ fontSize: 12, marginStart: 2 }} name='logo-steam' />
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}>{item.pointNeed}</Text>
                                            </View>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}>امتیاز: 3.2</Text>
                                        </View>
                                    </View>
                                </View>
                            } />
                    </View>
                    {/* end  کارد برترین تخفیفها*/}
                    <Image resizeMode='stretch' style={{ maxHeight: 120, width: '97%', alignSelf: 'center', marginTop: 15, elevation: 5 }} source={require('../../images/mainpagebannertop.jpeg')} />
                    <Image resizeMode='stretch' style={{ maxHeight: 120, width: '97%', alignSelf: 'center', marginTop: 1, elevation: 5 }} source={require('../../images/mainpagebannerbottom.jpeg')} />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default CompleteHomePage;
