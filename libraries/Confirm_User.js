import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    AsyncStorage,
    Alert,
    TouchableOpacity,
    TextInput,
    ScrollView,
    ActivityIndicator
} from 'react-native'
import get_key from "./Auth";
import { P_URL } from "./PUBLICURLs";
import { Icon } from 'native-base';
import Overlay from 'react-native-modal-overlay';

export default class Confirm_User extends Component {

    constructor() {
        super();
        this.state = {
            clickedToken: false,
            clickedOnRegister: false,
            termOverlay: false,
            phonenumber: "",
            name: "",
            family_name: "",
            username: "",
            reagent: "",
            sex: null,
            buttonSelected: 0,
            usernameError: false,
            family_nameError: false,
            phonenumberError: false,
            sexError: false,
            timer: 0,
            usernameExists: false,
            termAccepted: false,
            token: "",
            userToken: ''
        };
    }

    async componentDidMount() {
        fetch('https://RestfulSms.com/api/Token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "UserApiKey": "9f5c49e51b990ba866a49e5",
                "SecretKey": "&&vbnsa123&&w1)("
            }),
        }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson);
            this.setState({ token: responseJson.TokenKey });
        });
    }

    async storeUsername(username) {
        await AsyncStorage.setItem('username', username);
    }
    async _submitData() {
        this.setState({ clickedToken: true });
        await this.storeUsername(this.state.username);
        let page_url = P_URL + "register" +
            "?phonenumber=" + this.state.phonenumber + "&name=" + this.state.name + "." + this.state.family_name +
            "&username=" + this.state.username + "&sex=" + this.state.sex + "&reagent=" + this.state.reagent;
        fetch(page_url, { headers: { Authorization: get_key() } })
            .then((response) => { }).catch((error) => {
                Alert.alert(error.toString())
            });
        this.props.navigation.navigate('Firstpage');
    }

    _renderTimer() {
        setInterval(() => {
            this.setState({ timer: this.state.timer + 1 })
            console.log(this.state.timer)
        }, 1000)

    }

    _sexSelected(sex) {
        this.setState({
            sex: sex,
            sexError: false
        })
    }
    async _check_username_exist() {
        await fetch(P_URL + 'check_user_exist?username=' + this.state.username, { headers: { Authorization: get_key() } })
            .then((response) => response.json())
            .then((responseJson) => {
                let exists = responseJson.exists
                this.setState({ usernameExists: exists })
            }, function () {
            }).catch((error) => {
                Alert.alert(error.toString())
            });
    }
    async _checkFormData() {
        this.setState({ clickedOnRegister: true });
        await this._check_username_exist();
        if (this.state.username.length == 0 || this.state.family_name.length == 0 || this.state.phonenumber.length == 0 || this.state.sex == null ||
            !this.state.termAccepted || this.state.usernameExists) {
            if (this.state.username.length == 0) {
                this.setState({ usernameError: true })
            } if (this.state.phonenumber == 0) {
                this.setState({ phonenumberError: true })
            } if (this.state.family_name == 0) {
                this.setState({ family_nameError: true })
            } if (this.state.sex == null) {
                this.setState({ sexError: true })
            } if (!this.state.termAccepted) {
                this.setState({ termOverlay: true })
            }
            this.setState({ clickedOnRegister: false });
        }
        else {
            this._sendSms();
            this.setState({ buttonSelected: 1, usernameError: false, phonenumberError: false, family_nameError: false, sexError: false })
            console.log(this.state.family_name, this.state.name, this.state.phonenumber, this.state.reagent, this.state.sex, this.state.username);
        }


    }
    _sendSms() {
        const RandomNumber = Math.floor(Math.random() * 10000) + 1000;
        console.log(RandomNumber + " activation code");
        this.setState({ smsToken: RandomNumber });
        fetch('https://RestfulSms.com/api/MessageSend', {
            method: 'post',
            headers: { 'Content-Type': 'application/json', 'x-sms-ir-secure-token': this.state.token },
            body: JSON.stringify({ Code: RandomNumber, MobileNumber: this.state.phonenumber })
        }).then(response => {
            response.json().then(responseJson => {
                console.log(responseJson);
            });
        });
    }
    _ButtonTouched() {
        switch (this.state.buttonSelected) {
            case 0:
                this._checkFormData()
                break;
            case 1:
                if (this.state.smsToken.toString() == this.state.userToken)
                    this._submitData();
                else
                    Alert.alert('کد وارد شده صحیح نمی باشد');
                break;
        }
    }
    onClose = () => {this.setState({termOverlay : false})}
    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#f5f5f5', marginTop: 25 }}>
                <Overlay visible={this.state.termOverlay} onClose={this.onClose} closeOnTouchOutside
                    animationType="zoomIn"
                    childrenWrapperStyle={{ backgroundColor: '#DDDDDD' }}
                    animationDuration={500}>
                    {!this.state.termAccepted &&
                        <ScrollView >
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 15, alignSelf: 'center' }}>لطفا قوانین را مطالعه و تایید کنید</Text>
                            <Image style={{ height: 100, width: 100, marginVertical: 10, alignSelf: 'center' }} source={require('../images/terms.png')} />
                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 8, alignSelf: 'center', textAlign: 'right' }}>
                                لف ) محتوا علیه عفت و اخلاق عمومی
                            {"\n"}
                                -اشاعه فحشاء و منکرات. ( بند۲ ماده۶ ق.م)
{"\n"}
                                -تحریک ، تشویق ، ترغیب ، تهدید یا دعوت به فساد و فحشاء و ارتکاب جرایم منافی عفت یا انحرافات جنسی. ( بند ب ماده ۱۵ قانون ج.ر و ماده ۶۳۹  ق.م.ا)
{"\n"}
                                - انتشار ، توزیع و معامله محتوای خلاف عفت عمومی. ( مبتذل و مستهجن )  ( بند ۲ ماده ۶ ق.م و ماده ۱۴ قانون ج.ر ){"\n"}
                                ‎-تحریک ، تشویق ، ترغیب ، تهدید یا تطمیع افراد به دستیابی به محتویات مستهجن و مبتذل. (  ماده ۱۵ قانون جرایم رایانه ای ){"\n"}
                                ‎- استفاده ابزاری از افراد ( اعم از زن و مرد ) در تصاویر و محتوا ، تحقیر و توهین به جنس زن ، تبلیغ تشریفات و تجملات نامشروع و غیرقانونی. ( بند ۱۰ ماده۶ ق.م){"\n"}
                                ‎ب ) محتوا علیه مقدسات اسلامی{"\n"}
                                ‎- محتوای الحادی و مخالف موازین اسلامی. ( بند۱ماده۶ ق.م){"\n"}
                                ‎-. اهانت به دین مبین اسلام و مقدسات آن. ( بند ۷ ماده ۶ ق.م و ماده ۵۱۳ ق.م.ا){"\n"}
                                ‎-. اهانت به هر یک از انبیاء عظام یا ائمه طاهرین ( ع ) یا حضرت صدیقه طاهره ( س ). (  ماده ۵۱۳  ق.م.ا){"\n"}
                                ‎-. تبلیغ به نفع حزب گروه یا فرقه منحرف و مخالف اسلام. ( بند ۹ ماده ۶ ق.م){"\n"}
                                ‎-. نقل مطالب از نشریات و رسانه ها و احزاب و گروه های داخلی و خارجی منحرف و مخالف اسلام به نحوی که تبلیغ از آنها باشد. ( بند ۹ ماده ۶ ق.م){"\n"}
                                ‎-. اهانت به امام خمینی ( ره ) و تحریف آثار ایشان. ( ماده ۵۱۴  ق.م.ا ){"\n"}
                                ‎-. اهانت به مقام معظم رهبری ( امام خامنه ای ) و سایر مراجع مسلم تقلید. ( بند ۷ ماده ۶ ق.م){"\n"}
                                ‎ج ) محتوا علیه امنیت و آسایش عمومی{"\n"}
                                ‎-. تشکیل جمعیت ، دسته ، گروه در فضای مجازی ( سایبر ) با هدف برهم زدن امنیت کشور. ( ماده ۴۹۸  ق.م.ا){"\n"}
                                ‎-. هر گونه تهدید به بمب گذاری. ( ماده ۵۱۱  ق.م.ا  ){"\n"}
                                ‎-. محتوایی که به اساس جمهوری اسلامی ایران لطمه وارد کند. ( بند ۱ ماده ۶ ق.م){"\n"}
                                ‎-. انتشار محتوا علیه اصول قانون اساسی. ( بند ۱۲ ماده ۶ ق.م ){"\n"}
                                ‎-. تبلیغ علیه نظام جمهوری اسلامی ایران. ( ماده ۵۰۰  ق.م.ا  ){"\n"}
                                ‎-. اخلال در وحدت ملی و ایجاد اختلاف مابین اقشار جامعه به ویژه از طریق طرح مسائل نژادی و قومی. ( بند ۴ ماده ۶ ق.م.ا){"\n"}
                                ‎-. تحریک یا اغوای مردم به جنگ و کشتار یکدیگر. ( ماده ۵۱۲  ق.م.ا){"\n"}
                                ‎-. تحریک نیروهای رزمنده یا اشخاصی که به نحوی از انحا در خدمت نیروهای مسلح هستند به عصیان ، فرار، تسلم یا عدم اجرای وظایف نظامی. ( ماده ۵۰۴  ق.م.ا ){"\n"}
                                ‎-. تحریص و تشویق افراد و گروه ها به ارتکاب اعمالی علیه امنیت ، حیثیت و منافع جمهوری اسلامی ایران در داخل یا خارج از کشور. ( بند ۵ ماده ۶ ق.م){"\n"}
                                ‎-. تبلیع به نفع گروه ها و سازمانهای مخالف نظام جمهوری اسلامی ایران ( ماده ۵۰۰ ق م.ا){"\n"}
                                ‎-. فاش نمودن و انتشار غیرمجاز اسناد و دستورها و مسایل محرمانه و سری دولتی و عمومی. ( بند ۶ ماده ۶ ق.م و مواد ۲و۳ ‌قانون مجازات انتشار و افشای اسناد محرمانه و سری دولتی و ماده ۳ قانون ج.ر){"\n"}
                                ‎-. فاش نمودن و انتشار غیرمجاز اسرار نیروهای مسلح. ( بند ۶ ماده ۶ ق.م ){"\n"}
                                ‎-. فاش نمودن و انتشار غیرمجاز نقشه و استحکامات نظامی. ( بند ۶ ماده ۶ ق.م){"\n"}
                                ‎-. انتشار غیرمجاز مذاکرات غیرعلنی مجلس شورای اسلامی. ( بند ۶ ماده ۶ ق.م){"\n"}
                                ‎-. انتشار بدون مجوز مذاکرات محاکم غیرعلنی دادگستری و تحقیقات مراجع قضایی. ( بند ۶ ماده ۶ ق.م){"\n"}
                                ‎-. انتشار محتوای که از سوی شورای عالی امنیت ملی منع شده باشد.{"\n"}
                                ‎د ) محتوا علیه مقامات و نهادهای دولتی و عمومی{"\n"}
                                ‎-. اهانت و هجو نسبت به مقامات، نهادها و سازمان های حکومتی و عمومی. ( بند ۸ ماده ۶ ق.م و مواد ۶۰۹ و ۷۰۰  ق.م.ا ){"\n"}
                                ‎-. افترا به مقامات، نهادها و سازمان های حکومتی و عمومی. ( بند ۸ ماده ۶ ق.م و ۶۹۷  ق.م.ا ){"\n"}
                                ‎-. نشراکاذیب و تشویش اذهان عمومی علیه مقامات، نهادها و سازمانهای حکومتی. ( بند ۱۱ ماده۶ ق.م و ۶۹۸  ق.م.ا){"\n"}
                                ‎ه ) محتوای که برای ارتکاب جرایم رایانه ای به کار می رود ( محتوا مرتبط با جرایم رایانه ای){"\n"}
                                ‎-.انتشار یا توزیع و در دسترس قرار دادن یا معامله داده ها یا نرم افزارهایی که صرفاً برای ارتکاب جرایم رایانه ای به کار می رود. ( ماده ۲۵ قانون ج.ر){"\n"}
                                ‎-. فروش انتشار یا در دسترس قرار دادن غیرمجاز گذرواژه ها و داده هایی که امکان دسترسی غیرمجاز به داده ها یا سامانه های رایانه ای یا مخابراتی دولتی یا عمومی را فراهم می کند. ( ماده ۲۵ قانون ج.ر){"\n"}
                                ‎-. انتشار یا در دسترس قرار دادن محتویات آموزش دسترسی غیرمجاز، شنود غیرمجاز، جاسوسی رایانه ای ، تحریف و اخلال در داده ها یا سیستم های رایانه ای و مخابراتی. ( ماده ۲۵ قانون ج.ر){"\n"}
                                ‎-. آموزش و تسهیل سایر جرایم رایانه ای. ( ماده ۲۱ قانون ج.ر ){"\n"}
                                ‎-. انتشار فیلترشکن ها و آموزش روشهای عبور از سامانه های فیلترینگ. ( بند ج ماده ۲۵ قانون ج.ر ){"\n"}
                                ‎-. انجام هرگونه فعالیت تجاری و اقتصادی رایانه ای مجرمانه مانند شرکت های هرمی. ( قانون اخلال در نظام اقتصادی کشور و سایر قوانین ){"\n"}
                                ‎ ز ) محتوا مجرمانه مربوط به امور سمعی و بصری و مالکیت معنوی{"\n"}
                                ‎-. انتشار و سرویس دهی بازی های رایانه ای دارای محتوای مجرمانه. ( مواد مختلف  ق.م.ا و قانون ج.ر ){"\n"}
                                ‎-. معرفی آثار سمعی و بصری غیرمجاز به جای آثار مجاز. ( ماده ۱ قانون نحوه مجازات اشخاصی که در امور سمعی و بصری فعالیت غیرمجاز دارند.){"\n"}
                                ‎-. عرضه تجاری آثار سمعی و بصری بدون مجوز وزارت فرهنگ و ارشاد اسلامی ( ماده ۲ قانون نحوه مجازات اشخاصی که در امور سمعی و بصری فعالیت غیر مجاز دارند.){"\n"}
                                ‎-. تشویق و ترغیب به نقض حقوق مالکیت معنوی ( ماده ۱ قانون حمایت از حقوق پدید آورندگان نرم افزار های رایانه ای و ماده ۷۴ قانون تجارت الکترونیکی ){"\n"}
                                ‎و ) محتوای که تحریک ، ترغیب ، یا دعوت به ارتکاب جرم می کند ( محتوای مرتبط با سایر جرایم){"\n"}
                                ‎-. انتشار محتوای حاوی تحریک، ترغیب، یا دعوت به اعمال خشونت آمیز و خودکشی. ( ماده ۱۵ قانون ج.ر ){"\n"}
                                ‎-. تبلیغ و ترویج مصرف مواد مخدر، مواد روان گردان و سیگار. ( ماده ۳ قانون جامع کنترل و مبارزه ملی با دخانیات ۱۳۸۵){"\n"}
                                ‎-. باز انتشار و ارتباط ( لینک ) به محتوای مجرمانه تارنماها و نشانی های اینترنتی مسدود شده، نشریات توقیف شده و رسانه های وابسته به گروه ها و جریانات منحرف و غیر قانونی.{"\n"}
                                ‎-. تشویق تحریک و تسهیل ارتکاب جرائمی که دارای جنبه عمومی هستند از قبیل اخلال در نظم،‌ تخریب اموال عمومی، ارتشاء، اختلاس، کلاهبرداری، قاچاق مواد مخدر، قاچاق مشروبات الکلی و غیره. ( ماده ۴۳  ق.م.ا ){"\n"}
                                ‎-. تبلیغ و ترویج اسراف و تبذیر. ( بند ۳ ماده ۶ ق.م){"\n"}
                                در ضمن اسکوتک تمامی اطلاعات را که از کاربران دریافت کرده محفوظ میدارد و در صورت نامه ی مراجع قانونی و یا امور خاص از آن ها استفاده میکند و در ضمن کاربر با قبول شرایط،قبول میکند تا برای او پیامک ها و تبلیغات فرستاده شود توسط اسکوتک یا باشگاه مشتریان مربوطه،اپلیکیشن یک واسطه بوده و مسئولیتی در قبال امور مربوطه ندارد{"\n"}
                            </Text>

                        </ScrollView>}
                    {this.state.usernameExists && <Text>نام کاربری قبلا ثبت شده است</Text>}
                </Overlay>
                <View style={{ flex: 1 }}>
                    {this.state.buttonSelected == 0 ?
                        (
                            <ScrollView>
                                <View style={{ flex: 1, width: '75%', flexDirection: 'row', height: '95%', backgroundColor: 'white', marginTop: 10, alignSelf: 'center', elevation: 3, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%' }}>
                                    <TextInput
                                        onChangeText={(name) => {
                                            this.setState({ name: name })
                                        }}
                                        placeholder='نام خود را وارد کنید' numberOfLines={1} style={{ width: '85%', fontFamily: 'IRANSans(FaNum)', fontSize: 12 }} />
                                    <Icon style={{ color: '#573c65', fontSize: 15 }} type='FontAwesome5' name="user-alt" />
                                </View>
                                <View style={{ flex: 1, width: '75%', flexDirection: 'row', height: '95%', backgroundColor: 'white', marginTop: 10, alignSelf: 'center', elevation: 3, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%' }}>
                                    <TextInput
                                        onChangeText={(family_name) => {
                                            this.setState({ family_name: family_name })
                                        }}
                                        placeholder='نام خانوادگی خود را وارد کنید' placeholderTextColor={this.state.family_nameError == true ? 'red' : 'gray'} numberOfLines={1} style={{ width: '85%', fontFamily: 'IRANSans(FaNum)', fontSize: 12 }} />
                                    <Icon style={{ color: '#573c65', fontSize: 15 }} type='FontAwesome5' name="user" />
                                </View>
                                <View style={{ flex: 1, width: '75%', flexDirection: 'row', height: '95%', backgroundColor: 'white', marginTop: 10, alignSelf: 'center', elevation: 3, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%' }}>
                                    <TextInput
                                        onChangeText={(username) => {
                                            this.setState({ username: username })
                                        }}
                                        placeholder='نام کاربری خود را وارد کنید' placeholderTextColor={this.state.usernameError == true ? 'red' : 'gray'} numberOfLines={1} style={{ width: '85%', fontFamily: 'IRANSans(FaNum)', fontSize: 12 }} />
                                    <Icon style={{ color: '#573c65', fontSize: 15 }} type='FontAwesome5' name="user-tag" />
                                </View>
                                <View style={{ flex: 1, width: '75%', flexDirection: 'row', height: '95%', backgroundColor: 'white', marginTop: 10, alignSelf: 'center', elevation: 3, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%' }}>
                                    <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => { this._sexSelected(0) }}
                                            style={{ width: 34, height: 34, borderWidth: 2, borderColor: this.state.sex == 0 ? '#573c65' : 'gray', borderRadius: 17, justifyContent: 'center', alignItems: 'center', marginRight: 1 }}>
                                            <Icon style={{ color: this.state.sex == 0 ? '#573c65' : 'gray', fontSize: 25, }} type='FontAwesome5' name="male" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { this._sexSelected(1) }}
                                            style={{ width: 34, height: 34, borderWidth: 2, borderColor: this.state.sex == 1 ? '#573c65' : 'gray', borderRadius: 17, justifyContent: 'center', alignItems: 'center', }}>
                                            <Icon style={{ color: this.state.sex == 1 ? '#573c65' : 'gray', fontSize: 25 }} type='FontAwesome5' name="female" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 2, alignItems: 'center', flexDirection: 'row-reverse' }}>
                                        <Icon style={{ color: '#573c65', fontSize: 15, }} type='FontAwesome5' name="venus-mars" />
                                        <TextInput editable={false} placeholder='انتخاب جنسیت' placeholderTextColor={this.state.sexError == true ? 'red' : 'gray'} numberOfLines={1} style={{ width: '70%', fontFamily: 'IRANSans(FaNum)', fontSize: 12, marginRight: '13%' }} />
                                    </View>
                                </View>
                                <View style={{ flex: 1, width: '75%', flexDirection: 'row', height: '95%', backgroundColor: 'white', marginTop: 10, alignSelf: 'center', elevation: 3, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%' }}>
                                    <TextInput
                                        onChangeText={(phonenumber) => {
                                            this.setState({ phonenumber: phonenumber })
                                        }}
                                        keyboardType='phone-pad'
                                        placeholder='شماره موبایل خود را وارد کنید' placeholderTextColor={this.state.phonenumberError == true ? 'red' : 'gray'} numberOfLines={1} style={{ width: '85%', fontFamily: 'IRANSans(FaNum)', fontSize: 12, textAlign: 'right' }} />
                                    <Icon style={{ color: '#573c65', fontSize: 15 }} type='FontAwesome5' name="phone" />
                                </View>
                                <View style={{ flex: 1, width: '75%', flexDirection: 'row', height: '95%', backgroundColor: 'white', marginTop: 10, alignSelf: 'center', elevation: 3, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%' }}>
                                    <TextInput
                                        onChangeText={(reagent) => {
                                            this.setState({ reagent: reagent })
                                        }}
                                        placeholder='نام کاربری معرف را وارد کنید' numberOfLines={1} style={{ width: '85%', fontFamily: 'IRANSans(FaNum)', fontSize: 12 }} />
                                    <Icon style={{ color: '#573c65', fontSize: 15 }} type='FontAwesome5' name="user-friends" />
                                </View>
                                <View style={{ flex: 1, width: '75%', flexDirection: 'row', height: '95%', backgroundColor: 'white', marginVertical: 10, paddingVertical: '2%', alignSelf: 'center', elevation: 3, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%' }}>
                                    <TouchableOpacity style={{ width: '80%' }} onPress={() => { this.setState({ termOverlay: true }) }}>
                                        <Text style={{ width: '85%', fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'blue', textDecorationLine: 'underline' }} >شرایط استفاده را قبول دارم</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => { this.setState({ termAccepted: !this.state.termAccepted }) }}
                                        style={{ height: 20, width: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#573c65', borderRadius: 15 }}>
                                        {this.state.termAccepted && <Icon style={{ color: '#573c65', fontSize: 12 }} type='FontAwesome5' name="check" />}
                                    </TouchableOpacity>
                                </View>
                                {!this.state.clickedOnRegister && <TouchableOpacity
                                    onPress={() => { this._ButtonTouched() }}
                                    style={{ flex: 1, width: '50%', height: 40, flexDirection: 'row', marginVertical: 5, backgroundColor: '#573c65', alignSelf: 'center', borderRadius: 20, elevation: 5, alignItems: 'center', justifyContent: 'space-around' }}>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 14, marginHorizontal: 10 }}>{this.state.buttonSelected == 0 ? 'ادامه' : this.state.buttonSelected == 1 ? 'ارسال کد فعالسازی' : 'ارسال مجدد کد فعالسازی'}</Text>
                                    {this.state.buttonSelected == 0 ? <Icon style={{ color: 'white', fontSize: 14 }} name="arrow-forward" /> : <Icon style={{ color: 'white', fontSize: 14 }} type='FontAwesome5' name="key" />}
                                </TouchableOpacity>}
                                {this.state.clickedOnRegister && <ActivityIndicator />}
                            </ScrollView>
                        )
                        :
                        (
                            <ScrollView>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ flex: 1, width: '75%', flexDirection: 'row', height: '15%', backgroundColor: 'white', marginVertical: 10, elevation: 1, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, paddingHorizontal: '5%', justifyContent: 'space-between', alignItems: 'center', marginTop: 100 }}>
                                        <TextInput keyboardType='phone-pad' onChangeText={(text) => { this.setState({ userToken: text }) }} placeholder='کد فعال سازی را وارد کنید' numberOfLines={1} style={{ width: '85%', fontFamily: 'IRANSans(FaNum)', fontSize: 12 }} />
                                        <Icon style={{ color: 'gray', fontSize: 15 }} type='FontAwesome5' name="user" />
                                    </View>
                                </View>
                                {!this.state.clickedToken && <TouchableOpacity
                                    onPress={() => { this._ButtonTouched() }}
                                    style={{ flex: 1, width: '50%', height: 40, flexDirection: 'row', marginVertical: 50, backgroundColor: '#573c65', alignSelf: 'center', borderRadius: 20, elevation: 5, alignItems: 'center', justifyContent: 'space-around' }}>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 14, marginHorizontal: 10 }}>{this.state.buttonSelected == 0 ? 'ادامه' : 'تکمیل ثبت نام'}</Text>
                                    {this.state.buttonSelected == 0 ? <Icon style={{ color: 'white', fontSize: 14 }} type='FontAwesome5' name="check" /> : <Icon style={{ color: 'white', fontSize: 14 }} type='FontAwesome5' name="key" />}
                                </TouchableOpacity>}
                                {this.state.clickedToken && <ActivityIndicator />}
                            </ScrollView>
                        )
                    }
                </View>
            </View>
        );
    }
}
