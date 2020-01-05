import React, { Component } from 'react'
import { Text, ScrollView, View, SafeAreaView,Image } from 'react-native'
import { Container, Content, Accordion } from "native-base";
import FAQHeader from './Headers/FAQHeader';
const dataArray = [
  {
    title: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white' }}>چگونه عضو باشگاه‌های مشتریان اپلیکیشن اسکوتک بشوم؟</Text>,
    content: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: '#573c65' }}>
      * شما اگر از فروشگاه های طرف قرار داد ما خرید کنید، متصدی با وارد کردن شماره موبایل و مقدار خرید شما را عضو کرده و با توجه به میزان خریدتان به شما امتیاز می‌دهد.
    </Text>
  },
  {
    title: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white' }}>آیا بدون خرید حضوری با خرید آنلاین برای اولین بار می‌توانم عضو باشگاه مشتریان فروشگاه شوم؟
    </Text>,
    content: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: '#573c65' }}>
      * شما اگر از فروشگاه‌های طرف قرار داد ما خرید کنید، متصدی با وارد کردن شماره موبایل و مقدار خرید شما را عضو کرده و با توجه به میزان خریدتان به شما امتیاز می‌دهد.
    </Text>
  },
  {
    title: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white' }}>آیا می‌توانم با خرید آنلاین محصولات دلخواهم را از باشگاه مشتریانی‌ که عضو آن نیستم سفارش دهم؟
    </Text>,
    content: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: '#573c65' }}>
      * بله می‌توانید.
</Text>
  },
  {
    title: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white' }}>سیستم باشگاه مشتریان چگونه کار میکند و امتیاز مخصوص به هر باشگاه مشتریان چیست؟
    </Text>,
    content: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: '#573c65' }}>
      * شما با هر بار خرید آنلاین یا فیزیکی از هر فروشگاه امتیاز مخصوص به آن فروشگاه را دریافت می‌کنید که فقط مخصوص به آن فروشگاه است، سپس می‌توانی.
    </Text>
  },
  {
    title: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white' }}>{"\u202A چیست و چگونه به دست می‌آید؟ \u202C"} <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/sCoin-white.png')} /> SCoin
    </Text>,
    content: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: '#573c65' }}>
      * <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/scoin_purpule.png')} /> یک واحد پولی (متفاوت از امتیاز مخصوص هر باشگاه مشتریان است) که از قسمت حفاری به دست می آید.
    </Text>
  },
  {
    title: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white' }}>با Scoin <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/sCoin-white.png')} /> چه چیزی می‌توان خرید؟
    </Text>,
    content: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: '#573c65' }}>
      * با Scoin <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/scoin_purpule.png')} /> می‌توان انواع تخفیف‌ها و محصولاتی مانند شارژ، پاور بانک و... را خرید.

    </Text>
  },
  {
    title: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white' }}>تا چند ساعت بعد محصولاتی که با Scoin خریدیم به دست ما میرسد؟
    </Text>,
    content: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: '#573c65' }}>
      * حداکثر تا ۷۲ ساعت بعد 
    </Text>
  },
  {
    title: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white' }}>آیا می‌توان امتیاز مخصوص به هر باشگاه مشتریان را در باشگاه مشتریان دیگر استفاده کرد؟
    </Text>,
    content: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: '#573c65' }}>
      * در حال حاضر خیر 
    </Text>
  },
  {
    title: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white' }}>لیگ‌ها چگونه برگزار می‌شود؟
    </Text>,
    content: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: '#573c65' }}>
    * شما با دادن مقداری Scoin <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/scoin_purpule.png')} /> مجوز ورود به لیگ را پیدا می‌کنید و پس از آن به رقابت می‌پردازید و در صورت برنده شدن تا ۷۲ ساعت جایزه به شما داده می‌شود.
    </Text>
  },
  {
    title: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white' }}>{"\u202A چیست و چگونه کار می‌کند؟ \u202C"} S-Beacon
    </Text>,
    content: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: '#573c65' }}>
     S-Beacon {"\n"}
     * یک دستگاه خارق‌العاده است که در بعضی از فروشگاه‌های خاص نصب شده است که با وصل شدن به آن از امکانات مختلف می‌توان استفاده کرد، مثل بازی و چت  با کاربرهای اطراف، سفارش، پرداخت آنلاین محصول و...
    </Text>
  },
  {
    title: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white' }}>تفاوت تخفیف‌های گروهی با تخفیف‌های باشگاه مشتریان (در دسته‌بندی) چیست؟
    </Text>,
    content: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: '#573c65'}}>
     * تخفیف‌های باشگاه مشتریان ویژه‌ی هر فروشگاه است که مخصوص به کاربرانش  گذاشته و اکثرا نیاز به امتیاز آن فروشگاه است ولی تخفیف‌های گروهی، تخفیف‌هایی است که بدون امتیاز و به تعداد زیاد موجود است مثل تخفیف‌های نت برگ و تخفیفان
    </Text>
  },
  {
    title: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white' }}>چگونه فروشگاه خود را در اپلیکیشن اسکوتک ثبت کنیم؟
    </Text>,
    content: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: '#573c65'}}>
     * با تماس با پشتیبانی اپلیکیشن یا از طریق سایت Scotech می‌توانید اقدام به ثبت فروشگاه خود کنید و فروش خود را افزایش دهید.
    </Text>
  },
  {
    title: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white' }}>آیا می‌توانیم از اپلیکیشن اسکوتک درآمد کسب کنیم؟
    </Text>,
    content: <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: '#573c65'}}>
     * بله به طور مثال می‌توانید در حفاری بازی‌ کنید و پس از گرفتن Scoin <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/scoin_purpule.png')} /> شارژ بخرید و درآمد کسب کنید
    </Text>
  },

];

class FAQ extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
        headerTitle: <FAQHeader navigation={navigation} />,
        headerStyle: {
            backgroundColor: '#573c65',
        }
    }
};
  render() {
    return (
      <SafeAreaView style={{flex:1}}>
        <ScrollView>
          <View style={{ width: '95%', alignSelf: 'center', marginTop: 15,marginBottom:10 }}>
            <Accordion
              headerStyle={{ justifyContent: 'flex-end', backgroundColor: '#827086', borderBottomWidth: 1, borderColor: 'white', }}
              iconStyle={{ color: "white" }}
              expandedIconStyle={{ color: "white" }}
              icon="arrow-dropdown"
              expandedIcon="arrow-dropup"
              dataArray={dataArray} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default FAQ