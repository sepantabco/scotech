import React, { Component } from 'react';
import { View, Text, AsyncStorage, Image, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Icon } from 'native-base';

import { NavigationActions, StackActions } from 'react-navigation'
const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 320,
        resizeMode: 'contain',
    },
    title: {
        fontFamily: 'IRANSans(FaNum)'
    }
});

const slides = [
    {

        key: '1',
        title: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 18, color: 'white' }}>باشگاه مشتریان اسکوتک چیست؟</Text>,
        text:
            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 14, color: 'white' }}>• شما با هربار خرید از فروشگاه‌های تحت پوشش Scotech با توجه به مقدار خریدتان، امتیاز <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/coinroyalwhite.png')} /> مخصوص به آن فروشگاه را کسب می‌کنید و عضو باشگاه مشتریان آن فروشگاه می‌شوید. {"\n"}• با استفاده از امتیازهای کسب شده <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/coinroyalwhite.png')} /> از آن فروشگاه، می‌توانید خریدهای خارق العاده‌ای از آن جا داشته باشید که دیگران نمی‌توانند داشته باشند.</Text>,
        image: require('../images/Intro/1.png'),
        imageStyle: styles.image,
        backgroundColor: '#33cc99',
    },
    {
        key: '2',
        title: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 18, color: 'white', marginTop: 20 }}>چگونه از باشگاه مشتریان اسکوتک استفاده کنیم؟</Text>,
        text: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 14, color: 'white' }}>•در خانه <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/homewhite.png')} /> یا قسمت باشگاه مشتریان <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/loyalitywhite.png')} /> می‌توانید موجودی امتیاز خود را در باشگاه های مشتریان مختلف عضو شده مشاهده کنید.
        {"\n"}•به صورت آنلاین می‌توانید از هر باشگاه مشتریان با امتیاز مخصوص آن جا <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/loyalitywhite.png')} /> اجناس مورد نیازتان را با تخفیف‌های ویژه‌ی خودتان، هم به صورت حضوری و هم به صورت ارسالی <Icon style={{ fontSize: 16, color: 'white' }} name='motorcycle' type='FontAwesome5' /> خریداری کنید.</Text>,
        image: require('../images/Intro/2.png'),
        imageStyle: styles.image,
        backgroundColor: '#9999cc',
    },
    {
        key: '3',
        title: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 18, color: 'white', textAlign: 'right' }}> {"\u202A چیست و چگونه به دست می‌آید؟ \u202C"}<Image resizeMode='stretch' style={{ height: 18, width: 18 }} source={require('../images/logos/coinroyalwhite.png')} /> Scoin</Text>,
        text: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 14, color: 'white', textAlign: 'right' }}>
            <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/coinroyalwhite.png')} /> Scoin {"\n"}
            یک واحد پول رسمی در اپلیکیشن است که جدا از امتیاز مخصوص به هر باشگاه مشتریان می‌باشد.{"\n"}
            <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/coinroyalwhite.png')} /> Scoin {"\n"}
            را می‌توان از طریق قسمت حفاری <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/mininwhite.png')} /> که در آن سرگرمی‌های مختلف وجود دارد به دست آورد.{"\n"}
        </Text>,
        image: require('../images/Intro/3.png'),
        imageStyle: styles.image,
        backgroundColor: '#cc9933',
    },
    {
        key: '4',
        title: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 18, color: 'white', textAlign: 'justify' }}> با Scoin <Image resizeMode='stretch' style={{ height: 18, width: 18 }} source={require('../images/logos/coinroyalwhite.png')} /> چه چیزهایی می‌توان خرید و چه کارهایی می‌توان انجام داد؟</Text>,
        text: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 14, color: 'white', textAlign: 'right' }}>
            با Scoin <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/coinroyalwhite.png')} /> می‌توان در لیگ‌های مختلف شرکت کرد،همچنین می‌توان محصولات و خدمات مختلف مثل شارژ و ... خرید.
        </Text>,
        image: require('../images/Intro/4.png'),
        imageStyle: styles.image,
        backgroundColor: '#6699ff',
    },
    {
        key: '5',
        title: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 18, color: 'white' }}>مجموعه‌ای کامل از انواع تخفیف‌ها و پیشنهادات </Text>,
        text: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 14, color: 'white', textAlign: 'right' }}>
            شما میتوانید در دسته بندی <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/categorywhite.png')} /> و یا خانه <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/homewhite.png')} /> انواع تخفیف های گروهی  از تمامی منابع مانند: نت برگ، تخفیفان ... را یکجا استفاده کنید.
        </Text>,
        image: require('../images/Intro/5.png'),
        imageStyle: styles.image,
        backgroundColor: '#6666ff',
    },
];
export default class SplashScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerLeft: null,
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            logged: true
        }
    }
    async _set_state() {
        await AsyncStorage.setItem('logged', '1')
    }
    async _get_state() {
        try {
            let token = await AsyncStorage.getItem('logged');
            if (token == '1') {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }
    async componentDidMount() {

        let logged = await this._get_state();
        this.setState({ logged: logged })
    }
    async componentWillMount() {
        setTimeout(async () => {
            // try {
            //     let user = await AsyncStorage.getItem('username');
            //     if (user == '' || user == null ){
            //         this.props.navigation.replace('StartPage');
            //     }else {
            //         this.props.navigation.replace('App');              
            //     }
            // } catch(err) { 
            //     this.props.navigation.replace('StartPage');
            // }
            // this.props.navigation.replace('App');              

        }, 2000)
    }

    render() {
        if (!this.state.logged) {
            return (
                <AppIntroSlider
                    nextLabel={"بعدی"}
                    slides={slides}
                    showSkipButton={false}
                />
            )
        }
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ height: 200, width: 200 }} source={require('../images/splash.gif')} />
            </View>
        )
    }
}

