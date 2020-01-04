import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

class Guide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:this.props.navigation.getParam('id'),
            Images: [
                { link: require('../images/SCoin_what.png') },
                { link: require('../images/scores_in.png') },
                { link: require('../images/offers_loyal.png') },
                { link: require('../images/nearest_club.png') },
                { link: require('../images/ba_SCoin.png') },
                { link: require('../images/best.png') },
                { link: require('../images/last_haffari.png') },
            ],
            Texts:[
                {Txt:''},
            ]
        };
    }

    render() {
        return (
            <ScrollView style={{ paddingHorizontal: 30,backgroundColor:'#7e7e7e' }}>
                <Image resizeMode='contain' style={{ alignSelf: 'center', height: 150, minWidth: 100, marginVertical: 40 }} source={this.state.Images[this.state.id].link} />
                <View style={{backgroundColor:'white',padding:10,borderRadius: 20,marginBottom:10,elevation:5}}>
                <Text style={{color:'gray',textAlign:'center'}}>
                همونطور که در مقاله آشنایی با react js و پا گذاشتن به دنیای  react native گفتیم ریکت (react js) یه کتابخونه ui قوی هستش که شما میتونید ازش در سمت front-end استفاده کنید. قراره در چند سری از نوشته های بلاگ و در دسته Material ui راجب به اون صحبت کنیم و تمامی مواردی که در این حوزه وجود داره  رو بررسی کنیم.

اگه شما با استفاده از ریکت بخواین یه رابط کاربری خوب رو طراحی کنین شاید زمان زیادی رو از شما بگیره اینجاست که MateriaUI l  به کمک شما میاد.

Material ui  هم یکی از معروف ترین کتابخانه های material design  هست که برنامه نویسی ریکت رو برای توسعه دهنده ها خیلی راحت تر کرده.

شما با استفاده از Material-UI، میتونین خیلی راحت از عناصر  material designدر برنامه ای که با ریکت مینویسین استفاده کنین.Material ui  هم مثل ریکت، کامپوننت بیس هست و مجموعه ای از کامپوننت های React است که برای سهولت طراحی رابط کاربری استفاده میشه. در ضمن استفاده از material ui خیلی راحته و با پکیج های npm قابل نصب و استفاده ست.

حالا سوال اینجاست که چرا Material UI ؟ چه مزایایی داره؟

یکی از مزایایی که داره اینه که برای استفاده لازم نیست کل کتابخونه رو دانلود کنید و فقط هر بخشی که دوست دارین رو دانلود و استفاده میکنید.

به عنوان مثال برای اینکه شما بتونین یه آیکون رو توی برنامه تون بیارین میتونین از نمونه هایی که وجود داره یکی رو انتخاب کنین و توی برنامه تون import کنین.

نسخه نمایشی(Demo)  تمام کامپوننت ها رو میتونین قبل از اضافه کردن به برنامه تون ببینید.

جدول، فرم ، bottom، header ، footer و هرچیزی که شما توی ظاهر یک سایت یا اپلیکیشن میبینین رو میتونین با استفاده از کامپوننت های متریال یوآی به برنامه تون اضافه کنین.

با توجه به اینکه در حال حاضر رسپانسیو بودن یک برنامه یکی از مهمترین ویژگی هاییه که یه برنامه باید داشته باشه با استفاده از متریال یوآی میشه یه برنامه رسپانسیو رو ایجاد کرد.

یکی از مسائلی که توی برنامه نویسی برای برنامه هایی با زبان فارسی است اینه که لازمه RTL باشه و متریال یوآی همچنین امکانی رو خیلی راحت برای توسعه دهنده ریکت فراهم میکنه.

اگر یکی از کامپوننت هایی که لازم داشتین ولی لازم بود تغییراتی در اون ایجاد بشه، متریال یو آی امکان سفارشی سازی کامپوننت ها رو هم براتون فراهم میکنه.
                </Text>

                </View>
            </ScrollView>
        );
    }
}

export default Guide;
