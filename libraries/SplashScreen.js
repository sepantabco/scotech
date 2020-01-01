import React, { Component } from 'react';
import { View, Text, AsyncStorage, Image, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Icon } from 'native-base';

import { NavigationActions,StackActions  } from 'react-navigation'
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

        key: 'somethun',
        title: <Text style={{ fontFamily: 'IRANSans(FaNum)',fontSize:18,color:'white' }}>باشگاه مشتریان اسکوتک چیست؟</Text>,
        text:
            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 14,color:'white' }}>• شما با هربار خرید از فروشگاه‌های تحت پوشش Scotech با توجه به مقدار خریدتان، امتیاز <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/coinroyalwhite.png')} /> مخصوص به آن فروشگاه را کسب می‌کنید و عضو باشگاه مشتریان آن فروشگاه می‌شوید. {"\n"}• با استفاده از امتیازهای کسب شده <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/coinroyalwhite.png')} /> از آن فروشگاه، می‌توانید خریدهای خارق العاده‌ای از آن جا داشته باشید که دیگران نمی‌توانند داشته باشند.</Text>,
        image: require('../images/Intro/1.png'),
        imageStyle: styles.image,
        backgroundColor: '#006699',
    },
    {
        key: 'somethun-dos',
        title: <Text style={{ fontFamily: 'IRANSans(FaNum)' ,fontSize:18,color:'white',marginTop:20}}>چگونه از باشگاه مشتریان اسکوتک استفاده کنیم؟</Text>,
        text: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 14,color:'white' }}>•در خانه <Icon style={{ fontSize: 16, color: 'white' }} name='home' /> یا قسمت باشگاه مشتریان <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/Footer/loyalitywhite.png')} /> می‌توانید موجودی امتیاز خود را در باشگاه های مشتریان مختلف عضو شده مشاهده کنید.
        {"\n"}•به صورت آنلاین می‌توانید از هر باشگاه مشتریان با امتیاز مخصوص آن جا <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/Footer/loyalitywhite.png')} /> اجناس مورد نیازتان را با تخفیف‌های ویژه‌ی خودتان، هم به صورت حضوری و هم به صورت ارسالی <Icon style={{ fontSize: 16, color: 'white' }} name='motorcycle' type='FontAwesome5' /> خریداری کنید.</Text>,
        image: require('../images/Intro/2.png'),
        imageStyle: styles.image,
        backgroundColor: '#990099',
    },
    {
        key: 'somethun1',
        title: <Text style={{ fontFamily: 'IRANSans(FaNum)' ,fontSize:18,color:'white', textAlign:'right'}}> {"\u202A چیست و چگونه به دست می آید؟ \u202C"}<Image resizeMode='stretch' style={{ height: 18, width: 18 }} source={require('../images/logos/coinroyalwhite.png')} /> scoin</Text>,
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        image: require('../images/Intro/3.png'),
        imageStyle: styles.image,
        backgroundColor: '#ff9900',
    },
    {
        key: 'somethun1',
        title: <Text style={{ fontFamily: 'IRANSans(FaNum)' ,fontSize:18,color:'white'}}> چیست و چگونه به دست می آید؟ <Image resizeMode='stretch' style={{ height: 18, width: 18 }} source={require('../images/logos/coinroyalwhite.png')} />Scoin</Text>,
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        image: require('../images/001.jpg'),
        imageStyle: styles.image,
        backgroundColor: '#22bcb5',
    },
    {
        key: 'somethun1',
        title: <Text style={{ fontFamily: 'IRANSans(FaNum)' ,fontSize:18,color:'white'}}> چیست و چگونه به دست می آید؟ <Image resizeMode='stretch' style={{ height: 18, width: 18 }} source={require('../images/logos/coinroyalwhite.png')} />Scoin</Text>,
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        image: require('../images/001.jpg'),
        imageStyle: styles.image,
        backgroundColor: '#22bcb5',
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

