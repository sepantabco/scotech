import React, { Component } from 'react';
import { View, Text, ScrollView, Image, SafeAreaView } from 'react-native';
import GuideHeader from './Headers/GuideHeader';
import { Icon } from 'native-base';

class Guide extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <GuideHeader navigation={navigation} />,
            headerStyle: {
                backgroundColor: '#573c65',
            }
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.navigation.getParam('id'),
            Images: [
                { link: require('../images/SCoin_what.png') },
                { link: require('../images/scores_in.png') },
                { link: require('../images/offers_loyal.png') },
                { link: require('../images/nearest_club.png') },
                { link: require('../images/ba_SCoin.png') },
                { link: require('../images/best.png') },
                { link: require('../images/last_haffari.png') },
                { link: require('../images/indust_beacon.png') },
            ],
            Title: ['"\u202A چیست \u202C" Scoin', 'امتیازات باشگاه مشتریان', 'پیشنهرات باشگاه مشتریان', 'نزدیکترین باشگاه مشتریان', 'با Scoin چه می‌توان خرید؟', 'برترین تخفیف‌ها', 'حفاری چیست', '"\u202A چیست و چگونه به دست می‌آید؟ \u202C" S_Bcoin',],
            backgroundColor: ['#9999cc', '#33cc99', '#9999cc', '#6699ff', '#6666ff', '#9999cc', '#6699ff', '#33cc99'],
            Texts: [
                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 13, color: 'white', textAlign: 'right' }}>
                    <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/sCoin-white.png')} /> Scoin {"\n"}
                    واحد رسمی پول در اپلیکیشن اسکوتک (Scotech) است که از طریق آن می‌توان کالاها، خدمات و تخفیف‌های مختلف مثل شارژ را خریداری کرد. روش به دست آوردن Scoin <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/sCoin-white.png')} /> از طریق بخش حفاری <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/mininwhite.png')} /> در اپلیکیشن می‌باشد. همچنین برای شرکت در لیگ‌ها و بردن جوایز ارزنده باید ورودی لیگ را با Scoin <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/sCoin-white.png')} /> پرداخت کنید.
            </Text>,
                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 13, color: 'white', textAlign: 'right' }}>
                    شما در این قسمت می‌توانید آخرین امتیازات خود را در باشگاه‌های مشتریان عضو شده مشاهده کنید‌ و با توجه به امتیازتان خریدهای هیجان‌انگیز انجام دهید.
                </Text>,
                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 13, color: 'white', textAlign: 'right' }}>
                    شما در این قسمت پیشنهادات شگفت‌انگیز باشگاه مشتریانی که مخصوص شما گذاشته شده است مشاهده می‌کنید، پس فرصت رو از دست ندین و تا دیر نشده خرید کنید.
                </Text>,
                < Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 13, color: 'white', textAlign: 'right' }} >
                    شما در این قسمت می‌توانید نزدیک‌‌‌‌ ترین باشگاه‌های مشتریان به خود را < Icon style={{ fontSize: 16, color: 'white' }
                    } name='map-marker-alt' type='FontAwesome5' /> پیدا کنید و حتی امتیاز خود را در آن جا مشاهده کنید، اگر امتیاز در آن جا ندارید، نگران نباشید! می‌توانید از آن جا خرید کنید و امتیاز بگیرید.
                    {"\n"} (در ضمن به صورت آنلاین هم می‌توانید سفارش دهید)
                </Text >,
                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 13, color: 'white', textAlign: 'right' }}>
                    در این قسمت با SCoin <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/sCoin-white.png')} /> که از حفاری به دست آورده‌اید می‌توانید محصولات و خدمات هیجان‌انگیزی را خریداری نمایید.
                    </Text>,
                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 13, color: 'white', textAlign: 'right' }}>
                    دیگه لازم نیست سایت‌ها و اپلیکیشن‌های مختلف رو برای پیدا کردن تخفیف بگردین اینجا می‌تونین انواع تخفیف‌ها و پیشنهادات شگفت‌انگیز رو یکجا مشاهده کنید و بهترین انتخاب رو داشته باشین
                    </Text>,
                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 13, color: 'white', textAlign: 'right' }}>
                    در قسمت حفاری ما بازی ها و سرگرمی‌های مختلفی را مخصوص شما تدارک دیده‌ایم تا اوقات خوشی را سپری کنید، راستی می‌تونین وقتی بازی می‌کنین Scoin
                    <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/sCoin-white.png')} /> به دست بیارین و با SCoin <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/sCoin-white.png')} />  کلی چیز تو اپلیکیشن بخرین. یه سری لیگ هم داریم برای بازیکن‌های حرفه‌ای که اگر جزو نفرات برتر بشین بهتون جایزه‌های باحال می‌دیم. رتبه‌ی خودتون هم می‌تونین بین کل کاربرهای اپلیکیشن تو هر بازی یا تو کل بازی‌ها ببینین. منتظر چی هستین، بازی رو شروع کنین!
                    </Text>,
                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 13, color: 'white', textAlign: 'right' }}>
                    S-Beacon{"\n"}
                    یک دستگاه خارق‌العاده است که در برخی فروشگاه‌های خاص نصب شده است، با وصل شدن به S-Beacon می‌توان از امکانات هیجان‌انگیزی مثل:{"\n"}
                    * بازی، کری خونی و چت در محیط{"\n"}
                    * سفارش آنلاین و پرداخت آنلاین بدون نیاز به متصدی و گارسون و امکانات باحال دیگر اشاره کرد.{"\n"}
                </Text>,



            ],
        };
    }
    componentDidMount() {
        this.props.navigation.setParams({ title: this.state.Title[this.state.id] })
    }
    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                <ScrollView style={{ paddingHorizontal: 30, backgroundColor: this.state.backgroundColor[this.state.id] }}>
                    <Image resizeMode='contain' style={{ alignSelf: 'center', height: 150, minWidth: 100, marginVertical: 40 }} source={this.state.Images[this.state.id].link} />
                    <View style={{ padding: 10, borderRadius: 20, marginBottom: 10, }}>
                        <Text style={{ color: 'gray', textAlign: 'center' }}>
                            {this.state.Texts[this.state.id]}
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default Guide;
