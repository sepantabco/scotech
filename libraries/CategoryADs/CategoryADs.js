import React, { Component } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import Categories_Data from '../CategoryPage/ImageProfile';
import CustomerClub from './components/CustomerClub';
import GroupOffer from './components/GroupOffer'
import OfferLoyal from './components/OfferLoyal'
import CategoryADsHeader from '../Headers/CategoryADsHeader';
import Overlay from 'react-native-modal-overlay';

class CategoryADs extends Component {

    constructor(props) {
        super(props);
        let Categories_Data = [
            { "category_ID": 1, "title": "ایرانی و سنتی" },
            { "category_ID": 2, "title": "ایتالیای و ملل" },
            { "category_ID": 3, "title": "فست فود" },
            { "category_ID": 4, "title": "سفره خانه" },
            { "category_ID": 5, "title": "بوفه" },
            { "category_ID": 6, "title": "کافی شاپ" },
            { "category_ID": 7, "title": "صبحانه" },
            { "category_ID": 8, "title": "کترینگ" },
            { "category_ID": 9, "title": "تورهای مسافرتی" },
            { "category_ID": 10, "title": "هتل و اقامتگاه" },
            {
                "category_ID": 11,
                "title": "شهربازی و مراکز تفریحی"
            },
            {
                "category_ID": 12,
                "title": "بازی گروهی و زمین بازی"
            },
            { "category_ID": 13, "title": "استخر و ورزش های آبی" },
            { "category_ID": 14, "title": "ورزش های هوایی" },
            { "category_ID": 15, "title": "باشگاه ورزشی" },
            { "category_ID": 16, "title": "لیزر موهای زائد" },
            { "category_ID": 17, "title": "ژل و بوتاکس" },
            {
                "category_ID": 18,
                "title": "خدمات تناسب اندام و لاغری"
            },
            { "category_ID": 19, "title": "ماساژ" },
            { "category_ID": 20, "title": "پوست و زیبایی" },
            { "category_ID": 21, "title": "خدمات دندانپزشکی" },
            { "category_ID": 22, "title": "نمایشی و فرهنگی" },
            { "category_ID": 23, "title": "آتلیه و خدمات چاپ" },
            { "category_ID": 24, "title": "تئاتر" },
            { "category_ID": 25, "title": "کنسرت" },
            { "category_ID": 26, "title": "سینما" },
            { "category_ID": 27, "title": "کامپیوتر" },
            { "category_ID": 28, "title": "موسیقی" },
            { "category_ID": 29, "title": "آشپزی" },
            { "category_ID": 30, "title": "زبان های خارجی" },
            { "category_ID": 31, "title": "گردهمایی و همایش" },
            { "category_ID": 32, "title": "هنر" },
            { "category_ID": 33, "title": "حسابداری" },
            { "category_ID": 34, "title": "مهارت های فردی" },
            { "category_ID": 35, "title": "آرایش مو و صورت" },
            { "category_ID": 36, "title": "خدمات ناخن" },
            { "category_ID": 37, "title": "خدمات پوست" },
            { "category_ID": 38, "title": "اپیلاسیون" },
           
        ];
        this.state = {
            NotifiVisible: false,
            filterTitle: [
                "نزدیک ترین", "بیشترین امتیاز", "گران ترین", "ارزان ترین",
            ],
            filterSelected: 0,
            titleSelected: this.props.navigation.getParam('title'),
            itemSelected: 0,
            categoryData: Categories_Data,
            tabSelected: 'CustomerClub',
            pageSelected: <CustomerClub />,
            c_min: 0,
            c_max: 0,
        };
        this.props.navigation.setParams({
            open_modal: this._openModal.bind(this)
        });
    }
    _colseModal = () => {
        this.groupOfferChild.fetch_filter(this.state.filterSelected);
        this.setState({ NotifiVisible: false });
    }
    _openModal() {
        this.setState({ NotifiVisible: true })
    }
    componentWillMount() {
        let cid = this.props.navigation.getParam('cid', 0);
        console.log(cid);
        let items_number_min = (cid <= 8) ? 1 :
            (cid <= 15) ? 9 : (cid <= 21) ? 16 : (cid <= 26) ? 22 : (cid <= 34) ? 27 : 35 ;
        let items_number_max = (cid <= 8) ? 8 :
            (cid <= 15) ? 15 : (cid <= 21) ? 21 : (cid <= 26) ? 26 :
                (cid <= 34) ? 34 : 38;
        this._set_categoryDataState(items_number_min, items_number_max, cid);
    }
    _set_categoryDataState(min, max, cid) {
        this.setState({ c_min: min, c_max: max, itemSelected: cid });
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
                this.setState({ pageSelected: <GroupOffer ref ={(ref) => this.groupOfferChild = ref} key={this.state.itemSelected} cid={this.state.itemSelected} navigation={this.props.navigation} /> })
                break;
            case 'OfferLoyal':
                this.setState({ pageSelected: <OfferLoyal /> })
                break;
        }
        this.setState({ tabSelected: tab })

    }
    take_filter_type(index) {
        this.setState({filterSelected: index})
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <CategoryADsHeader navigation={navigation} />,
            headerStyle: {
                backgroundColor: '#573c65',
            }
        }
    };
   

    render() {

        const Categories_Title = Categories_Data.filter(item => { return item.catTitle == this.state.titleSelected })
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f3f3' }} >
                

                <Overlay visible={this.state.NotifiVisible} onClose={this._colseModal} closeOnTouchOutside
                    animationType="zoomIn"
                    childrenWrapperStyle={{ backgroundColor: '#DDDDDD' }}
                    animationDuration={1000}>
                    {
                        (hideModal, overlayState) => (
                            <View style={{ width: "50%", borderRadius: 50 }}>
                                <Text style={{ fontFamily: 'IRANSansMobile', color: '#573c65', marginBottom: 5 }}>فیلتر بر اساس:</Text>
                                <FlatList
                                    keyExtractor={(item, index) => { return index.toString() }}
                                    data={this.state.filterTitle}
                                    renderItem={({ item, index }) =>
                                        <View style={{ borderRadius: 100 }}>
                                            <TouchableOpacity
                                                onPress={() => this.take_filter_type(index)}
                                                style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end' }} >
                                                <Text style={{ fontFamily: 'IRANSansMobile', color: '#573c65', marginHorizontal: 5 }}>{item}</Text>
                                                <View style={{ height: 12, width: 12, borderRadius: 6, borderWidth: 2, borderColor: '#573c65', justifyContent: 'center', alignItems: 'center' }}>
                                                    {this.state.filterSelected == index &&
                                                        <View style={{ height: 7, width: 7, borderRadius: 3.5, backgroundColor: '#573c65' }}>
                                                        </View>
                                                    }
                                                </View>
                                            </TouchableOpacity>

                                        </View>
                                    }

                                />
                                <TouchableOpacity
                                    onPress={hideModal}
                                    style={{ height: 20, width: 50, backgroundColor: '#573c65', justifyContent: 'center', alignItems: 'center', marginTop: 10, borderRadius: 5, alignSelf: 'flex-end' }}>
                                    <Text style={{ fontFamily: 'IRANSansMobile', color: 'white', marginHorizontal: 5, fontSize: 12 }}>تایید</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </Overlay>

                <View style={{ height: 50, flexDirection: 'row-reverse', backgroundColor: 'white' }}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        inverted
                        data={this.state.categoryData.filter(item => { return ((item.category_ID >= this.state.c_min) && (item.category_ID <= this.state.c_max)) })}
                        extraData={this.state.itemSelected}
                        horizontal
                        renderItem={({ item, index }) =>
                            <TouchableOpacity onPress={() => this._itemSelected(item.category_ID)} style={{ height: (this.state.itemSelected === item.category_ID) ? '90%' : '100%', backgroundColor: '#573c65', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'IRANSans(FaNum)', marginHorizontal: 10, fontSize: 16, color: 'white', marginLeft: 20 }}>{item.title}</Text>
                            </TouchableOpacity>
                        } />
                </View>
                <View style={{ height: 35, width: "97%", alignSelf: 'center', marginTop: 10, elevation: 5, flexDirection: 'row-reverse', backgroundColor: 'white', borderRadius: 5, justifyContent: 'space-around' }}>
                    <TouchableOpacity
                        onPress={() => this._tabSelected('CustomerClub')}
                        style={{ flex: 1, borderBottomRightRadius: 5, borderTopRightRadius: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row-reverse', backgroundColor: (this.state.tabSelected === 'CustomerClub') ? '#573c65' : 'white' }}>
                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11, color: (this.state.tabSelected == 'CustomerClub') ? 'white' : 'gray' }}>باشگاه‌های مشتریان</Text>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: 'gray', height: '100%', width: .4 }}></View>
                    <TouchableOpacity
                        onPress={() => this._tabSelected('OfferLoyal')}
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: (this.state.tabSelected === 'OfferLoyal') ? '#573c65' : 'white' }}>
                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11, color: (this.state.tabSelected == 'OfferLoyal') ? 'white' : 'gray' }}>تخفیف‌های باشگاه مشتریان</Text>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: 'gray', height: '100%', width: .4 }}></View>
                    <TouchableOpacity
                        onPress={() => this._tabSelected('GroupOffer')}
                        style={{ flex: 1, borderBottomLeftRadius: 5, borderTopLeftRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: (this.state.tabSelected === 'GroupOffer') ? '#573c65' : 'white' }}>
                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 11, color: (this.state.tabSelected == 'GroupOffer') ? 'white' : 'gray' }}>تخفیف‌های گروهی</Text>
                    </TouchableOpacity>
                </View>
                {this.state.pageSelected}
            </SafeAreaView>
        );
    }
}

export default CategoryADs;
