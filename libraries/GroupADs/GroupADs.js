import React, { Component } from 'react'
import { Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper'
import { Icon, Textarea } from 'native-base'
import CountDown from 'react-native-countdown-component'
export class GroupADs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabSelected: 0,
            Txt: 'حافظ در طول زندگی خود با بسیاری از سلاطین و درباریان تعامل داشت و با اهل علم و ادب و شعر هم هم‌نشینی داشت و از احوال صوفیان و درویشان زمانش هم باخبر بود اما خودش هرگز در هیچ از این گروه‌ها قرار نگرفت. کنایه‌های تلخ و تندی که در دیوانش به صوفیان فریبکار و سلاطین متظاهر به دین‌داری زده‌است، اثباتی بر این ادعا هستند. حافظ هیچ گناهی را سنگین‌تر از مردم‌فریبی و ریاکاری نمی‌دانست و همواره به افراد متظاهر در اشعارش می‌تاخت. مکتب حافظ رندی است و رند و رندی کلیدی‌ترین و بنیادی‌ترین اصطلاح در شعر و جهان‌بینی حافظ است؛ ازاین‌رو، شناخت رندیْ شناخت جهان‌بینی، اندیشه و هنر حافظ را نتیجه می‌دهد، به‌گونه‌ای‌که رندشناسی برابر با حافظ‌شناسی است. رندی در نگاه حافظ، نظامی روشنفکرانه و فلسفی است؛ و رند متفکر روشنفکر. انسان‌گرایی رندانه با انسان‌گرایی غربی تفاوت دارد و آن به‌خاطر پشتوانهٔ معنوی و الهی‌اش است. عشق روش رندان است، تقدیر آنان عشق ورزیدن است و رنج کشیدن در راهش. بیش از هر شخصیت دیگری که در دیوان دیده می‌شود، رندْ حامل پیام حافظ است، و نزدیک‌ترین فرد به طرح‌ریزی جهان‌بینی خود شاعر و اندیشهٔ قهرمانانه‌اش است. او با زاهد در تضاد است، روحی آزاد است که از لذات زندگی لذت می‌برد و آن را تکلیف خود در مبارزه با بی‌اعتباری در همه اشکالش می‌بیند؛ بنابراین رند آرمان معنوی تازه‌ای است؛ مصالحه‌ای میان انسان کامل با وضعیت انسانی. حافظ، اگر انسان کامل نیست، اما کاملاً انسان است. حافظ بیش از مبتکر بودن، شاعری به‌کمال‌رسانندهٔ سنتِ خوبِ آفریدهٔ گذشتگان بود. سبک شعر حافظ دارای سه فضای عاشقانه، عارفانه و مدحی است. اما مهم‌ترین شاخصهٔ سبک حافظ، عدم ارتباط و به‌عبارتی پریشانی و پراکندگی موضوع و استقلال ابیات است که همچنان مورد بحث حافظ‌پژوهان است. حافظ با دگرگونی‌های پی‌درپی در صور خیال و بن‌مایه‌ها سبب ایجاد این توهم می‌شود که موضوع شعر نیز تغییر می‌کند، درحالی‌که شاید چنین نباشد. ازاین‌رو، برای تحلیل درست غزل حافظ باید مرز ظریف میان موضوع بیان‌شده و روش‌های گوناگونِ بیان آن موضوع را در نظر داشت.',
            TxtExpanded: false,
            TxtIconHandleName: 'arrow-dropdown-circle'
        }
    }
    _tabSelected(tab) {
        this.setState({ tabSelected: tab })
    }

    _renderTxtHandle() {
        let TxtExpanded = this.state.TxtExpanded
        if (TxtExpanded == false) {
            var TxtIconHandleName = 'arrow-dropup-circle'
        } else {
            var TxtIconHandleName = 'arrow-dropdown-circle'

        }
        this.setState({ TxtExpanded: !TxtExpanded, TxtIconHandleName: TxtIconHandleName })
    }
    _renderTxt() {
        if (this.state.TxtExpanded !== true) {
            return (
                <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 12 }}>{this.state.Txt.substring(0, 200)}...</Text>
            )
        } else {
            return (
                <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 12 }}>{this.state.Txt}</Text>
            )

        }

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 1, height: 260 }}>
                        <Swiper
                            activeDotColor={'#573c65'}
                            dot={<View style={{ backgroundColor: '#827086', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />}
                            loop={true}
                            autoplay={true}
                            showsButtons={true}
                            nextButton={<Icon style={{ color: '#573c65' }} name='arrow-dropright-circle' />}
                            prevButton={<Icon style={{ color: '#573c65' }} name='arrow-dropleft-circle' />}
                        >
                            <Image resizeMode='stretch' style={{ height: '80%', width: '100%' }} source={require('../../images/back1.jpg')} />
                            <Image resizeMode='stretch' style={{ height: '80%', width: '100%' }} source={require('../../images/back1.jpg')} />
                            <Image resizeMode='stretch' style={{ height: '80%', width: '100%' }} source={require('../../images/back1.jpg')} />
                        </Swiper>
                    </View>
                    <View style={{ elevation: 6, width: '95%', height: 70, backgroundColor: '#827086', alignSelf: 'center', borderRadius: 8, padding: 15 }}>
                        <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 12 }}>منو باز غذایی با طعم عالی در رستوران بین المللی BBQ با 53% تخفیف و پرداخت تنها 22,090 تومان به جای 47,00 تومان</Text>
                    </View>
                    <View style={{ height: 140, width: '98%', elevation: 2, borderRadius: 8, marginTop: 5, alignSelf: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 1, paddingHorizontal: 5, borderBottomWidth: 1, borderBottomColor: '#8f8f8f', borderStyle: 'dotted', width: '95%', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11, color: '#8f8f8f' }}>قیمت قدیم: 50,000 تومان</Text>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11 }}>قیمت جدید: 25,100 تومان</Text>
                        </View>
                        <View style={{ flex: 1, paddingHorizontal: 5, borderBottomWidth: 1, borderBottomColor: '#8f8f8f', borderStyle: 'dotted', width: '95%', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11, color: '#8f8f8f' }}>مقدار SCoin مورد نیاز: 0 <Icon style={{ fontSize: 11, color: '#8f8f8f' }} name='logo-usd' /></Text>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11 }}>53% تخفیف</Text>
                        </View>
                        <View style={{ flex: 2, paddingHorizontal: 5, borderBottomWidth: 1, borderBottomColor: '#8f8f8f', borderStyle: 'dotted', width: '95%', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row-reverse', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11 }}>امتیاز:</Text>
                                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-around', alignItems: 'center', width: '40%' }} >
                                        <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star-outline' />
                                        <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star-outline' />
                                        <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star' />
                                        <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star' />
                                        <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star' />
                                    </View>
                                    <View style={{ height: 20, width: 35, backgroundColor: '#573c65', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11, color: 'white' }}>3.1</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ height: 25, width: 100, borderWidth: 1, borderRadius: 10, borderColor: '#f7bfe2', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11 }}>تعداد خرید: 5109</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={{ height: 25, width: 120, borderColor: 'gray', borderWidth: 1, borderRadius: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                    <Icon name="ios-timer" style={{ fontSize: 18, marginRight: 5 }} />
                                    <CountDown
                                        size={5}
                                        until={551452}
                                        digitStyle={{ backgroundColor: '#FFF' }}
                                        digitTxtStyle={{ color: 'black', fontSize: 8, fontFamily: 'IRANSans(FaNum)' }}
                                        separatorStyle={{ color: 'black' }}
                                        timeToShow={['D', 'H', 'M', 'S']}
                                        timeLabels={{ m: null, s: null }}
                                        showSeparator
                                    />
                                </View>
                            </View>
                        </View>

                    </View>
                    <View style={{ marginTop: 5, width: '95%', height: 70, alignSelf: 'center', borderRadius: 8, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-around' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ height: 25, width: 100, borderRadius: 10, backgroundColor: '#573c65', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                <Icon style={{ fontSize: 12, color: 'white' }} name='share' />
                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white' }}>اشتراک گذاری</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, height: 40, width: 120, borderRadius: 20, backgroundColor: '#5daa2c', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row-reverse' }}>
                            <Icon style={{ fontSize: 18, color: 'white' }} name='basket' />
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 18, color: 'white' }}>خرید</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ height: 25, width: 100, borderRadius: 10, backgroundColor: '#573c65', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                <Icon style={{ fontSize: 12, color: 'white' }} name='archive' />
                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white' }}>آرشیو</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 35, width: "97%", alignSelf: 'center', marginTop: 5, elevation: 2, flexDirection: 'row-reverse', backgroundColor: 'white', borderRadius: 5, justifyContent: 'space-around' }}>
                        <TouchableOpacity
                            onPress={() => this._tabSelected(0)}
                            style={{ flex: 1, borderBottomRightRadius: 5, borderTopRightRadius: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row-reverse', backgroundColor: (this.state.tabSelected === 0) ? '#573c65' : 'white' }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: (this.state.tabSelected == 0) ? 'white' : '#a6a6a6' }}>ویژگی ها</Text>
                        </TouchableOpacity>
                        <View style={{ backgroundColor: 'gray', height: '100%', width: .4 }}></View>
                        <TouchableOpacity
                            onPress={() => this._tabSelected(1)}
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: (this.state.tabSelected === 1) ? '#573c65' : 'white' }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: (this.state.tabSelected == 1) ? 'white' : '#a6a6a6' }}>شرایط استفاده</Text>
                        </TouchableOpacity>
                        <View style={{ backgroundColor: 'gray', height: '100%', width: .4 }}></View>
                        <TouchableOpacity
                            onPress={() => this._tabSelected(2)}
                            style={{ flex: 1, borderBottomLeftRadius: 5, borderTopLeftRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: (this.state.tabSelected === 2) ? '#573c65' : 'white' }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: (this.state.tabSelected == 2) ? 'white' : '#a6a6a6' }}>توضیحات</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ padding: 20, width: "97%", alignSelf: 'center', marginVertical: 10, backgroundColor: '#827086', borderRadius: 5, justifyContent: 'space-around' }}>
                        <View>{this._renderTxt()}</View>
                        <Icon onPress={() => { this._renderTxtHandle() }} style={{ color: '#573c65', position: 'absolute', bottom: -20, marginBottom: 10, alignSelf: 'center' }} name={this.state.TxtIconHandleName} />
                    </View>
                    <View style={{ width: '95%', height: 100, alignSelf: 'center', marginTop:10, flexDirection: 'row-reverse' }}>
                        <View style={{ flex: 1, justifyContent: 'space-evenly', paddingHorizontal: 5 }}>
                            <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Icon style={{ fontSize: 12, color: '#573c65' }} type='MaterialIcons' name='comment' />
                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: '#573c65' }}>ثبت نظر و دادن امتیاز:</Text>
                            </View>
                            <View style={{ flexDirection: 'row-reverse', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ height: 20, width: 35, backgroundColor: '#573c65', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11, color: 'white' }}>3.1</Text>
                                </View>
                                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-around', alignItems: 'center', width: '40%' }} >
                                    <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star-outline' />
                                    <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star-outline' />
                                    <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star' />
                                    <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star' />
                                    <Icon style={{ fontSize: 11, color: '#573c65' }} name='ios-star' />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ height: 20, width: 100, backgroundColor: '#573c65', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11, color: 'white' }}>مشاهده نظرات بیشتر</Text>
                                </View>
                                <Icon style={{ fontSize: 18, color: '#573c65' }} name='arrow-dropdown-circle' />
                            </View>
                        </View>
                        <View style={{ flex: 2, padding: 5 }}>
                            <View style={{ minHeight: 70, backgroundColor: '#827086', borderRadius: 8,}}>
                                <Textarea placeholder='نظر خود را بنویسید' placeholderTextColor='white' style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11, color: 'white' }}></Textarea>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row-reverse', marginTop: 10, marginHorizontal: '1.5%', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>تخفیف های مشابه گروهی</Text>
                        </View>
                      
                    </View>
                    <View style={{ height: 180, width: 320, marginTop: 10, marginBottom: 20, marginHorizontal: 5, elevation: 2, borderRadius: 10 }}>
                                    <View style={{ flex: 2, flexDirection: 'row-reverse' }}>
                                        <View style={{ flex: 1.2, justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ height: 20, width: 20, backgroundColor: '#573C65', opacity: .7, position: 'absolute', zIndex: 1, right: '5%', top: '5%', borderTopRightRadius: 5, borderBottomLeftRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 8, color: 'white' }}>12</Text>
                                            </View>
                                            <Image resizeMode='cover' style={{ height: '90%', width: '90%', borderRadius: 5 }} source={require('../../images/ham.png')} />
                                        </View>
                                        <View style={{ flex: 2, padding: 10, justifyContent: 'space-around', borderBottomWidth: .5, borderStyle: 'dotted', borderColor: 'gray' }}>
                                            <View><Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>دلفیناریوم برج میلاد</Text></View>
                                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>5,000 تومان</Text>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>1,000 تومان</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                <View style={{ height: 20, width: 80, borderColor: '#F7BFE2', borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>تعداد خرید: 1,100</Text>
                                                </View>
                                                
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1.2, padding: 10, justifyContent: 'space-around' }}>
                                        <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{ height: 25, width: 100, borderColor: '#F7BFE2', borderWidth: 1, borderRadius: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                                <Icon name="ios-timer" style={{ fontSize: 18, marginRight: 5 }} />
                                                <CountDown
                                                    size={5}
                                                    until={parseInt(500000)}
                                                    digitStyle={{ backgroundColor: '#FFF' }}
                                                    digitTxtStyle={{ color: 'black', fontSize: 8, fontFamily: 'IRANSans(FaNum)' }}
                                                    separatorStyle={{ color: 'black' }}
                                                    timeToShow={['D', 'H', 'M', 'S']}
                                                    timeLabels={{ m: null, s: null }}
                                                    showSeparator
                                                />
                                                </View>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10,color:'#573c65' }}>ستارخان</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row-reverse' }}>
                                            <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}>مقدار SCoin مورد نیاز</Text>
                                                <Icon style={{ fontSize: 12, marginStart: 2 }} name='logo-steam' />
                                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}>123</Text>
                                            </View>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginStart: 2 }}>امتیاز: 342</Text>
                                        </View>
                                    </View>
                                </View>
                </ScrollView>
            </SafeAreaView >
        )
    }
}

export default GroupADs
