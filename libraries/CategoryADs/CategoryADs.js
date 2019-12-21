import React, { Component } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import Categories_Data from '../CategoryPage/ImageProfile';
import CustomerClub from './components/CustomerClub';
import GroupOffer from './components/GroupOffer'
import OfferLoyal from './components/OfferLoyal'
import HeaderView from '../CategoryADs/components/CategoryADsHeader';

class CategoryADs extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <HeaderView navigation={navigation} />,
            headerTintColor: '#21C6D4'
        }
    };
    constructor(props) {
        super(props);
        let Categories_Data = [
            {"category_ID": 1, "title": "ایرانی و سنتی"},
            {"category_ID": 2, "title": "ایتالیای و ملل"},
            {"category_ID": 3, "title": "فست فود"},
            {"category_ID": 4, "title": "سفره خانه"},
            {"category_ID": 5, "title": "بوفه"},
            {"category_ID": 6, "title": "کافی شاپ"},
            {"category_ID": 7, "title": "صبحانه"},
            {"category_ID": 8, "title": "کترینگ"},
            {"category_ID": 9, "title": "تورهای مسافرتی"},
            {"category_ID": 10, "title": "هتل و اقامتگاه"},
            {
                "category_ID": 11,
                "title": "شهربازی و مراکز تفریحی"
            },
            {
                "category_ID": 12,
                "title": "بازی گروهی و زمین بازی"
            },
            {"category_ID": 13, "title": "استخر و ورزش های آبی"},
            {"category_ID": 14, "title": "ورزش های هوایی"},
            {"category_ID": 15, "title": "باشگاه ورزشی"},
            {"category_ID": 16, "title": "لیزر موهای زائد"},
            {"category_ID": 17, "title": "ژل و بوتاکس"},
            {
                "category_ID": 18,
                "title": "خدمات تناسب اندام و لاغری"
            },
            {"category_ID": 19, "title": "ماساژ"},
            {"category_ID": 20, "title": "پوست و زیبایی"},
            {"category_ID": 21, "title": "خدمات دندانپزشکی"},
            {"category_ID": 22, "title": "نمایشی و فرهنگی"},
            {"category_ID": 23, "title": "آتلیه و خدمات چاپ"},
            {"category_ID": 24, "title": "تئاتر"},
            {"category_ID": 25, "title": "کنسرت"},
            {"category_ID": 26, "title": "سینما"},
            {"category_ID": 27, "title": "کامپیوتر"},
            {"category_ID": 28, "title": "موسیقی"},
            {"category_ID": 29, "title": "آشپزی"},
            {"category_ID": 30, "title": "زبان های خارجی"},
            {"category_ID": 31, "title": "گردهمایی و همایش"},
            {"category_ID": 32, "title": "هنر"},
            {"category_ID": 33, "title": "حسابداری"},
            {"category_ID": 34, "title": "مهارت های فردی"},
            {"category_ID": 35, "title": "آرایش مو و صورت"},
            {"category_ID": 36, "title": "خدمات ناخن"},
            {"category_ID": 37, "title": "خدمات پوست"},
            {"category_ID": 38, "title": "اپیلاسیون"},
            {
                "category_ID": 39,
                "title": "کالای دیجیتال و لوازم جانبی"
            },
            {"category_ID": 40, "title": "خانه و آشپزخانه"},
            {
                "category_ID": 41,
                "title": "آرایشی بهداشتی و پزشکی"
            },
            {"category_ID": 42, "title": "مد و پوشاک و اکسسوری"},
            {"category_ID": 43, "title": "کودکان و سرگرمی"},
            {"category_ID": 44, "title": "ورزش و سفر"},
            {"category_ID": 45, "title": "ملزومات اداری و هنر"},
            {"category_ID": 46, "title": "ابزارآلات"},
            {"category_ID": 47, "title": "نرم افزار و بازی"},
            {"category_ID": 48, "title": "سوپرمارکت"},
        ];  
        this.state = {
            titleSelected: this.props.navigation.getParam('title'),
            itemSelected: 0,
            categoryData: Categories_Data,
            tabSelected: 'CustomerClub',
            pageSelected: <CustomerClub />,
            c_min: 0,
            c_max: 0,
        };
    }
    componentDidMount() {
        let cid = this.props.navigation.getParam('cid', 0);
        console.log(cid);
        let items_number_min = (cid <= 8) ? 1 :
            (cid <= 15) ? 9 : (cid <= 21) ? 16 : (cid <= 26) ? 22 :
                (cid <= 31) ? 24 : (cid <= 37) ? 34 : 38;
        let items_number_max = (cid <= 8) ? 8 :
            (cid <= 15) ? 15 : (cid <= 21) ? 21 : (cid <= 26) ? 26 :
                (cid <= 31) ? 31 : (cid <= 37) ? 37 : 48;
        this._set_categoryDataState(items_number_min, items_number_max, cid);
    }
    _set_categoryDataState(min, max, cid){
        this.setState({c_min: min, c_max: max, itemSelected: cid});
    }
    async _itemSelected(index) {
        await this.setState({ itemSelected: index });
        this._tabSelected(this.state.tabSelected);
    }
    _tabSelected(tab) {
        switch (tab) {
            case 'CustomerClub':
                this.setState({ pageSelected: <CustomerClub /> })
                break;
            case 'GroupOffer':
                console.log(this.state.itemSelected);
                this.setState({ pageSelected: <GroupOffer key={this.state.itemSelected} cid={this.state.itemSelected} /> })
                break;
            case 'OfferLoyal':
                this.setState({ pageSelected: <OfferLoyal /> })
                break;
        }
        this.setState({ tabSelected: tab })
        
    }

    render() {
        const Categories_Title = Categories_Data.filter(item => { return item.catTitle == this.state.titleSelected })
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f3f3' }} >
                <View style={{ height: 50, flexDirection: 'row-reverse', backgroundColor: 'white' }}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        inverted
                        data={this.state.categoryData.filter(item => {return ((item.category_ID > this.state.c_min) && (item.category_ID < this.state.c_max))})}
                        extraData={this.state.itemSelected}
                        horizontal
                        renderItem={({ item, index }) =>
                            <TouchableOpacity onPress={() => this._itemSelected(item.category_ID)} style={{ height: (this.state.itemSelected === item.category_ID) ? '90%' : '100%', backgroundColor: '#9720d2', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'IRANsansMobile', marginHorizontal: 10, fontSize: 16, color: 'white', marginLeft: 20 }}>{item.title}</Text>
                            </TouchableOpacity>
                        } />
                </View>
                <View style={{ height: 35, width: "97%", alignSelf: 'center', marginTop: 10, elevation: 10, flexDirection: 'row-reverse', backgroundColor: 'white', borderRadius: 5, justifyContent: 'space-around' }}>
                    <TouchableOpacity
                        onPress={() => this._tabSelected('CustomerClub')}
                        style={{ flex: 1, borderBottomRightRadius: 5, borderTopRightRadius: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row-reverse', backgroundColor: (this.state.tabSelected === 'CustomerClub') ? '#9720d2' : 'white' }}>
                        <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 11, color: (this.state.tabSelected == 'CustomerClub') ? 'white' : 'gray' }}>باشگاه‌های مشتریان</Text>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: 'gray', height: '100%', width: .4 }}></View>
                    <TouchableOpacity
                        onPress={() => this._tabSelected('OfferLoyal')}
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: (this.state.tabSelected === 'OfferLoyal') ? '#9720d2' : 'white' }}>
                        <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 11, color: (this.state.tabSelected == 'OfferLoyal') ? 'white' : 'gray' }}>تخفیف‌های باشگاه مشتریان</Text>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: 'gray', height: '100%', width: .4 }}></View>
                    <TouchableOpacity
                        onPress={() => this._tabSelected('GroupOffer')}
                        style={{ flex: 1, borderBottomLeftRadius: 5, borderTopLeftRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: (this.state.tabSelected === 'GroupOffer') ? '#9720d2' : 'white' }}>
                        <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 11, color: (this.state.tabSelected == 'GroupOffer') ? 'white' : 'gray' }}>تخفیف‌های گروهی</Text>
                    </TouchableOpacity>
                </View>
                {this.state.pageSelected}
            </SafeAreaView>
        );
    }
}

export default CategoryADs;
